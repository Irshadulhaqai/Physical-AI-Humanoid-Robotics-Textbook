import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

type ModuleCardProps = {
  title: string;
  weeks: string;
  description: string;
  link: string;
  icon: string;
};

function ModuleCard({title, weeks, description, link, icon}: ModuleCardProps) {
  return (
    <div className={clsx('col col--3')}>
      <div className="card margin--md padding--md">
        <div className="card__header">
          <span style={{fontSize: '2rem'}}>{icon}</span>
          <Heading as="h3">{title}</Heading>
          <p className="text--secondary">{weeks}</p>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={link}>
            View Module
          </Link>
        </div>
      </div>
    </div>
  );
}

function ModulesSection() {
  const modules: ModuleCardProps[] = [
    {
      title: 'Module 1: ROS 2',
      weeks: 'Weeks 3-5',
      description: 'Robot Operating System fundamentals: nodes, topics, services, and packages.',
      link: '/docs/module-1',
      icon: '🤖',
    },
    {
      title: 'Module 2: Digital Twin',
      weeks: 'Weeks 6-7',
      description: 'Gazebo simulation, physics engines, and sensor modeling.',
      link: '/docs/module-2',
      icon: '🎮',
    },
    {
      title: 'Module 3: NVIDIA Isaac',
      weeks: 'Weeks 8-10',
      description: 'AI-powered perception, navigation, and reinforcement learning.',
      link: '/docs/module-3',
      icon: '🧠',
    },
    {
      title: 'Module 4: VLA & Capstone',
      weeks: 'Weeks 11-13',
      description: 'Vision-Language-Action models and the final capstone project.',
      link: '/docs/module-4',
      icon: '🎓',
    },
  ];

  return (
    <section className="margin-vert--lg">
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">Course Modules</Heading>
          <p>A structured 13-week journey from foundations to building autonomous humanoid robots.</p>
        </div>
        <div className="row">
          {modules.map((props, idx) => (
            <ModuleCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className="margin-vert--lg" style={{backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '2rem 0'}}>
      <div className="container">
        <div className="row">
          <div className="col col--4 text--center">
            <Heading as="h3">📚 Introduction</Heading>
            <p>Start here to understand Physical AI and course structure.</p>
            <Link className="button button--outline button--primary" to="/docs/introduction">
              Begin Learning
            </Link>
          </div>
          <div className="col col--4 text--center">
            <Heading as="h3">🔧 Hardware Setup</Heading>
            <p>Configure your development environment.</p>
            <Link className="button button--outline button--primary" to="/docs/hardware-guide">
              Setup Guide
            </Link>
          </div>
          <div className="col col--4 text--center">
            <Heading as="h3">📖 Glossary</Heading>
            <p>Reference for technical terms and concepts.</p>
            <Link className="button button--outline button--primary" to="/docs/appendices/glossary">
              View Glossary
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="A 13-week course on Physical AI and Humanoid Robotics covering ROS 2, simulation, NVIDIA Isaac, and Vision-Language-Action models.">
      <HomepageHeader />
      <main>
        <ModulesSection />
        <QuickLinks />
      </main>
    </Layout>
  );
}
