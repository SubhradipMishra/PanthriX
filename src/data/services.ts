export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techPill: string;
  accentMetric: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-apps",
    number: "01",
    title: "Custom Web Applications",
    tagline: "Sub-second load times. Zero compromise on fidelity.",
    description: "Enterprise-grade web systems engineered with reactive architectures, fluid micro-interactions, and robust state machines. Crafted to out-convert and out-perform any legacy suite.",
    deliverables: ["React / Next.js / TypeScript", "Real-time WebSockets", "SSR & Edge Rendering", "Headless CMS & APIs"],
    techPill: "Full-Stack Web",
    accentMetric: "< 800ms FCP",
  },
  {
    id: "mobile-apps",
    number: "02",
    title: "Mobile Native & Hybrid",
    tagline: "Fluid 120 FPS on iOS and Android.",
    description: "Native swiftness packaged in seamless cross-platform builds. We craft tactile, hardware-accelerated mobile apps that users never delete and app stores feature on day one.",
    deliverables: ["React Native / Expo", "Swift & Kotlin Native Modules", "Offline-First Sync", "Biometric & Push Workflows"],
    techPill: "iOS & Android",
    accentMetric: "120 FPS Native",
  },
  {
    id: "saas-platforms",
    number: "03",
    title: "SaaS Platforms & Multi-Tenant",
    tagline: "Engineered from Day 0 to scale to 10M+ users.",
    description: "Multi-tenant database isolation, automated billing pipelines, role-based governance, and real-time observability. Built for ambitious founders hunting hyper-growth.",
    deliverables: ["Multi-Tenant DB Sharding", "Stripe & Usage Billing", "SSO / SAML / RBAC", "Automated Tenant Provisioning"],
    techPill: "Enterprise SaaS",
    accentMetric: "99.99% Guaranteed SLA",
  },
  {
    id: "ai-automation",
    number: "04",
    title: "AI Systems & Autonomous Agents",
    tagline: "Beyond toy chatbots. Deterministic precision AI.",
    description: "Production LLM pipelines, specialized semantic vector graphs, and autonomous agent loops that eliminate operational overhead and execute multi-step workflows safely.",
    deliverables: ["RAG & Vector Retrieval", "Autonomous Agent Loops", "Fine-Tuning & Quantization", "Deterministic Guardrails"],
    techPill: "Applied AI",
    accentMetric: "10x Human Velocity",
  },
  {
    id: "backend-cloud",
    number: "05",
    title: "Backend & Cloud Architecture",
    tagline: "Resilient microservices built for relentless volume.",
    description: "Distributed backends engineered in Go, Rust, and Node.js. Event-driven streaming with Kafka and Redis, cloud-native deployments with fault-tolerant zero-downtime replication.",
    deliverables: ["Distributed Systems", "Kafka / Event Sourcing", "PostgreSQL / Redis Sharding", "Terraform & AWS Infra"],
    techPill: "Cloud Architecture",
    accentMetric: "50k+ req/sec",
  },
  {
    id: "uiux-devops",
    number: "06",
    title: "UI/UX & DevOps Engineering",
    tagline: "Surgical visual direction meets bulletproof CI/CD.",
    description: "High-contrast dark-mode design systems, award-tier spatial interaction design, paired with immutable infrastructure, Kubernetes clusters, and automated blue-green pipelines.",
    deliverables: ["Design Systems in Figma", "Kubernetes & Docker", "Automated Blue-Green CI/CD", "Zero-Trust Security Audits"],
    techPill: "Design + DevOps",
    accentMetric: "0s Zero Downtime",
  },
];

