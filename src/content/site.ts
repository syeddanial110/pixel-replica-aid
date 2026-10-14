/** All editable website copy lives here — add, remove or reorder items without touching layout. */
export const contact = {
  email: "hello@leadzloco.com",
  linkedin: "https://www.linkedin.com",
  youtube: "https://www.youtube.com",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Results", href: "#results" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export const capabilities = [
  { icon: "Cpu", title: "Build", promise: "Systems shaped around your business.", body: "We design intelligent systems that fit how you actually work — not the other way around." },
  { icon: "Bot", title: "Automate", promise: "Agents that work while you sleep.", body: "Autonomous agents take on the repetitive, so your people get back to the work that matters." },
  { icon: "TrendingUp", title: "Scale", promise: "Growth without the ceiling.", body: "Headless architecture means you can grow in any direction without rebuilding from scratch." },
  { icon: "Sparkles", title: "Evolve", promise: "Better every single month.", body: "Your systems learn and adapt, so you stay ahead of what comes next." },
] as const;

export const approach = [
  { step: "01", title: "Discover", body: "We listen first. Where are you stuck, and where do you want to go?" },
  { step: "02", title: "Architect", body: "We map the system — the agents, the flows, the guardrails." },
  { step: "03", title: "Deploy", body: "We build it, launch it and make sure your team is comfortable with it." },
  { step: "04", title: "Evolve", body: "We keep tuning as your business — and the technology — moves forward." },
];

export const metrics = [
  { value: "10×", label: "Faster operations" },
  { value: "24/7", label: "Always-on agents" },
  { value: "∞", label: "Room to scale" },
];

export const testimonials = [
  { quote: "It felt less like hiring a vendor and more like gaining a new kind of team.", name: "Client name", role: "Founder, Company" },
  { quote: "We stopped asking 'can we handle this?' and started asking 'what's next?'", name: "Client name", role: "COO, Company" },
];

export const insights = [
  { kind: "Video", title: "What 'headless' really means for your business", href: contact.youtube },
  { kind: "Article", title: "Why the next era of work is agentic", href: contact.linkedin },
  { kind: "Video", title: "Building systems that outgrow you — in a good way", href: contact.youtube },
];
