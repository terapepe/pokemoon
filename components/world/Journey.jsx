'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ZONES } from './zones';
import Traveler from './Traveler';

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => { const A = rgb(a), B = rgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; };
const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

const Ctx = createContext({ zone: 0 });
export const useJourney = () => useContext(Ctx);

/** Drives the whole "walk through the world" effect: sky colors, parallax vars, current zone. */
export function JourneyProvider({ children }) {
  const [zone, setZone] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const els = ZONES.map((z) => document.getElementById(z.id));
    let raf = 0, cur = -1, idle;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight, mid = vh / 2;
      const max = root.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      let idx = 0, t = 0;
      els.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--lp', ((mid - (r.top + r.height / 2)) / vh).toFixed(4));
        if (r.top <= mid) { idx = i; t = Math.min(1, (mid - r.top) / r.height); }
      });
      const k = smooth(0.55, 1, t);
      const a = ZONES[idx], b = ZONES[Math.min(idx + 1, ZONES.length - 1)];
      root.style.setProperty('--sky-top', mix(a.top, b.top, k));
      root.style.setProperty('--sky-bot', mix(a.bot, b.bot, k));
      root.style.setProperty('--stars', (a.stars + (b.stars - a.stars) * k).toFixed(3));
      root.style.setProperty('--p', p.toFixed(4));
      root.style.setProperty('--moon-s', (0.35 + p * 1.3).toFixed(3));
      root.style.setProperty('--moon-o', (smooth(0.05, 0.6, p) * (1 - smooth(0.82, 0.93, p))).toFixed(3));
      if (idx !== cur) { cur = idx; setZone(idx); }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
      root.dataset.moving = '1';
      clearTimeout(idle);
      idle = setTimeout(() => { root.dataset.moving = ''; }, 180);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, []);

  return <Ctx.Provider value={{ zone }}>{children}</Ctx.Provider>;
}

// Deterministic stars (no hydration mismatch)
function rand(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
const r = rand(7);
const STARS = Array.from({ length: 110 }, () => ({ x: r() * 100, y: r() * 85, s: r() * 2 + 0.6, d: r() * 4 }));

/** Fixed sky behind everything. Colors/opacity come from CSS vars set by JourneyProvider. */
export function Sky() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true"
      style={{ background: 'linear-gradient(to bottom, var(--sky-top), var(--sky-bot))' }}>
      <div className="absolute inset-0" style={{ opacity: 'var(--stars)' }}>
        {STARS.map((st, i) => (
          <span key={i} className="absolute animate-twinkle rounded-full bg-white"
            style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }} />
        ))}
        <span className="absolute right-0 top-[12%] h-0.5 w-24 animate-shoot rounded-full bg-gradient-to-l from-transparent to-white" />
        <span className="absolute right-[20%] top-[4%] h-0.5 w-16 animate-shoot rounded-full bg-gradient-to-l from-transparent to-white [animation-delay:3.5s]" />
      </div>
      {/* Sun sets as you travel */}
      <div className="absolute left-[12%] h-24 w-24 rounded-full bg-[#FFF3B0] shadow-[0_0_80px_30px_rgba(255,220,120,0.65)] sm:h-32 sm:w-32"
        style={{ top: 'calc(8vh + var(--p) * 160vh)', opacity: 'calc(1 - var(--stars) * 1.2)' }} />
      {/* The Moon grows as you approach */}
      <div className="absolute right-[8%] top-[9vh] h-40 w-40 origin-top-right rounded-full"
        style={{
          transform: 'scale(var(--moon-s))', opacity: 'var(--moon-o)',
          background: 'radial-gradient(circle at 38% 35%, #FFFBEA, #FFE9A3 60%, #FFC24D)',
          boxShadow: '0 0 80px 20px rgba(255,217,61,0.35)',
        }} />
      {/* Daytime clouds */}
      <div className="absolute inset-0" style={{ opacity: 'calc(1 - var(--stars) * 1.6)' }}>
        {[[14, 0, 1], [28, -22, 0.7], [8, -40, 0.85]].map(([top, delay, s], i) => (
          <div key={i} className="absolute left-0 animate-cloud" style={{ top: `${top}%`, animationDelay: `${delay}s`, scale: s }}>
            <div className="relative h-12 w-40">
              <span className="absolute bottom-0 left-0 h-8 w-40 rounded-full bg-white/90" />
              <span className="absolute bottom-3 left-6 h-12 w-16 rounded-full bg-white/90" />
              <span className="absolute bottom-2 left-16 h-14 w-20 rounded-full bg-white/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Game HUD: "Now entering…" toast, zone map, mobile progress bar, traveler. */
export function HUD() {
  const { zone } = useJourney();
  const z = ZONES[zone];
  return (
    <>
      <div key={z.id} className="pointer-events-none fixed bottom-8 left-1/2 z-40 hidden animate-toast lg:block" aria-live="polite">
        <div className="panel flex items-center gap-3 px-5 py-2.5">
          <span className="text-2xl">{z.icon}</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Now entering</p>
            <p className="font-display text-lg font-bold leading-tight text-volt">{z.name}</p>
          </div>
        </div>
      </div>

      <nav aria-label="World map" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="relative flex flex-col gap-5 rounded-full border-2 border-white/20 bg-navy/60 p-2 backdrop-blur">
          <span className="absolute left-1/2 top-6 bottom-6 w-1 -translate-x-1/2 rounded-full bg-white/15" />
          <span className="absolute left-1/2 top-6 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-volt to-ember"
            style={{ height: 'calc((100% - 3rem) * var(--p))' }} />
          {ZONES.map((it, i) => (
            <a key={it.id} href={`#${it.id}`} title={it.name}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition
                ${i === zone ? 'scale-110 bg-volt shadow-[0_0_20px_rgba(255,217,61,0.8)]' : i < zone ? 'bg-ember/80' : 'bg-space opacity-60 hover:opacity-100'}`}>
              {it.icon}
              <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-lg bg-navy/90 px-2 py-1 text-xs font-semibold opacity-0 transition group-hover:opacity-100">
                {it.name}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="mx-auto mb-3 flex w-max items-center gap-2 rounded-full border-2 border-white/20 bg-navy/80 px-4 py-1.5 text-sm font-semibold backdrop-blur">
          <span>{z.icon}</span><span className="text-volt">{z.name}</span>
          <span className="text-white/40">{zone + 1}/{ZONES.length}</span>
        </div>
        <div className="h-1.5 bg-navy/60">
          <div className="h-full bg-gradient-to-r from-volt to-ember" style={{ width: 'calc(var(--p) * 100%)' }} />
        </div>
      </div>

      <Traveler zone={z.id} />
    </>
  );
}
