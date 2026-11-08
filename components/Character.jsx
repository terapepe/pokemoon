import { CHAINS, CHAIN_LABEL, IS_SINGLE } from '@/config/chains';

const TRAITS = [
  { icon: '⚡', title: 'Electric Antenna', text: `The lightning bolt on his helmet picks up every pump signal across ${CHAIN_LABEL}.` },
  { icon: '🧑‍🚀', title: 'Moon Suit', text: 'A bright orange space suit built for one mission only: landing $POKE on the Moon.' },
  { icon: '📡', title: 'Moon Tracker', text: 'The gadget on his belt always points to the next stop on the road to the Moon.' },
  { icon: '👋', title: 'Friendly Wave', text: 'Volty greets every new holder. Nobody gets left behind on the trip.' },
];

const STATS = [
  ['Name', 'Volty'],
  ['Type', 'Electric · Space'],
  ['Home', 'The Moon 🌕'],
  [IS_SINGLE ? 'Chain' : 'Chains', IS_SINGLE ? CHAINS[0].name : CHAINS.map((c) => c.short).join(' · ')],
];

export default function Character() {
  return (
    <section id="volty" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="section-title text-center">
        Meet <span className="text-volt text-glow">Volty</span>
      </h2>
      <p className="mt-3 text-center text-white/60">The electric mascot of Pokemoon</p>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-6 animate-glow rounded-full bg-volt/30 blur-3xl" />
          <img
            src="/images/volty.webp"
            alt="Volty, the Pokemoon mascot, waving in a space suit in front of the Moon"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative animate-float rounded-[2rem] border-2 border-volt/40 shadow-[0_0_60px_rgba(255,217,61,0.35)]"
          />
          <span className="absolute -right-2 top-6 animate-twinkle text-4xl">✨</span>
          <span className="absolute -left-3 bottom-16 animate-twinkle text-3xl [animation-delay:1.2s]">⚡</span>
          <img
            src="/images/pokemoon-logo.webp"
            alt="Pokemoon logo"
            width={1024}
            height={1024}
            loading="lazy"
            className="absolute -bottom-8 -right-4 w-28 rotate-6 rounded-2xl border border-volt/40 shadow-2xl sm:w-36"
          />
        </div>

        <div>
          <p className="text-lg text-white/80">
            Volty was born on the bright side of the Moon, where a lightning storm hit a moon rock and sparked a small,
            very happy electric creature. He grew up watching Earth light up below him, and he made it his mission to
            bring everyone back to the Moon with him.
          </p>
          <p className="mt-4 text-lg text-white/80">
            Now Volty leads the Pokemoon crew. He powers up the community, keeps the vibes bright and waves at every new
            explorer who joins. Wherever the chart goes, Volty keeps smiling and keeps flying.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-white/10 bg-navy/60 p-3 text-center">
                <p className="text-xs uppercase tracking-widest text-white/50">{k}</p>
                <p className="mt-1 font-display font-semibold text-volt">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRAITS.map((t) => (
          <div key={t.title} className="card p-6 transition hover:-translate-y-1 hover:border-volt/50">
            <div className="text-4xl">{t.icon}</div>
            <h3 className="mt-3 font-display text-xl font-semibold">{t.title}</h3>
            <p className="mt-2 text-white/70">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
