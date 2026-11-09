import site from '@/config/site.json';
import { CHAIN_LABEL, IS_SINGLE, PRIMARY } from '@/config/chains';
import HeroScene from './HeroScene';
import HeroCA from './HeroCA';

export default function Hero() {
  const accent = IS_SINGLE ? PRIMARY.color : '#FFD93D';
  return (
    <section id="home" className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-32 lg:grid-cols-2 lg:pt-40">
      <div className="text-center lg:text-left">
        <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-semibold"
          style={{ color: accent, borderColor: `${accent}66`, background: `${accent}1A` }}>
          {IS_SINGLE && <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />}
          ⚡ {site.symbol} · Meme coin on {CHAIN_LABEL}
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl xl:text-7xl">
          POKEMON <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-volt via-yellow-300 to-ember bg-clip-text text-transparent">TO THE MOON!</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75 lg:mx-0">
          Welcome to Pokemoon, where Pokémon meets crypto. Join Volty and the community on an epic journey to the Moon!
          {IS_SINGLE && PRIMARY.tagline && <span className="mt-2 block font-semibold" style={{ color: accent }}>{PRIMARY.tagline}.</span>}
        </p>
        <HeroCA />
        <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a href="#tokenomics" className="btn-ghost">TOKENOMICS</a>
          <a href="#community" className="btn-ghost">JOIN COMMUNITY</a>
        </div>
        <p className="mt-6 font-display text-xl tracking-widest text-volt/80">{site.slogan}</p>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <HeroScene />
      </div>
    </section>
  );
}
