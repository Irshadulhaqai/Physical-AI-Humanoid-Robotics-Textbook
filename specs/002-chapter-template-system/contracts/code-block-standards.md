# Contract: Code Block Standards

**Feature**: 002-chapter-template-system
**Date**: 2026-02-09

---

## Rules

### Rule 1: Language Identifier (Always Required)

Every code block MUST specify the language for syntax highlighting.

**Available languages** (configured in `docusaurus.config.ts` Prism):
- `python` — Python scripts, ROS 2 nodes
- `bash` — Terminal commands, shell scripts
- `yaml` — Configuration files, ROS 2 params
- `cpp` — C++ code, ROS 2 C++ nodes
- `json` — JSON data, schemas
- `markup` — HTML, XML, URDF, SDF, launch files

### Rule 2: Title Attribute (Always Required)

Every code block MUST have a `title` describing the file or purpose.

```
```python title="talker_node.py"
```bash title="Install ROS 2 dependencies"
```yaml title="robot_params.yaml"
```cpp title="motor_controller.cpp"
```

**Fallback**: If no meaningful title exists, use the language name: `title="Python"`, `title="Bash"`.

### Rule 3: Line Numbers (Conditional)

Code blocks exceeding 5 lines in Python, Bash, C++, or YAML MUST include `showLineNumbers`.

```
```python title="publisher_node.py" showLineNumbers
```

Short snippets (1-5 lines) SHOULD NOT use `showLineNumbers` to reduce visual noise.

### Rule 4: Line Highlighting (When Pedagogically Important)

Use highlighting to draw attention to key lines. Two syntaxes available:

**Comment-based** (preferred — resilient to line changes):
```python
# highlight-next-line
important_line = True

# highlight-start
block_of_important_lines()
also_important()
# highlight-end
```

**Metastring-based** (for static code):
```
```python title="example.py" {3,7-9}
```

### Rule 5: Output Blocks

When showing command output, use a separate code block without a language or with `text`:
```
```bash title="Run the node"
ros2 run my_package my_node
```

Expected output:
```text title="Output"
[INFO] [my_node]: Node started!
```
```

## Before/After Examples

### Before (non-compliant)
````markdown
```
import rclpy
from rclpy.node import Node
class MyNode(Node):
    def __init__(self):
        super().__init__('my_node')
        self.get_logger().info('Started')
```
````

Issues: No language, no title, no line numbers (> 5 lines), no highlighting.

### After (compliant)
````markdown
```python title="my_node.py" showLineNumbers
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node')
        # highlight-next-line
        self.get_logger().info('Started')
```
````
