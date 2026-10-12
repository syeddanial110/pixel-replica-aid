import { createFileRoute } from "@tanstack/react-router";
import human from "@/assets/darbo-human.jpg";
import robot from "@/assets/darbo-robot.jpg";
import space from "@/assets/ascension.jpg";
import origin from "@/assets/origin.jpg";
import { CursorGlow, MagneticButton, Reveal, SceneCard, SoundToggle, Wordmark, useScrollProgress } from "@/components/Cinema";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeadZLoco™ — Architect of Headless Agentic AI Systems" },
      { name: "description", content: "Building businesses that scale without limits. Intelligent systems and autonomous agents for the next era of work." },
      { property: "og:title", content: "LeadZLoco™ — The Evolution" },
      { property: "og:description", content: "Architect of Headless Agentic AI Systems. Building businesses that scale without limits." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const capabilities = [
  { k: "01", t: "Build", d: "Intelligent systems engineered around how your business actually moves." },
  { k: "02", t: "Automate", d: "Autonomous agents that work while the world sleeps." },
  { k: "03", t: "Scale", d: "Headless architecture. No ceilings. No bottlenecks." },
  { k: "04", t: "Evolve", d: "Systems that learn, adapt and outgrow yesterday." },
];

function Index() {
  return (
    <main className="grain relative overflow-x-clip bg-background">
      <CursorGlow />
      <Nav />
      <Hero />
      <Origin />
      <Awakening />
      <Evolution />
      <Ascension />
      <Capabilities />
      <FinalCTA />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="#top" className="text-xl"><Wordmark /></a>
      <div className="flex items-center gap-8">
        <SoundToggle />
        <a href="#contact" className="tagline hidden text-foreground transition-colors hover:text-gold md:block">Contact</a>
      </div>
    </header>
  );
}

function Hero() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const morph = Math.min(1, p * 1.6);
  return (
    <section id="top" ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 animate-shake">
          <img src={human} alt="Darbo walking through a dark corridor" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" style={{ transform: `scale(${1 + p * 0.15})` }} />
          <img
            src={robot}
            alt="Darbo transformed into a chrome and gold robot"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `scale(${1 + p * 0.15})`,
              WebkitMaskImage: `linear-gradient(0deg, black ${morph * 120 - 20}%, transparent ${morph * 120}%)`,
              maskImage: `linear-gradient(0deg, black ${morph * 120 - 20}%, transparent ${morph * 120}%)`,
            }}
          />
          {/* liquid metal front line */}
          <div className="absolute inset-x-0 h-1 bg-cobalt blur-sm glow-cobalt" style={{ bottom: `${morph * 100}%`, opacity: morph > 0 && morph < 1 ? 1 : 0 }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        <div className="absolute left-1/2 top-[38%] h-px w-[70vw] -translate-x-1/2 bg-cobalt blur-[2px] animate-flare glow-cobalt" />

        {/* letterbox */}
        <div className="absolute inset-x-0 top-0 z-10 bg-background animate-letterbox" />
        <div className="absolute inset-x-0 bottom-0 z-10 bg-background animate-letterbox" />

        <div className="relative z-20 flex h-full flex-col items-center justify-end px-6 pb-[16vh] text-center">
          <Reveal delay={1800}><p className="tagline mb-6 text-cobalt">The Evolution</p></Reveal>
          <Reveal delay={2100}><h1 className="text-[15vw] md:text-[10vw]"><Wordmark /></h1></Reveal>
          <Reveal delay={2500}><p className="mt-6 max-w-xl text-lg font-light text-foreground/85 md:text-xl">Architect of Headless Agentic AI Systems.<br />Building businesses that scale without limits.</p></Reveal>
          <Reveal delay={2900} className="mt-10"><MagneticButton href="#contact">Start the evolution →</MagneticButton></Reveal>
        </div>
        <div className="absolute bottom-[12vh] right-8 z-20 tagline text-muted-foreground">Scroll to play ↓</div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img src={origin} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale-[60%] sepia-[40%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SceneCard n="I" title="Origin" />
        <Reveal delay={200}><h2 className="headline mt-8 max-w-3xl text-5xl text-sepia md:text-8xl">It started with human hands.</h2></Reveal>
        <Reveal delay={400}><p className="mt-6 max-w-md text-lg font-light text-muted-foreground">Paper. Ink. Hours. Every decision made one by one. It worked — until it didn't scale.</p></Reveal>
      </div>
    </section>
  );
}

