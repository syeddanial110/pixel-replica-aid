import { useEffect, useRef, useState, type ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`headline inline-flex items-start ${className}`}>
      <span className="text-chrome">LeadZ</span>
      <span className="text-gold">Loco</span>
      <span className="text-gold text-[0.3em] mt-[0.2em]">™</span>
    </span>
  );
}

/** Text that "boots" like a HUD when scrolled into view. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} ${on ? "animate-boot" : "opacity-0"}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function MagneticButton({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        ref.current!.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      }}
      onMouseLeave={() => (ref.current!.style.transform = "translate(0,0)")}
      className="tagline inline-flex items-center gap-3 border border-gold/60 bg-gold/10 px-8 py-4 text-gold transition-[transform,box-shadow,background-color] duration-500 ease-out hover:bg-gold hover:text-primary-foreground hover:glow-gold"
    >
      {children}
    </a>
  );
}

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[400px] w-[400px] rounded-full bg-cobalt/15 blur-3xl transition-transform duration-300 ease-out md:block"
    />
  );
}

/** Ambient synth drone via WebAudio — off by default. */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctx = useRef<AudioContext | null>(null);
  const toggle = () => {
    if (!on) {
      const ac = new AudioContext();
      const gain = ac.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.08, ac.currentTime + 2);
      const filter = ac.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      [55, 82.4, 110.5].forEach((f) => {
        const o = ac.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = f;
        o.connect(filter);
        o.start();
      });
      filter.connect(gain).connect(ac.destination);
      ctx.current = ac;
    } else {
      ctx.current?.close();
      ctx.current = null;
    }
    setOn(!on);
  };
  return (
    <button onClick={toggle} aria-pressed={on} className="tagline flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold">
      <span className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`w-[2px] bg-current ${on ? "animate-pulse" : ""}`} style={{ height: on ? `${4 + ((i * 5) % 9)}px` : "3px", animationDelay: `${i * 120}ms` }} />
        ))}
      </span>
      Sound {on ? "on" : "off"}
    </button>
  );
}

export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
      }
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return [ref, p] as const;
}

export function SceneCard({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="flex items-center gap-4">
      <span className="tagline text-gold">Scene {n}</span>
      <span className="h-px w-12 bg-gold/50" />
      <span className="tagline text-muted-foreground">{title}</span>
    </Reveal>
  );
}
