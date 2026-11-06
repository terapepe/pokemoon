const FEATURES = [
  { icon: '⚡', title: 'Explore', text: 'A playful universe of electric creatures, planets and moon quests.' },
  { icon: '🌕', title: 'Catch', text: 'Catch the excitement and every pump on the way to the Moon.' },
  { icon: '🚀', title: 'Launch', text: 'Community-driven, multi-chain, and fuelled by memes.' },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <div className="card relative overflow-hidden p-8 sm:p-14">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/20 blur-3xl" />
        <h2 className="section-title">
          About <span className="text-volt text-glow">Pokemoon</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-white/80">
          Pokemoon is a community-driven meme coin inspired by Pokémon and the legendary crypto dream of going to the Moon.
        </p>
        <p className="mt-4 font-display text-xl text-volt">
          Catch the excitement. Join the community. Let&apos;s take $POKEMOON to the Moon!
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-navy/60 p-6 transition hover:-translate-y-1 hover:border-volt/50">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-3 font-display text-2xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/70">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