function Awakening() {
  const streams = Array.from({ length: 18 });
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 opacity-40">
        {streams.map((_, i) => (
          <div key={i} className="absolute top-0 h-full w-px overflow-hidden" style={{ left: `${(i * 5.7) % 100}%` }}>
            <div className="h-1/3 w-px bg-gradient-to-b from-transparent via-cobalt to-transparent" style={{ animation: `scan ${3 + (i % 5)}s linear ${i * 0.3}s infinite` }} />
          </div>
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6 text-right">
        <div className="flex justify-end"><SceneCard n="II" title="Awakening" /></div>
        <Reveal delay={200}><h2 className="headline ml-auto mt-8 max-w-4xl text-5xl md:text-8xl">Then the machines <span className="text-cobalt">woke up.</span></h2></Reveal>
        <Reveal delay={400}><p className="ml-auto mt-6 max-w-md text-lg font-light text-muted-foreground">Signals in the noise. Data that moves on its own. The first systems that think back.</p></Reveal>
      </div>
    </section>
  );
}

function Evolution() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const pct = Math.round(p * 100);
  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <img src={human} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
          <img src={robot} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="absolute inset-y-0 w-[2px] bg-gold glow-gold" style={{ left: `${pct}%` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-between px-6 py-28">
          <SceneCard n="III" title="Evolution" />
          <div>
            <p className="tagline text-gold">Transformation · {pct.toString().padStart(3, "0")}%</p>
            <h2 className="headline mt-4 text-5xl md:text-8xl">The walk never <span className="text-signal">breaks.</span></h2>
            <p className="mt-4 max-w-md text-lg font-light text-foreground/80">Only the body evolves. Same vision. Infinitely more power.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ascension() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img src={space} alt="Earth at night from orbit" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
      <div aria-hidden className="absolute right-[-10vw] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2 rounded-full border border-cobalt/30 animate-orbit md:h-[45vw] md:w-[45vw]">
        {["Agent", "Signal", "Memory", "Action", "Insight"].map((l, i) => (
          <span key={l} className="tagline absolute border border-cobalt/50 bg-background/60 px-3 py-1 text-cobalt backdrop-blur" style={{ left: `${50 + 50 * Math.cos((i / 5) * Math.PI * 2)}%`, top: `${50 + 50 * Math.sin((i / 5) * Math.PI * 2)}%`, transform: "translate(-50%,-50%)" }}>{l}</span>
        ))}
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SceneCard n="IV" title="Ascension" />
        <Reveal delay={200}><h2 className="headline mt-8 max-w-3xl text-5xl md:text-8xl">A new era. <span className="text-gold">Without limits.</span></h2></Reveal>
        <Reveal delay={400}><p className="mt-6 max-w-md text-lg font-light text-foreground/80">Agents working autonomously. Systems that scale across every horizon.</p></Reveal>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-32">
      <Reveal><p className="tagline text-gold">Capabilities</p></Reveal>
      <div className="mt-12 grid gap-px bg-border md:grid-cols-4">
        {capabilities.map((c, i) => (
          <Reveal key={c.t} delay={i * 150} className="h-full">
            <div className="group relative h-full bg-background p-8 transition-colors duration-700 hover:bg-secondary">
              <span className="tagline text-muted-foreground">{c.k}</span>
              <h3 className="headline mt-16 text-3xl transition-colors duration-500 group-hover:text-gold">{c.t}</h3>
              <p className="mt-4 text-sm font-light text-muted-foreground">{c.d}</p>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-cobalt transition-transform duration-700 group-hover:scale-x-100 glow-cobalt" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-40 text-center">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt/10 blur-3xl" />
      <div className="relative">
        <Reveal><p className="tagline text-muted-foreground">Coming soon to a business near you</p></Reveal>
        <Reveal delay={200}><h2 className="mt-8 text-[13vw] md:text-[8vw]"><Wordmark /></h2></Reveal>
        <Reveal delay={400}><p className="mx-auto mt-6 max-w-lg text-lg font-light text-foreground/80">Your business, evolved. Let's start the conversation.</p></Reveal>
        <Reveal delay={600} className="mt-12"><MagneticButton href="mailto:hello@leadzloco.com">Start the conversation →</MagneticButton></Reveal>
        <div className="mt-24 flex justify-center gap-10">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="tagline text-muted-foreground transition-colors hover:text-cobalt">LinkedIn</a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="tagline text-muted-foreground transition-colors hover:text-signal">YouTube</a>
        </div>
        <p className="tagline mt-10 text-muted-foreground/60">© LeadZLoco™ — The Evolution</p>
      </div>
    </section>
  );
}
