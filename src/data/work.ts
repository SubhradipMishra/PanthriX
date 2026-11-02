export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  previewType: "desktop" | "mobile" | "split";
  summaryDetails: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "vortex-os",
    title: "VORTEX OS",
    category: "Cloud Infrastructure Control Plane",
    client: "Vortex Distributed Networks, SF",
    year: "2026",
    tagline: "Autonomous Multi-Cloud Orchestration at Hyper-Scale",
    description: "Re-engineered a clunky Kubernetes interface into a surgical, lightning-fast dark-mode telemetry workstation handling 250,000 cloud nodes globally with sub-second state reconciliation.",
    tags: ["React 19", "Go Microservices", "WebSockets", "TimescaleDB", "Tailwind CSS"],
    metrics: [
      { label: "State Sync Latency", value: "< 42ms" },
      { label: "Active Nodes Managed", value: "250,000+" },
      { label: "DevOps Productivity", value: "+310%" },
    ],
    accentColor: "#F55B17",
    previewType: "desktop",
    summaryDetails: [
      "Custom WebGL topological mesh topology graph",
      "Instantaneous multi-region failover automation",
      "Zero-overhead telemetry streams via binary protobuf",
    ],
  },
  {
    id: "cypher-capital",
    title: "CYPHER TERMINAL",
    category: "High-Frequency Algorithmic Trading Suite",
    client: "Cypher Quantitative Technologies, London",
    year: "2026",
    tagline: "Ultra-Low Latency Order Execution & Predictive Arbitrage",
    description: "Engineered a proprietary institutional trading dashboard rendering 120 FPS order-book depth charts and processing $1.8B in daily liquidity without a single dropped browser frame.",
    tags: ["Next.js", "Rust WebAssembly", "Canvas 2D", "Redis Pub/Sub", "Financial UI"],
    metrics: [
      { label: "Daily Settled Volume", value: "$1.8 Billion" },
      { label: "UI Frame Rate", value: "Solid 120 FPS" },
      { label: "Order Execution", value: "1.4ms E2E" },
    ],
    accentColor: "#F55B17",
    previewType: "desktop",
    summaryDetails: [
      "Hardware-accelerated Canvas orderbook visualization",
      "Sub-millisecond trade execution feedback loops",
      "Military-grade dual-key biometric authorization",
    ],
  },
  {
    id: "aether-health",
    title: "AETHER BIO-CORE",
    category: "Predictive Biomedical AI Platform",
    client: "Aether Genomic Labs, Zurich",
    year: "2025",
    tagline: "Deep Neural Diagnostics for Genomic Sequencing",
    description: "Built the unified clinical portal connecting hospital sequencers to cloud AI clusters, shrinking variant detection diagnosis turnaround from 72 hours to 8.4 minutes.",
    tags: ["TypeScript", "Python FastAPIs", "PyTorch Inference", "HIPAA Cloud", "Radix UI"],
    metrics: [
      { label: "Diagnosis Acceleration", value: "94% Faster" },
      { label: "Genomic Accuracy", value: "99.98%" },
      { label: "Clinical Adoption", value: "48 Hospitals" },
    ],
    accentColor: "#F55B17",
    previewType: "desktop",
    summaryDetails: [
      "Real-time genetic sequencing chromosome explorer",
      "Automated HIPAA compliance audit trail logging",
      "Distributed GPU inference queue with dynamic load shedding",
    ],
  },
];

