export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EngagementModel {
  id: string;
  name: string;
  badge?: string;
  isRecommended?: boolean;
  idealFor: string;
  cadence: string;
  highlights: string[];
  commitment: string;
}

export const faqList: FaqItem[] = [
  {
    id: "speed",
    question: "How fast does PanthriX commence execution after signing?",
    answer: "Within 48 hours. We do not maintain bench bloat. Once we accept a contract, our principal lead and dedicated squad deploy into your repository, configure the staging environment, and complete architecture recon in the first week.",
  },
  {
    id: "ip-ownership",
    question: "Who owns the code, intellectual property, and infrastructure?",
    answer: "You own 100% of all intellectual property, git repositories, secrets, Figma files, and cloud infrastructure from day one. We operate strictly under mutual NDA with clean IP assignments on all commits.",
  },
  {
    id: "stack-flexibility",
    question: "Can you adopt our existing codebase or do you only build greenfield?",
    answer: "We do both. For existing systems, we begin with a surgical audit to map technical debt, latency bottlenecks, and vulnerability vectors. We then execute staged modular refactors without halting your live production revenue.",
  },
  {
    id: "communication",
    question: "How do you handle day-to-day communication and updates?",
    answer: "Direct Slack/Discord channel with your dedicated engineering squad. Weekly live deploy previews, transparent GitHub PRs, and asynchronous Loom debriefs. No middle management or account executive telephone games.",
  },
  {
    id: "post-launch",
    question: "What happens after our product is successfully launched?",
    answer: "We provide 30 days of complimentary hyper-care warranty monitoring. Following that, clients typically transition to our Dedicated Squad Retainer for autonomous feature expansion, scaling, and 24/7 incident response.",
  },
];

export const engagementModels: EngagementModel[] = [
  {
    id: "fixed-scope",
    name: "Tactical Strike",
    badge: "MVP & Version 1.0",
    isRecommended: false,
    idealFor: "Ambitious founders with a crystal-clear feature spec seeking an uncompromising launch date.",
    cadence: "Fixed 6 to 12 Week Sprint",
    commitment: "Milestone-driven with 100% cost transparency",
    highlights: [
      "Rigid scope specification & timeline guarantee",
      "Full design system + production web/mobile app",
      "End-to-end cloud infrastructure deployment",
      "30-day post-launch hyper-care warranty",
    ],
  },
  {
    id: "dedicated-squad",
    name: "Predator Retainer",
    badge: "Most Popular",
    isRecommended: true,
    idealFor: "High-growth scaleups and venture-backed teams needing senior full-stack velocity.",
    cadence: "Monthly Dedicated Capacity",
    commitment: "Quarterly or Annual with 30-day notice",
    highlights: [
      "Dedicated senior squad (Design + Full-Stack + Cloud)",
      "Weekly production deploy cadence & sprint planning",
      "Priority SLA: direct emergency response < 1 hour",
      "Direct integration into your internal Slack & GitHub",
      "Real-time architecture guidance & AI pipeline scaling",
    ],
  },
  {
    id: "advisory-audit",
    name: "Architecture Recon",
    badge: "Deep Audit",
    isRecommended: false,
    idealFor: "Enterprises facing critical latency, scaling bottlenecks, or upcoming diligence rounds.",
    cadence: "2-Week Surgical Deep Dive",
    commitment: "Flat-rate comprehensive deliverables",
    highlights: [
      "Full codebase, database & cloud security inspection",
      "Bottleneck benchmarking & latency profiling",
      "Executive technical debt remediation roadmap",
      "Actionable refactor PRs submitted directly",
    ],
  },
];

