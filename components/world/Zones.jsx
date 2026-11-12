import site from '@/config/site.json';
import { CHAINS, CHAIN_LABEL, IS_SINGLE, PRIMARY } from '@/config/chains';
import { ZONES } from './zones';
import { VillageScene, ForestScene, PeakScene, SeaScene, SkyScene, MoonScene } from './Scenes';
import HeroCA from '../HeroCA';
import Tokenomics from '../Tokenomics';
import { LogoMark } from '../Logo';

const Z = Object.fromEntries(ZONES.map((z, i) => [z.id, { ...z, n: i }]));

// Ground color at the bottom of each zone, so the next zone "rises out" of it instead of a hard cut
const GROUND = { village: '#3FA34D', forest: '#0B3327', peak: '#3E2D6B', sea: '#2A3690', sky: '#6E73C4' };

function Zone({ id, scene, children, className = '' }) {
  const prev = ZONES[Z[id].n - 1];
  return (
    <section id={id} className={`relative flex min-h-screen flex-col overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">{scene}</div>
      {prev && <div className="pointer-events-none absolute inset-x-0 top-0 h-[22vh]" aria-hidden="true"
        style={{ background: `linear-gradient(to bottom, ${GROUND[prev.id]}, transparent)` }} />}
      <div className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 lg:pr-24">{children}</div>
    </section>
  );
}

function Chapter({ id, title }) {
  const z = Z[id];
  return (
    <div className="text-center">
      <span className="chapter">{z.icon} AREA {z.n + 1} · {z.name.toUpperCase()}</span>
      <h2 className="section-title mt-4 text-outline">{title}</h2>
      <p className="mt-2 font-semibold text-white text-outline">{z.sub}</p>
    </div>
  );
}

/* 1 ─ Village: start screen */
export function Village() {
  const accent = IS_SINGLE ? PRIMARY.color : '#FFD93D';
  return (
    <Zone id="village" scene={<VillageScene />}>
      <div className="flex min-h-screen flex-col items-center justify-start pb-[34vh] pt-28 sm:pt-32">
        <div className="panel w-full max-w-2xl p-6 text-center sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-semibold"
            style={{ color: accent, borderColor: `${accent}66`, background: `${accent}1A` }}>
            ⚡ {site.symbol} · Meme coin on {CHAIN_LABEL}
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] sm:text-7xl">
            POKEMOON
            <span className="block bg-gradient-to-r from-volt via-yellow-300 to-ember bg-clip-text text-transparent">TO THE MOON!</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-white/80">
            Every great adventure starts in a small village. Grab your backpack, team up with Volty and travel through
            forests, mountains and seas, all the way to the Moon.
            {IS_SINGLE && PRIMARY.tagline && <span className="mt-2 block font-semibold" style={{ color: accent }}>{PRIMARY.tagline}.</span>}
          </p>
          <div className="text-left"><HeroCA /></div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#forest" className="btn-volt">▶ START ADVENTURE</a>
            <a href="#sea" className="btn-ghost">TOKENOMICS</a>
          </div>
        </div>
        <a href="#forest" className="mt-6 animate-hint font-display font-semibold tracking-widest text-navy">SCROLL TO TRAVEL ↓</a>
      </div>
    </Zone>
  );
}

/* 2 ─ Forest: the legend (about) */
const SIGNS = [
  { icon: '🧭', title: 'Explore', text: 'A playful world of electric creatures, wild forests and moon quests.' },
  { icon: '⚡', title: 'Catch', text: 'Catch the excitement and every pump on the road to the Moon.' },
  { icon: '🚀', title: 'Launch', text: `Community-driven, live on ${CHAIN_LABEL}, fuelled by memes.` },
];
export function Forest() {
  return (
    <Zone id="forest" scene={<ForestScene />}>
      <div className="pb-[38vh] pt-28">
        <Chapter id="forest" title="The Legend of Pokemoon" />
        <div className="panel mx-auto mt-8 max-w-3xl p-6 text-center sm:p-8">
          <p className="text-lg text-white/85">
            Long ago, travellers said a road of light ran from a quiet village all the way to the Moon. Few dared to
            walk it alone. <span className="font-semibold text-volt">Pokemoon</span> is the crew that walks it together:
            a community-driven meme coin inspired by monster-catching adventures and the oldest dream in crypto.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {SIGNS.map((s, i) => (
            <div key={s.title} className="relative pt-6">
              <span className="absolute left-1/2 top-0 h-10 w-3 -translate-x-1/2 rounded bg-[#7A4A2A]" />
              <div className="relative rounded-2xl border-4 border-[#7A4A2A] bg-[#C98A55] p-5 text-center text-navy shadow-xl transition hover:-rotate-1 hover:scale-[1.02]"
                style={{ transform: `rotate(${[-2, 1.5, -1][i]}deg)` }}>
                <div className="text-4xl">{s.icon}</div>
                <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-1 font-semibold text-navy/80">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Zone>
  );
}

/* 3 ─ Thunder Peak: meet Volty */
const MOVES = [
  { icon: '⚡', title: 'Pump Bolt', type: 'Electric', text: `His helmet antenna picks up every pump signal across ${CHAIN_LABEL}.` },
  { icon: '🧑‍🚀', title: 'Moon Suit', type: 'Space', text: 'A bright orange suit built for one mission: landing $POKE on the Moon.' },
  { icon: '📡', title: 'Moon Tracker', type: 'Gadget', text: 'The gadget on his belt always points to the next stop on the road.' },
  { icon: '👋', title: 'Friendly Wave', type: 'Normal', text: 'Volty greets every new holder. Nobody gets left behind.' },
];
const STATS = [['HP', 100], ['Spark', 95], ['Speed', 88], ['Vibes', 100]];
export function Peak() {
  return (
    <Zone id="peak" scene={<PeakScene />}>
      <div className="pb-[34vh] pt-28">
        <Chapter id="peak" title={<>A Wild <span className="text-volt text-glow">Volty</span> Appeared!</>} />
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Trainer card */}
          <div className="panel mx-auto w-full max-w-sm overflow-hidden p-0">
            <div className="flex items-center justify-between bg-gradient-to-r from-volt to-ember px-5 py-2 font-display font-bold text-navy">
              <span>VOLTY</span><span>Lv. 99 ⚡</span>
            </div>
            <div className="relative p-5">
              <div className="absolute inset-10 animate-glow rounded-full bg-volt/30 blur-3xl" />
              <img src="/images/volty.webp" alt="Volty, the Pokemoon mascot, waving in a space suit in front of the Moon"
                width={1024} height={1024} loading="lazy" className="relative animate-float rounded-2xl border-2 border-volt/40" />
            </div>
            <div className="space-y-2 px-5 pb-5">
              {STATS.map(([k, v]) => (
                <div key={k} className="flex items-center gap-3 text-sm">
                  <span className="w-12 font-bold text-white/60">{k}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gradient-to-r from-volt to-ember" style={{ width: `${v}%` }} />
                  </span>
                  <span className="w-8 text-right font-bold text-volt">{v}</span>
                </div>
              ))}
              <p className="pt-2 text-center text-xs text-white/50">
                Type: Electric · Space — {IS_SINGLE ? CHAINS[0].name : CHAINS.map((c) => c.short).join(' · ')}
              </p>
            </div>
          </div>

          <div>
            <div className="panel p-6 sm:p-8">
              <p className="text-lg text-white/85">
                Volty was born on the bright side of the Moon, when a lightning storm hit a moon rock and sparked a small,
                very happy electric creature. He trains here on Thunder Peak, charging up in the storms before every trip.
              </p>
              <p className="mt-3 text-lg text-white/85">
                Now he leads the Pokemoon crew: powering up the community, keeping the vibes bright and waving at every new
                explorer. Wherever the chart goes, Volty keeps smiling and keeps climbing.
              </p>
            </div>
            <p className="mt-6 font-display text-sm font-bold tracking-[0.3em] text-white text-outline">MOVES</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {MOVES.map((m) => (
                <div key={m.title} className="panel flex gap-3 p-4 transition hover:-translate-y-1 hover:border-volt/60">
                  <span className="text-3xl">{m.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{m.title}</h3>
                      <span className="rounded-full bg-volt/20 px-2 text-[10px] font-bold uppercase text-volt">{m.type}</span>
                    </div>
                    <p className="text-sm text-white/70">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Zone>
  );
}

/* 4 ─ Crystal Sea: tokenomics treasure */
export function Sea() {
  return (
    <Zone id="sea" scene={<SeaScene />}>
      <div className="pb-[40vh] pt-28">
        <Chapter id="sea" title={<>The <span className="text-volt text-glow">Treasure</span> Map</>} />
        <Tokenomics />
      </div>
    </Zone>
  );
}

/* 5 ─ Starlight Road: quest log */
export function SkyRoad() {
  const quests = site.quests || [];
  return (
    <Zone id="sky" scene={<SkyScene />}>
      <div className="pb-[30vh] pt-28">
        <Chapter id="sky" title="Quest Log" />
        <ol className="panel relative mx-auto mt-10 max-w-2xl space-y-1 p-4 sm:p-6">
          {quests.map((q, i) => {
            const z = Z[q.zone] || {};
            return (
              <li key={i} className={`flex gap-4 rounded-2xl p-3 ${q.done ? 'bg-volt/10' : ''}`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${q.done ? 'bg-volt' : 'bg-white/10'}`}>
                  {z.icon || '⭐'}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg font-semibold">{q.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${q.done ? 'bg-volt text-navy' : 'bg-white/10 text-white/60'}`}>
                      {q.done ? '✓ Cleared' : 'In progress'}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{q.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Zone>
  );
}

/* 6 ─ The Moon: journey complete */
export function Moon() {
  const items = [
    { icon: '✈️', title: 'Join Telegram', text: 'Chat with fellow trainers 24/7.', href: site.social.telegram },
    { icon: '𝕏', title: 'Follow on X', text: '@Pokemoon_Shop: news, memes and launches.', href: site.social.x },
    { icon: '🏡', title: 'Travel Again', text: 'Back to Sparkle Village for another run.', href: '#village' },
  ];
  return (
    <Zone id="moon" scene={<MoonScene />}>
      <div className="pb-[44vh] pt-28 text-center">
        <span className="chapter">🌕 AREA 6 · THE MOON</span>
        <h2 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
          Journey <span className="text-volt text-glow">Complete!</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/75">
          You made it, trainer. Plant your flag, wave at Earth and join the crew that keeps the road to the Moon lit up.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {items.map((it) => {
            const ext = it.href && it.href.startsWith('http');
            const Tag = it.href ? 'a' : 'div';
            return (
              <Tag key={it.title} href={it.href || undefined} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
                className={`panel group block p-7 transition ${it.href ? 'hover:-translate-y-1 hover:border-volt/60' : 'opacity-60'}`}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-volt to-ember text-2xl text-navy transition group-hover:rotate-6">
                  {it.icon}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-1 text-white/65">{it.href ? it.text : 'Coming soon'}</p>
              </Tag>
            );
          })}
        </div>
        <p className="mt-10 font-display text-xl tracking-widest text-volt text-glow">{site.slogan}</p>
      </div>
      <footer className="absolute inset-x-0 bottom-0 z-10 pb-16 text-center text-navy lg:pb-6">
        <LogoMark className="mx-auto h-10 w-10" />
        <p className="mt-2 font-display font-bold">POKEMOON © 2026</p>
        <p className="mx-auto mt-1 max-w-xl px-5 text-xs font-semibold text-navy/70">
          Meme coin for entertainment. Not financial advice. We will never ask for your private key or seed phrase.
        </p>
      </footer>
    </Zone>
  );
}
