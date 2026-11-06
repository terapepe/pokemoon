// Original illustration: a boy and "Volty" (Pokemoon's electric space mascot) walking a glowing path to the Moon.
export default function HeroScene() {
  return (
    <svg viewBox="0 0 600 620" className="h-auto w-full drop-shadow-2xl" role="img" aria-label="A boy and the Pokemoon mascot walking toward the Moon">
      <defs>
        <radialGradient id="moon" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#FFFBEA" />
          <stop offset="0.6" stopColor="#FFE9A3" />
          <stop offset="1" stopColor="#FFC24D" />
        </radialGradient>
        <radialGradient id="moonGlow">
          <stop offset="0" stopColor="#FFD93D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFD93D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="road" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FF8A1F" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#FFD93D" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFF4CF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ground" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#2A3680" />
          <stop offset="1" stopColor="#0B1236" />
        </radialGradient>
        <linearGradient id="fadeG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.82" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="fade"><rect width="600" height="620" fill="url(#fadeG)" /></mask>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#FFD93D" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FFD93D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Moon */}
      <circle cx="400" cy="175" r="200" fill="url(#moonGlow)" className="animate-glow" />
      <circle cx="400" cy="175" r="120" fill="url(#moon)" />
      <g fill="#F2C35B" opacity="0.55">
        <circle cx="360" cy="140" r="18" />
        <circle cx="440" cy="120" r="10" />
        <circle cx="430" cy="215" r="24" />
        <circle cx="365" cy="225" r="9" />
        <circle cx="470" cy="175" r="7" />
      </g>

      {/* Ringed planet */}
      <g className="animate-float" style={{ animationDuration: '7s' }}>
        <circle cx="95" cy="130" r="30" fill="#6C7BFF" />
        <circle cx="86" cy="120" r="9" fill="#8F9BFF" opacity="0.8" />
        <ellipse cx="95" cy="132" rx="54" ry="11" fill="none" stroke="#FF8A1F" strokeWidth="4" transform="rotate(-18 95 132)" />
      </g>

      {/* Sparkles */}
      {[
        [210, 70, 1], [540, 330, 0.8], [260, 250, 0.7], [520, 60, 0.9], [150, 300, 0.6],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          className="animate-twinkle"
          style={{ animationDelay: `${i * 0.6}s` }}
          transform={`translate(${x} ${y}) scale(${s})`}
          d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z"
          fill="#FFF4CF"
        />
      ))}

      {/* Lunar ground + glowing path */}
      <g mask="url(#fade)">
      <ellipse cx="300" cy="660" rx="295" ry="175" fill="url(#ground)" />
      <path d="M90 620 L530 620 L412 300 L388 300 Z" fill="url(#road)" />
      <g fill="#FFF4CF">
        {[[300, 600, 4], [318, 545, 3.4], [333, 495, 3], [346, 450, 2.6], [358, 410, 2.2], [368, 375, 1.8], [377, 345, 1.5], [385, 320, 1.2]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="animate-twinkle" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </g>

      </g>

      {/* Duo */}
      <g transform="translate(320 612) scale(1.55) translate(-330 -578)">
      <g className="animate-float" style={{ animationDuration: '4s' }}>
        <circle cx="372" cy="515" r="78" fill="url(#halo)" className="animate-glow" />

        {/* Boy (back view) */}
        <g>
          <rect x="276" y="535" width="12" height="38" rx="5" fill="#1E2A5A" />
          <rect x="294" y="530" width="12" height="38" rx="5" fill="#1E2A5A" />
          <ellipse cx="282" cy="575" rx="10" ry="5" fill="#F4F6FF" />
          <ellipse cx="300" cy="570" rx="10" ry="5" fill="#F4F6FF" />
          <rect x="258" y="488" width="11" height="42" rx="5.5" fill="#3B82F6" transform="rotate(8 263 488)" />
          <path d="M312 494 Q330 506 342 524" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="343" cy="526" r="6" fill="#F2C29B" />
          <rect x="266" y="478" width="50" height="62" rx="17" fill="#3B82F6" />
          <rect x="276" y="487" width="30" height="38" rx="9" fill="#FFD93D" stroke="#FF8A1F" strokeWidth="3" />
          <path d="M293 494 L284 508 H291 L288 519 L299 504 H292 Z" fill="#FF8A1F" />
          <circle cx="267" cy="460" r="5" fill="#F2C29B" />
          <circle cx="315" cy="460" r="5" fill="#F2C29B" />
          <circle cx="291" cy="457" r="24" fill="#2B1D14" />
          <path d="M276 440 Q291 428 306 440" stroke="#4A3324" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>

        {/* Volty mascot (back view, space helmet) */}
        <g>
          <ellipse cx="358" cy="573" rx="10" ry="6" fill="#E06F0A" />
          <ellipse cx="384" cy="573" rx="10" ry="6" fill="#E06F0A" />
          <circle cx="398" cy="548" r="9" fill="#FFE27A" />
          <ellipse cx="371" cy="540" rx="29" ry="31" fill="#FF8A1F" />
          <rect x="343" y="536" width="56" height="7" rx="3.5" fill="#FFD93D" />
          <rect x="356" y="512" width="30" height="24" rx="8" fill="#E06F0A" />
          <circle cx="348" cy="527" r="7" fill="#FFD93D" />
          <circle cx="347" cy="474" r="11" fill="#FFD93D" />
          <circle cx="395" cy="474" r="11" fill="#FFD93D" />
          <circle cx="347" cy="474" r="5" fill="#FFB020" />
          <circle cx="395" cy="474" r="5" fill="#FFB020" />
          <circle cx="371" cy="498" r="31" fill="#FFD93D" />
          <path d="M371 468 Q373 455 381 448" stroke="#FFD93D" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M383 430 L374 446 H381 L377 458 L390 441 H383 L387 430 Z" fill="#FFF07A" stroke="#FF8A1F" strokeWidth="1.5" />
          <circle cx="371" cy="494" r="45" fill="#BFE3FF" fillOpacity="0.12" stroke="#DDF0FF" strokeOpacity="0.8" strokeWidth="2.5" />
          <path d="M342 474 Q350 458 366 453" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      </g>
      </g>
    </svg>
  );
}
