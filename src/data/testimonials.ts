export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "marcus-vance",
    quote: "Most agencies deliver bloated slide decks and excuse lists. PanthriX operated in absolute stealth, showed up with our entire core transaction engine working ahead of schedule, and sustained 120 FPS under peak load. They are genuine software predators.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Vortex Distributed Networks",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    metric: "3.2x Throughput Increase",
  },
  {
    id: "elena-rostova",
    quote: "We brought PanthriX in when our internal team hit a wall on algorithmic latency. Within three weeks, their engineers refactored our WebSocket ingestion pipeline and slashed order execution from 85ms down to 1.4ms. The impact on our arbitrage margins was immediate.",
    author: "Dr. Elena Rostova",
    role: "Head of Quantitative Strategy",
    company: "Cypher Capital London",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    metric: "$1.8B Volume Handled",
  },
  {
    id: "siddharth-menon",
    quote: "If you have an unbuilt vision that existing SaaS platforms can't stomach, don't waste 6 months hiring recruiters. PanthriX attacked our genomic diagnosis workflow with military discipline. Best engineering partner we have ever retained.",
    author: "Siddharth Menon",
    role: "Co-Founder & CEO",
    company: "Aether Bio-Core Zurich",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    metric: "94% Diagnosis Speedup",
  },
  {
    id: "charlotte-duval",
    quote: "PanthriX has ruined all other agencies for me. Their dark-mode design system, surgical precision on micro-interactions, and instant response time make them feel like an elite internal SEAL team rather than an external vendor.",
    author: "Charlotte Duval",
    role: "VP of Product",
    company: "Hyperion FinTech",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    metric: "0 Critical Bugs in Prod",
  },
];

