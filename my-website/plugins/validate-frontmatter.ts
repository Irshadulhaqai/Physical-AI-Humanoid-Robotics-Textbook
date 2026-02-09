import type {LoadContext, Plugin} from '@docusaurus/types';
import Ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

interface ValidateFrontmatterOptions {
  /** Path to the JSON Schema file (relative to site dir) */
  schemaPath: string;
  /** If true, fail the build on validation errors. If false, only warn. */
  strict?: boolean;
  /** File patterns to exclude from validation (e.g., index files during migration) */
  exclude?: string[];
}

interface FrontmatterError {
  filePath: string;
  errors: string[];
}

export default function validateFrontmatterPlugin(
  context: LoadContext,
  options: ValidateFrontmatterOptions,
): Plugin {
  return {
    name: 'validate-frontmatter',

    async postBuild({content}) {
      const {siteDir} = context;
      const schemaFullPath = path.resolve(siteDir, '..', options.schemaPath);

      if (!fs.existsSync(schemaFullPath)) {
        console.warn(
          `[validate-frontmatter] Schema file not found: ${schemaFullPath}. Skipping validation.`,
        );
        return;
      }

      const schema = JSON.parse(fs.readFileSync(schemaFullPath, 'utf-8'));
      const ajv = new Ajv({allErrors: true});
      const validate = ajv.compile(schema);

      const docsDir = path.resolve(siteDir, 'docs');
      const validationErrors: FrontmatterError[] = [];
      const validationWarnings: FrontmatterError[] = [];

      const mdFiles = getAllMdFiles(docsDir);

      for (const filePath of mdFiles) {
        const relativePath = path.relative(siteDir, filePath);

        // Check exclusions
        if (options.exclude?.some(pattern => relativePath.includes(pattern))) {
          continue;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(fileContent);

        if (!frontmatter) {
          validationWarnings.push({
            filePath: relativePath,
            errors: ['No frontmatter found'],
          });
          continue;
        }

        const valid = validate(frontmatter);
        if (!valid && validate.errors) {
          const errors = validate.errors.map(err => {
            const field = err.instancePath
              ? err.instancePath.replace(/^\//, '')
              : err.params?.missingProperty || 'unknown';
            return `  - ${field}: ${err.message}`;
          });

          // Determine if this is a fully-formed chapter (has all basic fields)
          // or a legacy file still being migrated
          const hasBasicFields =
            frontmatter.sidebar_position !== undefined &&
            frontmatter.title !== undefined;
          const isMissingOnlyNewFields =
            hasBasicFields &&
            errors.every(
              e =>
                e.includes('estimated_time') ||
                e.includes('learning_objectives'),
            );

          if (isMissingOnlyNewFields && !options.strict) {
            validationWarnings.push({filePath: relativePath, errors});
          } else {
            validationErrors.push({filePath: relativePath, errors});
          }
        }
      }

      // Report warnings
      if (validationWarnings.length > 0) {
        console.warn(
          '\n[validate-frontmatter] Warnings (non-blocking — legacy files pending migration):',
        );
        for (const {filePath, errors} of validationWarnings) {
          console.warn(`  ${filePath}:`);
          errors.forEach(e => console.warn(`  ${e}`));
        }
        console.warn(
          `\n  ${validationWarnings.length} file(s) with warnings. Run migration to fix.\n`,
        );
      }

      // Report errors (and fail build if strict or if errors are non-migratable)
      if (validationErrors.length > 0) {
        console.error(
          '\n[validate-frontmatter] ERRORS — frontmatter validation failed:',
        );
        for (const {filePath, errors} of validationErrors) {
          console.error(`  ${filePath}:`);
          errors.forEach(e => console.error(`  ${e}`));
        }

        if (options.strict) {
          throw new Error(
            `[validate-frontmatter] ${validationErrors.length} file(s) failed frontmatter validation. Fix errors and rebuild.`,
          );
        } else {
          console.warn(
            `\n  ${validationErrors.length} file(s) with errors. Set strict: true to fail build on these.\n`,
          );
        }
      }

      if (
        validationErrors.length === 0 &&
        validationWarnings.length === 0
      ) {
        console.log(
          `\n[validate-frontmatter] All ${mdFiles.length} docs passed frontmatter validation.\n`,
        );
      }
    },
  };
}

function getAllMdFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFrontmatter(
  content: string,
): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yamlText = match[1];
  const result: Record<string, unknown> = {};

  // Simple YAML parser for frontmatter (handles the fields we need)
  const lines = yamlText.split('\n');
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (const line of lines) {
    // Array item
    if (line.match(/^\s+-\s+/) && currentKey) {
      const value = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '');
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Save previous array
    if (currentArray && currentKey) {
      result[currentKey] = currentArray;
      currentArray = null;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w[\w_]*)\s*:\s*(.*)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const rawValue = kvMatch[2].trim();

      if (rawValue === '' || rawValue === '[]') {
        // Array start or empty
        currentArray = rawValue === '[]' ? [] : [];
        continue;
      }

      // Inline array [item1, item2]
      if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        const inner = rawValue.slice(1, -1);
        result[currentKey] = inner
          .split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''));
        currentKey = null;
        continue;
      }

      // Boolean
      if (rawValue === 'true') {
        result[currentKey] = true;
        continue;
      }
      if (rawValue === 'false') {
        result[currentKey] = false;
        continue;
      }

      // Integer
      if (/^\d+$/.test(rawValue)) {
        result[currentKey] = parseInt(rawValue, 10);
        continue;
      }

      // String (strip quotes)
      result[currentKey] = rawValue.replace(/^["']|["']$/g, '');
    }
  }

  // Save trailing array
  if (currentArray && currentKey) {
    result[currentKey] = currentArray;
  }

  return Object.keys(result).length > 0 ? result : null;
}
