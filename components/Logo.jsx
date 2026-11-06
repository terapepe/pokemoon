// Original mark: crescent moon carrying a lightning bolt + sparkle.
export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF07A" />
          <stop offset="1" stopColor="#FF8A1F" />
        </linearGradient>
        <mask id="lm-m">
          <rect width="64" height="64" fill="#fff" />
          <circle cx="44" cy="22" r="21" fill="#000" />
        </mask>
      </defs>
      <circle cx="30" cy="34" r="27" fill="url(#lm-g)" mask="url(#lm-m)" />
      <path d="M24 22 L14 40 H23 L19 56 L34 33 H25 L30 22 Z" fill="#070B24" />
      <path d="M50 6 L52 13 L59 15 L52 17 L50 24 L48 17 L41 15 L48 13 Z" fill="#FFD93D" />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2" aria-label="Pokemoon home">
      <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />
      <span className="font-display text-xl font-bold tracking-wide sm:text-2xl">
        POKE<span className="text-volt text-glow">MOON</span>
        <span className="ml-1 hidden text-volt sm:inline">⚡</span>
      </span>
    </a>
  );
}
