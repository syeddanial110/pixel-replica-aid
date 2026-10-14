import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, Cpu, Sparkles, TrendingUp, Linkedin, Youtube, Play, ArrowUpRight } from "lucide-react";
import portrait from "@/assets/darbo-human.jpg";
import space from "@/assets/ascension.jpg";
import { Intro } from "@/components/Intro";
import { CursorGlow, MagneticButton, Reveal, Wordmark } from "@/components/Cinema";
import { approach, capabilities, contact, insights, metrics, nav, testimonials } from "@/content/site";
import { track } from "@/lib/track";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeadZLoco™ — Architect of Headless Agentic AI Systems" },
      { name: "description", content: "Building businesses that scale without limits. Intelligent systems and autonomous agents for the next era of work." },
      { property: "og:title", content: "LeadZLoco™ — Technology evolves. Vision remains human." },
      { property: "og:description", content: "Architect of Headless Agentic AI Systems. Building businesses that scale without limits." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ICONS = { Bot, Cpu, Sparkles, TrendingUp };

function Index() {
  const api = useRef<{ replay: () => void } | null>(null);
  return (
    <main className="grain relative overflow-x-clip bg-background">
      <noscript>
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <p className="headline text-5xl">LeadZLoco™</p>
          <p className="tagline mt-4">Building businesses that scale without limits</p>
          <a href="#site" className="tagline mt-8 text-gold">Enter the site ↓</a>
        </div>
      </noscript>
      <CursorGlow />
      <Intro onReady={(a) => (api.current = a)} />
      <div id="site">
        <Header />
        <Welcome />
        <Capabilities />
        <Approach />
        <About />
        <Results />
        <Insights />
        <FinalCTA />
        <Footer onReplay={() => api.current?.replay()} />
      </div>
    </main>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("site");
    const on = () => setScrolled(!!el && el.getBoundingClientRect().top < -40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`sticky top-0 z-40 transition-all duration-700 ${scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#site" className="text-lg"><Wordmark /></a>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="tagline text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
          ))}
        </nav>
        <a href="#contact" onClick={() => track("cta_click", { where: "header" })} className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-500 ease-cinema hover:scale-105">
          Start the conversation
        </a>
      </div>
    </header>
  );
}

function Label({ children }: { children: string }) {
  return <p className="tagline text-gold">{children}</p>;
}

function Welcome() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-32 md:pt-44">
      <Reveal><Label>Welcome</Label></Reveal>
      <Reveal delay={150}>
        <h1 className="headline mt-8 text-4xl md:text-7xl">
          We architect intelligent systems that let businesses <span className="text-gold">scale without limits.</span>
        </h1>
      </Reveal>
      <Reveal delay={300}>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The tools will keep changing. That's fine. What matters is the system underneath — one that thinks, adapts and grows with you. We build that system, and we build it around people.
        </p>
      </Reveal>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal><Label>Capabilities</Label></Reveal>
      <Reveal delay={100}><h2 className="headline mt-6 text-3xl md:text-5xl">What we do for you.</h2></Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const Icon = ICONS[c.icon];
          return (
            <Reveal key={c.title} delay={i * 120} className="h-full">
              <article className="glass group relative h-full rounded-2xl p-7 transition-all duration-700 ease-cinema hover:-translate-y-1 hover:border-gold/50 hover:glow-gold">
                <Icon className="h-7 w-7 text-cobalt transition-colors duration-500 group-hover:text-gold" strokeWidth={1.4} />
                <h3 className="headline mt-10 text-2xl">{c.title}</h3>
                <p className="mt-3 font-medium text-gold">{c.promise}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal><Label>The evolution approach</Label></Reveal>
      <Reveal delay={100}><h2 className="headline mt-6 text-3xl md:text-5xl">How we work together.</h2></Reveal>
      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-cobalt via-gold to-cobalt md:block" />
        {approach.map((a, i) => (
          <Reveal key={a.step} delay={i * 150}>
            <li className="relative">
              <span className="relative block h-[15px] w-[15px] rounded-full border-2 border-gold bg-background glow-gold" />
              <p className="tagline mt-6 text-muted-foreground">{a.step}</p>
              <h3 className="headline mt-2 text-2xl">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto grid max-w-7xl scroll-mt-24 items-center gap-14 px-6 py-24 md:grid-cols-2">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl">
          <img src={portrait} alt="Darbo, founder of LeadZLoco" loading="lazy" width={1920} height={1088} className="aspect-[4/5] w-full object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      </Reveal>
      <div>
        <Reveal><Label>About Darbo</Label></Reveal>
        <Reveal delay={100}><h2 className="headline mt-6 text-3xl md:text-5xl">The human behind the machine.</h2></Reveal>
        <Reveal delay={200}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            I've spent my career at the edge of what technology can do for a business. What I've learned is simple: the tech is never the point. The point is what it frees people to do. That's why I build systems that do the heavy lifting — so leaders can lead.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <blockquote className="mt-10 border-l-2 border-gold pl-6 text-2xl font-light italic text-foreground">
            "Technology evolves. Vision remains human."
          </blockquote>
        </Reveal>
        <Reveal delay={400}>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="tagline mt-10 inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 transition-colors hover:border-cobalt hover:text-cobalt">
            <Linkedin className="h-4 w-4" /> Connect on LinkedIn
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal><Label>Proof & results</Label></Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 120}>
            <div className="bg-background p-10">
              <p className="headline text-gold text-6xl">{m.value}</p>
              <p className="tagline mt-4 text-muted-foreground">{m.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {testimonials.map((q, i) => (
          <Reveal key={i} delay={i * 150}>
            <figure className="glass rounded-2xl p-8">
              <blockquote className="text-xl font-light leading-relaxed">"{q.quote}"</blockquote>
              <figcaption className="tagline mt-6 text-muted-foreground">{q.name} · {q.role}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section id="insights" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <Reveal><Label>Insights</Label></Reveal>
      <Reveal delay={100}><h2 className="headline mt-6 text-3xl md:text-5xl">Thinking out loud.</h2></Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {insights.map((it, i) => (
          <Reveal key={it.title} delay={i * 120} className="h-full">
            <a href={it.href} target="_blank" rel="noreferrer" className="glass group flex h-full flex-col justify-between rounded-2xl p-7 transition-all duration-700 ease-cinema hover:border-cobalt/60 hover:glow-cobalt">
              <span className="tagline flex items-center gap-2 text-cobalt">
                {it.kind === "Video" ? <Youtube className="h-4 w-4" /> : <Play className="h-4 w-4 rotate-0" />} {it.kind}
              </span>
              <h3 className="mt-14 text-xl font-medium leading-snug">{it.title}</h3>
              <ArrowUpRight className="mt-6 h-5 w-5 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    track("cta_click", { where: "contact_form" });
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("Let's build")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field = "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-gold";
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden py-32">
      <img src={space} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2">
        <div>
          <Reveal><Label>Let's talk</Label></Reveal>
          <Reveal delay={100}><h2 className="headline mt-6 text-4xl md:text-6xl">The next evolution is here. <span className="text-gold">Let's build it together.</span></h2></Reveal>
          <Reveal delay={200}><p className="mt-8 text-lg text-muted-foreground">Tell us where you are and where you want to go. We'll take it from there.</p></Reveal>
        </div>
        <Reveal delay={200}>
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block"><span className="sr-only">Name</span><input required name="name" placeholder="Your name" maxLength={100} className={field} /></label>
              <label className="block"><span className="sr-only">Company</span><input name="company" placeholder="Company" maxLength={100} className={field} /></label>
            </div>
            <label className="block"><span className="sr-only">Email</span><input required type="email" name="email" placeholder="Email" maxLength={255} className={field} /></label>
            <label className="block"><span className="sr-only">Message</span><textarea required name="message" rows={4} placeholder="What would you like to build?" maxLength={1000} className={field} /></label>
            <div className="pt-2"><button type="submit" className="btn-gold tagline rounded-full px-8 py-4 transition-transform duration-500 ease-cinema hover:scale-105">{sent ? "Opening your email…" : "Let's build →"}</button></div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ onReplay }: { onReplay: () => void }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-3xl"><Wordmark /></p>
          <p className="tagline mt-4 text-muted-foreground">Building businesses that scale without limits</p>
          <a href={`mailto:${contact.email}`} className="mt-6 block text-foreground/80 hover:text-gold">{contact.email}</a>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-cobalt"><Linkedin className="h-5 w-5" /></a>
          <a href={contact.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-signal"><Youtube className="h-5 w-5" /></a>
          <a href="#" className="tagline text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="#" className="tagline text-muted-foreground hover:text-foreground">Terms</a>
          <button onClick={onReplay} className="tagline text-gold hover:text-foreground">↺ Replay the intro</button>
        </div>
      </div>
      <p className="tagline pb-8 text-center text-muted-foreground/50">© {new Date().getFullYear()} LeadZLoco™</p>
    </footer>
  );
}
