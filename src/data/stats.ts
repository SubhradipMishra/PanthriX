export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export const statsData: StatItem[] = [
  {
    id: "projects",
    value: 64,
    suffix: "+",
    label: "Production Systems Shipped",
    sublabel: "Zero canceled sprints across enterprise & high-growth venture contracts.",
  },
  {
    id: "uptime",
    value: 99.99,
    suffix: "%",
    label: "Guaranteed Production Uptime",
    sublabel: "Fault-tolerant multi-region failover protocols engineered into every deployment.",
  },
  {
    id: "countries",
    value: 18,
    suffix: "",
    label: "Global Market Jurisdictions",
    sublabel: "Active across US, UK, Switzerland, Singapore, Japan, and the EU.",
  },
  {
    id: "retention",
    value: 98,
    suffix: "%",
    label: "Client Retainer Continuation",
    sublabel: "Founders return because we deliver what we spec without corporate excuses.",
  },
];

