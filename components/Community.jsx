import site from '@/config/site.json';

export default function Community() {
  const items = [
    { icon: '✈️', title: 'Join Telegram', text: 'Chat with fellow trainers 24/7.', href: site.social.telegram },
    { icon: '𝕏', title: 'Follow on X', text: '@PokemoonS — news, memes and launches.', href: site.social.x },
    { icon: '🌌', title: 'Explore the Universe', text: 'Discover the Pokemoon world.', href: '#about' },
  ];
  return (
    <section id="community" className="mx-auto max-w-6xl px-5 py-24 text-center">
      <h2 className="section-title">
        Join the <span className="text-volt text-glow">Community</span>
      </h2>
      <p className="mt-3 text-white/60">Every trainer counts on the journey to the Moon.</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {items.map((it) => {
          const ext = it.href && it.href.startsWith('http');
          const Tag = it.href ? 'a' : 'div';
          return (
            <Tag key={it.title} href={it.href || undefined} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
              className={`card group p-8 transition ${it.href ? 'hover:-translate-y-1 hover:border-volt/60 hover:shadow-[0_0_40px_rgba(255,217,61,0.2)]' : 'opacity-60'}`}>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-volt to-ember text-3xl text-navy transition group-hover:rotate-6">
                {it.icon}
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-white/65">{it.href ? it.text : 'Coming soon'}</p>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
