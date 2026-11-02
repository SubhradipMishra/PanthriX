export interface ProcessStep {
  id: string;
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  executionList: string[];
  duration: string;
  weaponMetric: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    step: "PHASE 01",
    number: "01",
    title: "The Recon Hunt",
    subtitle: "Discover & Architecture Scoping",
    description: "We don't do endless meetings. We dissect your technical debt, isolate user friction vectors, and construct a hardened blueprint before writing a single line of production code.",
    executionList: [
      "Target audience behavior analysis & attack vectors",
      "System architecture modeling & latency budgets",
      "Tech stack validation & risk de-escalation",
      "Milestone roadmap with fixed delivery dates"
    ],
    duration: "Week 01",
    weaponMetric: "0% Ambiguity",
  },
  {
    id: "design",
    step: "PHASE 02",
    number: "02",
    title: "Surgical Design",
    subtitle: "Tactile UI/UX & High-Fidelity Prototypes",
    description: "Every pixel serves a behavioral objective. We architect high-contrast, kinetic interfaces that feel like elite instrumentation—commanding respect and driving instinctive user engagement.",
    executionList: [
      "Design tokens, kinetic physics & interactive prototypes",
      "Obsidian dark mode & high-readability hierarchy",
      "Responsive breakpoint stress testing",
      "Component library handoff ready for engineering"
    ],
    duration: "Week 02 - 03",
    weaponMetric: "60 FPS Micro-Interactions",
  },
  {
    id: "build",
    step: "PHASE 03",
    number: "03",
    title: "Predator Build",
    subtitle: "High-Throughput Reactive Engineering",
    description: "Code written in the dark with stealth precision. Strict TypeScript, modular atomic components, benchmarked database queries, and parallel sprint cycles that ship real features weekly.",
    executionList: [
      "Full-stack development with strict type safety",
      "Edge caching, database indexing & WebSocket pipelines",
      "Continuous integration with automated linting & tests",
      "Bi-weekly staging demos with live deploy preview links"
    ],
    duration: "Week 04 - 07",
    weaponMetric: "100% Type-Safe Code",
  },
  {
    id: "audit",
    step: "PHASE 04",
    number: "04",
    title: "Battle Testing",
    subtitle: "Security Hardening & Load Simulation",
    description: "Before exposing systems to production traffic, we execute synthetic DDOS attacks, pentest authentication boundaries, and profile P99 database query performance under peak pressure.",
    executionList: [
      "Synthetic concurrency stress test at 100k req/sec",
      "OWASP top-10 penetration & authorization audits",
      "Automated regression test suite verification",
      "Disaster recovery and automated failover verification"
    ],
    duration: "Week 08",
    weaponMetric: "Zero Critical Vulnerabilities",
  },
  {
    id: "launch",
    step: "PHASE 05",
    number: "05",
    title: "The Strike",
    subtitle: "Production Deployment & DNS Cutover",
    description: "Launch day is not an experiment. We execute smooth zero-downtime blue-green deployments, prime global CDN edge caches, and initialize real-time observability telemetry.",
    executionList: [
      "Zero-downtime blue-green deployment switches",
      "Global CDN caching & edge routing setup",
      "Real-time Sentry & Datadog telemetry initialization",
      "24/7 dedicated principal engineer war-room standby"
    ],
    duration: "Week 09",
    weaponMetric: "0.00s Downtime",
  },
  {
    id: "evolve",
    step: "PHASE 06",
    number: "06",
    title: "Autonomous Evolution",
    subtitle: "Continuous Scaling & 24/7 Defense",
    description: "Software is a living predator. We analyze real user telemetry, eliminate bottlenecks, ship iterative upgrades, and expand functionality as your market dominance scales.",
    executionList: [
      "Weekly analytics review & conversion rate tuning",
      "Automated regression testing & security patches",
      "New feature sprint cycles on dedicated retainer",
      "Infrastructure auto-scaling cost optimization"
    ],
    duration: "Ongoing",
    weaponMetric: "24/7 Apex Uptime",
  },
];
