import { useCallback, useEffect, useRef, useState } from "react";
import human from "@/assets/darbo-human.jpg";
import robot from "@/assets/darbo-robot.jpg";
import command from "@/assets/command-center.jpg";
import earth from "@/assets/earth-network.jpg";
import cityHuman from "@/assets/city-human.jpg";
import cityRobot from "@/assets/city-robot.jpg";
import { SoundToggle } from "@/components/Cinema";
import { track } from "@/lib/track";

/** Hands-off runtime of the opening in seconds. */
const RUNTIME = 18;
/** Idle time before auto-play resumes after the visitor scrolls. */
const IDLE_MS = 3000;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
/** Local 0..1 progress inside [a, b]. */
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
/** 0→1→0 visibility window with soft edges. */
const win = (t: number, a: number, b: number, edge = 0.025) =>
  Math.min(seg(t, a, a + edge), 1 - seg(t, b - edge, b));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const SCENES = [
  { n: "01", label: "Evolution", at: 0 },
  { n: "02", label: "Awakening", at: 0.25 },
  { n: "03", label: "World", at: 0.5 },
  { n: "04", label: "Ascension", at: 0.75 },
];

export function Intro({ onReady }: { onReady?: (api: { replay: () => void }) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [t, setT] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const state = useRef({ auto: true, lastInput: 0, pos: 0, done: false });

  const geometry = () => {
    const el = ref.current!;
    const top = el.offsetTop;
    const total = el.offsetHeight - window.innerHeight;
    return { top, total };
  };

  const replay = useCallback(() => {
    const s = state.current;
    s.auto = true;
    s.done = false;
    s.pos = 0;
    s.lastInput = 0;
    window.scrollTo({ top: 0 });
    track("intro_replay");
  }, []);

  const skip = () => {
    state.current.auto = false;
    state.current.done = true;
    const { top, total } = geometry();
    window.scrollTo({ top: top + total + 1, behavior: "smooth" });
    track("intro_skip", { at: Math.round(t * 100) });
  };

  useEffect(() => onReady?.({ replay }), [onReady, replay]);

  // Master timeline: scroll position is the single source of truth.
  useEffect(() => {
    const s = state.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) s.auto = false;
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);

    const onInput = () => {
      s.lastInput = performance.now();
    };
    const inputs = ["wheel", "touchstart", "touchmove", "keydown", "pointerdown"] as const;
    inputs.forEach((e) => window.addEventListener(e, onInput, { passive: true }));

    let raf = 0;
    let prev = performance.now();
    let completed = false;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - prev) / 1000);
      prev = now;
      const { top, total } = geometry();
      const y = window.scrollY - top;
      const progress = clamp(y / total);
      const scrubbing = now - s.lastInput < IDLE_MS;

      if (scrubbing || Math.abs(y - s.pos) > 2) s.pos = y; // visitor owns the timeline
      if (!reduced && s.auto && !scrubbing && !s.done && progress < 1 && y >= -1) {
        s.pos = Math.max(0, s.pos) + (total / RUNTIME) * dt;
        window.scrollTo({ top: top + s.pos });
      }
      if (progress >= 1 && !completed) {
        completed = true;
        track("intro_complete");
      }
      if (progress < 0.9) completed = false;
      setT(progress);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(skipTimer);
      inputs.forEach((e) => window.removeEventListener(e, onInput));
    };
  }, []);

  // Scene progress
  const s1 = seg(t, 0.03, 0.24);
  const s2 = seg(t, 0.25, 0.5);
  const s3 = seg(t, 0.5, 0.75);
  const s4 = seg(t, 0.75, 0.92);
  const fin = seg(t, 0.92, 1);

  const reveal = ease(s1) * 170; // robot spreads from the hand upward
  const stage = s1 < 0.25 ? "Hand" : s1 < 0.5 ? "Arm" : s1 < 0.75 ? "Chest" : "Face";
  const sceneIndex = t < 0.25 ? 0 : t < 0.5 ? 1 : t < 0.75 ? 2 : 3;

  return (
    <section ref={ref} aria-label="Opening cinematic" className="relative h-[700vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        {/* Scene 1 — The transformation */}
        <div className="absolute inset-0" style={{ opacity: 1 - seg(t, 0.23, 0.28) }}>
          <div className="absolute inset-0 animate-flicker">
            <div className="absolute inset-0 animate-shake" style={{ transform: `scale(${1.05 + s1 * 0.12})` }}>
              <img src={human} alt="Darbo walking toward the camera" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
              <img
                src={robot}
                alt=""
                width={1920}
                height={1088}
                className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                style={{
                  WebkitMaskImage: `radial-gradient(circle at 35% 105%, black ${reveal - 25}%, transparent ${reveal}%)`,
                  maskImage: `radial-gradient(circle at 35% 105%, black ${reveal - 25}%, transparent ${reveal}%)`,
                }}
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          {s1 > 0 && s1 < 1 && (
            <p className="tagline absolute right-6 top-24 text-cobalt md:right-10">Stage · {stage}</p>
          )}
        </div>

        {/* Scene 2 — The awakening */}
        <div className="absolute inset-0" style={{ opacity: seg(t, 0.23, 0.28) * (1 - seg(t, 0.52, 0.62)) }}>
          <div className="absolute inset-0" style={{ transform: `scale(${1.15 - s2 * 0.1 - s3 * 0.6}) translateY(${s3 * 20}%)`, filter: `brightness(${0.35 + ease(s2) * 0.85}) blur(${s3 * 8}px)` }}>
            <img src={command} alt="Robot Darbo raising his hand in a vast command center" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[30%_40%]" />
          </div>
          <DataStreams strength={ease(s2)} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/70" />
        </div>
        {/* light flash between beats */}
        <div className="pointer-events-none absolute inset-0 bg-foreground mix-blend-overlay" style={{ opacity: win(t, 0.36, 0.42, 0.03) * 0.7 + win(t, 0.235, 0.29, 0.025) * 0.5 }} />

        {/* Scene 3 — The world connects */}
        <div className="absolute inset-0" style={{ opacity: seg(t, 0.55, 0.62) * (1 - seg(t, 0.76, 0.8)) }}>
          <div className="absolute inset-0" style={{ transform: `scale(${2.2 - ease(s3) * 1.15})` }}>
            <img src={earth} alt="Earth at night, connected by streams of golden light" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" style={{ filter: `saturate(${0.6 + s3 * 0.6}) brightness(${0.6 + s3 * 0.5})` }} />
            <NetworkArcs progress={seg(t, 0.6, 0.74)} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        </div>

        {/* Scene 4 — The ascension (orbit + reversal back to human) */}
        <div className="absolute inset-0 [perspective:1400px]" style={{ opacity: seg(t, 0.76, 0.8) * (1 - seg(t, 0.92, 0.96)) }}>
          <div
            className="absolute inset-[-8%]"
            style={{ transform: `rotateY(${(0.5 - s4) * 16}deg) translateX(${(0.5 - s4) * 6}%) scale(${1.05 + s4 * 0.08})` }}
          >
            <img src={cityHuman} alt="Darbo, human again, on a platform above a future city" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[50%_35%]" />
            <img src={cityRobot} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[50%_35%]" style={{ opacity: 1 - ease(seg(s4, 0.15, 0.75)) }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
        </div>

        {/* Lens flare that rides scene transitions */}
        <div className="pointer-events-none absolute left-1/2 top-[40%] h-[2px] w-[80vw] -translate-x-1/2 bg-cobalt blur-[2px] glow-cobalt" style={{ opacity: 0.25 + win(t, 0.22, 0.3) + win(t, 0.48, 0.56) + win(t, 0.73, 0.8) }} />

        {/* Title cards */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end px-6 pb-[18svh] text-center">
          <Card show={win(t, 0.12, 0.24)} small="Scene 01" big="The evolution begins" />
          <Card show={win(t, 0.3, 0.4)} small="Scene 02" big="Intelligence has evolved" />
          <Card show={win(t, 0.41, 0.5)} small="" big="The future doesn't wait" gold />
          <Card show={win(t, 0.62, 0.75)} small="Scene 03" big="Without limits" sub="One vision. Unlimited reach." />
          <Card show={win(t, 0.78, 0.85)} small="Scene 04" big="The next evolution is here" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center" style={{ opacity: win(t, 0.855, 0.935, 0.02) }}>
          <h2 className="headline max-w-5xl text-4xl md:text-7xl" style={{ transform: `translateY(${(1 - seg(t, 0.855, 0.88)) * 20}px)` }}>
            <span className="text-chrome">Technology evolves.</span>
            <br />
            <span className="text-gold">Vision remains human.</span>
          </h2>
        </div>

        {/* Finale */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black px-6 text-center" style={{ opacity: seg(t, 0.93, 0.96), pointerEvents: fin > 0.5 ? "auto" : "none" }}>
          <h2 className="headline flex items-start text-[14vw] md:text-[9vw]">
            <span className="text-chrome transition-all duration-[1500ms]" style={{ opacity: seg(t, 0.94, 0.965), filter: `blur(${(1 - seg(t, 0.94, 0.965)) * 12}px)` }}>LeadZ</span>
            <span className="text-gold" style={{ opacity: seg(t, 0.96, 0.985), filter: `blur(${(1 - seg(t, 0.96, 0.985)) * 12}px) brightness(${1 + (1 - seg(t, 0.96, 0.985))})` }}>Loco</span>
            <span className="text-gold mt-[0.2em] text-[0.3em]" style={{ opacity: seg(t, 0.975, 0.99) }}>™</span>
          </h2>
          <p className="tagline mt-6 text-foreground/80" style={{ opacity: seg(t, 0.975, 1) }}>Building businesses that scale without limits</p>
          <div className="mt-14 flex flex-col items-center gap-6" style={{ opacity: seg(t, 0.985, 1) }}>
            <a href="#site" onClick={() => track("intro_enter")} className="tagline group flex flex-col items-center gap-3 text-gold">
              Enter
              <span className="block h-10 w-px bg-gold transition-transform duration-700 ease-cinema group-hover:translate-y-2" />
            </a>
            <button onClick={replay} className="tagline text-muted-foreground transition-colors hover:text-foreground">↺ Replay</button>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10" style={{ opacity: t > 0.005 || showSkip ? 1 : 0, transition: "opacity 1s" }}>
          <SoundToggle scene={sceneIndex} />
          <button
            onClick={skip}
            className="tagline text-muted-foreground transition-all duration-700 hover:text-gold"
            style={{ opacity: showSkip && t < 0.95 ? 1 : 0, pointerEvents: showSkip && t < 0.95 ? "auto" : "none" }}
          >
            Skip intro →
          </button>
        </div>
        <div className="absolute inset-x-6 bottom-6 z-30 md:inset-x-10">
          <div className="relative h-px bg-foreground/15">
            <div className="absolute inset-y-0 left-0 bg-gold glow-gold" style={{ width: `${t * 100}%` }} />
          </div>
          <div className="mt-3 grid grid-cols-4">
            {SCENES.map((s, i) => (
              <span key={s.n} className={`tagline transition-colors duration-700 ${i === sceneIndex ? "text-gold" : "text-muted-foreground/50"}`}>
                {s.n} <span className="hidden md:inline">· {s.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ show, small, big, sub, gold }: { show: number; small: string; big: string; sub?: string; gold?: boolean }) {
  if (show <= 0) return null;
  return (
    <div className="absolute inset-x-6 bottom-[18svh] text-center" style={{ opacity: show, filter: `blur(${(1 - show) * 6}px)`, letterSpacing: `${(1 - show) * 0.1}em` }}>
      {small && <p className="tagline mb-4 text-cobalt">{small}</p>}
      <p className={`headline text-3xl uppercase md:text-6xl ${gold ? "text-gold" : "text-chrome"}`}>{big}</p>
      {sub && <p className="mt-4 text-lg font-light text-foreground/80">{sub}</p>}
    </div>
  );
}

function DataStreams({ strength }: { strength: number }) {
  return (
    <div aria-hidden className="absolute inset-0" style={{ opacity: strength * 0.7 }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className="absolute top-0 h-full w-px overflow-hidden" style={{ left: `${(i * 4.6 + 2) % 100}%` }}>
          <div className="h-1/3 w-px bg-gradient-to-b from-transparent via-cobalt to-transparent" style={{ animation: `scan ${2.5 + (i % 5)}s linear ${i * 0.2}s infinite` }} />
        </div>
      ))}
    </div>
  );
}

const ARCS = [
  "M 250 650 Q 600 250 960 520",
  "M 960 520 Q 1250 250 1550 420",
  "M 1550 420 Q 1700 700 1650 900",
  "M 960 520 Q 1150 800 1400 950",
  "M 400 900 Q 700 600 960 520",
  "M 250 650 Q 900 100 1550 420",
];

function NetworkArcs({ progress }: { progress: number }) {
  return (
    <svg aria-hidden viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {ARCS.map((d, i) => {
        const p = clamp(progress * 1.6 - i * 0.12);
        return (
          <path key={d} d={d} fill="none" stroke="var(--gold)" strokeWidth={2.5} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} style={{ filter: "drop-shadow(0 0 8px var(--gold))" }} />
        );
      })}
    </svg>
  );
}
