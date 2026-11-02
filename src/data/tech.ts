export interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Infra" | "Data" | "AI";
  level: string;
  description: string;
}

export const techMarqueeRow1: TechItem[] = [
  { name: "React 19", category: "Frontend", level: "Apex", description: "Concurrent rendering & Server Components" },
  { name: "TypeScript", category: "Frontend", level: "Apex", description: "Zero-any strict type enforcement" },
  { name: "Next.js", category: "Frontend", level: "Apex", description: "Hybrid SSR, ISR & edge runtime routing" },
  { name: "Node.js", category: "Backend", level: "Master", description: "High-throughput asynchronous event loops" },
  { name: "Go (Golang)", category: "Backend", level: "Apex", description: "Sub-millisecond concurrent microservices" },
  { name: "Rust", category: "Backend", level: "Apex", description: "Memory-safe zero-overhead execution" },
  { name: "PostgreSQL", category: "Data", level: "Apex", description: "ACID compliance with complex partitioned indexing" },
  { name: "Redis", category: "Data", level: "Apex", description: "In-memory caching and distributed locking" },
];

export const techMarqueeRow2: TechItem[] = [
  { name: "Kubernetes", category: "Infra", level: "Apex", description: "Declarative container cluster orchestration" },
  { name: "Docker", category: "Infra", level: "Apex", description: "Immutable containerized build pipelines" },
  { name: "Apache Kafka", category: "Backend", level: "Apex", description: "Distributed fault-tolerant event streams" },
  { name: "AWS Cloud", category: "Infra", level: "Master", description: "Multi-region serverless & VPC mesh architecture" },
  { name: "Python / PyTorch", category: "AI", level: "Apex", description: "Deep learning models, embeddings, RAG pipelines" },
  { name: "GraphQL", category: "Backend", level: "Apex", description: "Strongly typed unified schema federation" },
  { name: "Terraform", category: "Infra", level: "Apex", description: "Infrastructure as Code (IaC) reproducible stacks" },
  { name: "MongoDB", category: "Data", level: "Master", description: "Scalable document stores with sharded replicas" },
];

