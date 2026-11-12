// Original landscape art for each zone. Layers move at different speeds (parallax) via --lp.
function Layer({ d = 0, className = '', children }) {
  return <div className={`layer ${className}`} style={{ '--d': `${d}px` }}>{children}</div>;
}
function Art({ h = '60%', vb = '0 0 1440 400', children, className = '' }) {
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMax slice" className={`absolute inset-x-0 bottom-0 w-full ${className}`} style={{ height: h }}>
      {children}
    </svg>
  );
}

/* ---------- 1. Sparkle Village ---------- */
function House({ x, y, s = 1, roof = '#FF6B5B' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-34" y="-50" width="68" height="50" rx="4" fill="#FFF4CF" />
      <path d="M-44 -48 L0 -88 L44 -48 Z" fill={roof} />
      <rect x="18" y="-92" width="10" height="22" fill="#9C5B3A" />
      <rect x="-9" y="-28" width="18" height="28" rx="3" fill="#9C5B3A" />
      <rect x="-27" y="-40" width="13" height="12" rx="2" fill="#FFD93D" />
      <rect x="14" y="-40" width="13" height="12" rx="2" fill="#FFD93D" />
    </g>
  );
}
function Tree({ x, y, s = 1, c = '#3FA34D' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="-30" width="10" height="30" fill="#8A5A3B" />
      <circle cx="0" cy="-48" r="26" fill={c} />
      <circle cx="-14" cy="-36" r="16" fill={c} />
      <circle cx="14" cy="-36" r="16" fill={c} />
    </g>
  );
}
export function VillageScene() {
  return (
    <>
      <Layer d={-40}>
        <Art h="58%"><path d="M0 230 Q240 150 480 210 T960 190 T1440 200 V400 H0 Z" fill="#9BDB8F" /></Art>
      </Layer>
      <Layer d={-20}>
        <Art h="58%">
          <path d="M0 280 Q300 210 620 270 T1440 250 V400 H0 Z" fill="#6CC56B" />
          {/* Windmill */}
          <g transform="translate(1180 250)">
            <path d="M-18 0 L-10 -90 H10 L18 0 Z" fill="#FFF4CF" />
            <g className="animate-spinslow" style={{ transformOrigin: '0px -90px' }}>
              {[0, 90, 180, 270].map((a) => <rect key={a} x="-6" y="-160" width="12" height="70" rx="3" fill="#FF8A1F" transform={`rotate(${a} 0 -90)`} />)}
            </g>
            <circle cy="-90" r="7" fill="#9C5B3A" />
          </g>
          <House x={300} y={268} s={0.8} roof="#4C7BFF" />
          <House x={420} y={262} s={0.9} />
          <House x={980} y={262} s={0.85} roof="#A855F7" />
          <Tree x={200} y={272} s={0.8} />
          <Tree x={540} y={268} s={0.9} c="#4BB35A" />
          <Tree x={880} y={266} s={0.85} />
          <Tree x={1320} y={262} s={0.9} c="#4BB35A" />
        </Art>
      </Layer>
      <Layer d={0}>
        <Art h="58%">
          <path d="M0 330 Q360 300 720 325 T1440 320 V400 H0 Z" fill="#3FA34D" />
          <path d="M650 400 Q700 360 720 330 Q740 360 790 400 Z" fill="#F2D49B" />
          {Array.from({ length: 22 }, (_, i) => (
            <g key={i}>
              <rect x={i * 70 + 6} y="340" width="6" height="26" fill="#FFF4CF" />
            </g>
          ))}
          <rect x="0" y="348" width="1440" height="5" fill="#FFF4CF" />
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={(i * 137) % 1440} cy={372 + ((i * 53) % 24)} r="4" fill={['#FF6B9A', '#FFD93D', '#FFFFFF'][i % 3]} />
          ))}
        </Art>
      </Layer>
    </>
  );
}

/* ---------- 2. Whisperwood Forest ---------- */
function Pine({ x, y, s = 1, c }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-6" y="-24" width="12" height="24" fill="#4A2F22" />
      <path d="M0 -150 L-40 -80 H40 Z M0 -120 L-52 -40 H52 Z M0 -86 L-64 -10 H64 Z" fill={c} />
    </g>
  );
}
export function ForestScene() {
  const row = (n, y, s, c, off = 0) => Array.from({ length: n }, (_, i) => <Pine key={i} x={off + i * (1440 / (n - 1))} y={y + ((i * 37) % 20)} s={s} c={c} />);
  return (
    <>
      <Layer d={-50}><Art h="85%" vb="0 0 1440 600">{row(14, 420, 1.1, '#2E8B6A', 20)}<rect y="420" width="1440" height="180" fill="#2E8B6A" /></Art></Layer>
      <Layer d={-25}><Art h="85%" vb="0 0 1440 600">{row(10, 500, 1.6, '#1D6B50', -60)}<rect y="500" width="1440" height="100" fill="#1D6B50" /></Art></Layer>
      <Layer d={0}>
        <Art h="85%" vb="0 0 1440 600">
          <Pine x={40} y={600} s={2.8} c="#0F4434" />
          <Pine x={1400} y={600} s={3} c="#0F4434" />
          <Pine x={200} y={600} s={2} c="#12513D" />
          <Pine x={1240} y={600} s={2.2} c="#12513D" />
          <path d="M0 560 Q360 530 720 555 T1440 545 V600 H0 Z" fill="#0B3327" />
          {/* Bushes with curious eyes */}
          {[[380, 560], [1050, 556], [640, 575]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="34" fill="#0F4434" /><circle cx="-30" cy="10" r="24" fill="#0F4434" /><circle cx="30" cy="10" r="24" fill="#0F4434" />
              <g className="animate-blink" style={{ animationDelay: `${i * 1.3}s` }}>
                <ellipse className="eye" cx="-9" cy="-4" rx="5" ry="7" fill="#FFF07A" />
                <ellipse className="eye" cx="9" cy="-4" rx="5" ry="7" fill="#FFF07A" />
              </g>
            </g>
          ))}
          {/* Mushrooms */}
          {[[520, 588, 1], [880, 584, 0.8], [300, 590, 0.7]].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <rect x="-6" y="-20" width="12" height="20" rx="4" fill="#FFF4CF" />
              <path d="M-24 -18 Q0 -48 24 -18 Z" fill="#FF5A4E" />
              <circle cx="-8" cy="-28" r="4" fill="#fff" /><circle cx="8" cy="-24" r="3" fill="#fff" />
            </g>
          ))}
        </Art>
      </Layer>
      {/* Fireflies */}
      <div className="absolute inset-0">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="absolute h-1.5 w-1.5 animate-twinkle rounded-full bg-[#FFF07A] shadow-[0_0_10px_3px_rgba(255,240,122,0.7)]"
            style={{ left: `${(i * 41) % 100}%`, top: `${30 + ((i * 29) % 65)}%`, animationDelay: `${(i % 6) * 0.5}s` }} />
        ))}
      </div>
    </>
  );
}

/* ---------- 3. Thunder Peak ---------- */
export function PeakScene() {
  return (
    <>
      <Layer d={-60}>
        <Art h="80%" vb="0 0 1440 600">
          <path d="M0 400 L180 220 L330 340 L520 140 L700 330 L880 180 L1060 320 L1250 160 L1440 300 V600 H0 Z" fill="#9B7BC8" />
        </Art>
      </Layer>
      <Layer d={-30}>
        <Art h="80%" vb="0 0 1440 600">
          <path d="M-20 600 L260 260 L420 420 L720 120 L980 420 L1180 280 L1460 600 Z" fill="#6A4C9C" />
          <path d="M720 120 L790 205 L760 195 L735 220 L705 190 L675 210 L650 205 Z" fill="#FFFFFF" />
          <path d="M260 260 L300 310 L280 305 L262 320 L240 300 L225 290 Z" fill="#FFFFFF" />
          <path d="M1180 280 L1215 325 L1195 320 L1178 333 L1160 318 L1150 312 Z" fill="#FFFFFF" />
          {/* Zig-zag trail up the peak */}
          <path d="M560 600 L860 520 L600 450 L800 380 L700 300 L740 230" stroke="#FFD93D" strokeWidth="4" strokeDasharray="10 12" fill="none" opacity="0.8" />
        </Art>
      </Layer>
      <Layer d={0}>
        <Art h="80%" vb="0 0 1440 600">
          <path d="M0 600 L0 470 L160 420 L300 500 L460 450 L620 530 L820 480 L1000 540 L1200 440 L1440 500 V600 Z" fill="#3E2D6B" />
          {[[180, 440], [1200, 460], [470, 470]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} l14 -8 l12 10 l-6 14 l-18 2 Z`} fill="#2A1F4D" />
          ))}
        </Art>
      </Layer>
      {/* Storm cloud + lightning */}
      <Layer d={-80} className="pointer-events-none">
        <div className="absolute left-[8%] top-[8%] h-20 w-64 rounded-full bg-[#4B3F72]/80 blur-[2px]" />
        <div className="absolute left-[14%] top-[3%] h-24 w-40 rounded-full bg-[#4B3F72]/80 blur-[2px]" />
        <div className="absolute right-[10%] top-[14%] h-16 w-56 rounded-full bg-[#4B3F72]/70 blur-[2px]" />
        {[['18%', '12%', 0], ['78%', '20%', 2.4], ['46%', '5%', 4.1]].map(([l, t, d], i) => (
          <svg key={i} viewBox="0 0 40 120" className="absolute h-40 w-14 animate-flash drop-shadow-[0_0_14px_#FFF07A]" style={{ left: l, top: t, animationDelay: `${d}s` }}>
            <path d="M22 0 L4 62 H18 L10 120 L36 46 H22 L30 0 Z" fill="#FFF07A" />
          </svg>
        ))}
      </Layer>
    </>
  );
}

/* ---------- 4. Crystal Sea ---------- */
function Waves({ y, c, dur, op = 1 }) {
  const seg = 'q90 -26 180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0 t180 0';
  return (
    <svg viewBox="0 0 2880 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-full w-[200%] animate-wave" style={{ animationDuration: dur, opacity: op }}>
      <path d={`M0 ${y} ${seg} ${seg} V200 H0 Z`} fill={c} />
    </svg>
  );
}
export function SeaScene() {
  return (
    <>
      <Layer d={-40}>
        <Art h="70%" vb="0 0 1440 500">
          {/* Island with lighthouse */}
          <path d="M980 330 Q1100 250 1240 330 Z" fill="#E7C27A" />
          <path d="M1040 300 Q1100 270 1180 300 L1200 330 H1020 Z" fill="#4BB35A" />
          <rect x="1140" y="200" width="26" height="110" fill="#FFF4CF" />
          <rect x="1140" y="230" width="26" height="14" fill="#FF5A4E" /><rect x="1140" y="270" width="26" height="14" fill="#FF5A4E" />
          <rect x="1134" y="186" width="38" height="18" rx="4" fill="#3E2D6B" />
          <circle cx="1153" cy="195" r="7" fill="#FFF07A" className="animate-glow" />
          <path d="M1153 195 L1360 160 L1360 230 Z" fill="#FFF07A" opacity="0.25" className="animate-glow" />
          {/* Palm */}
          <path d="M1060 305 Q1050 260 1068 230" stroke="#8A5A3B" strokeWidth="7" fill="none" />
          <path d="M1068 230 q-40 -6 -60 18 M1068 230 q40 -10 58 12 M1068 230 q-14 -30 -44 -34 M1068 230 q20 -30 50 -28" stroke="#3FA34D" strokeWidth="9" fill="none" strokeLinecap="round" />
          {/* Sun reflection */}
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={260 - i * 10} y={345 + i * 22} width={160 + i * 20} height="5" rx="2.5" fill="#FFD3A0" opacity={0.7 - i * 0.12} />)}
        </Art>
      </Layer>
      <div className="absolute inset-x-0 bottom-0 h-[52%] overflow-hidden">
        <Waves y={60} c="#5B6CD6" dur="16s" op={0.9} />
        <div className="absolute bottom-[38%] left-[18%] animate-bob">
          <svg viewBox="0 0 120 110" className="h-20 w-24 sm:h-24 sm:w-28">
            <rect x="56" y="4" width="4" height="80" fill="#7A4A2A" />
            <path d="M60 8 L60 76 L108 76 Z" fill="#FFF4CF" />
            <path d="M56 14 L56 70 L20 70 Z" fill="#FFD93D" />
            <path d="M8 84 H112 L96 106 H24 Z" fill="#C2410C" />
          </svg>
        </div>
        <Waves y={90} c="#3E4FB8" dur="11s" />
        <Waves y={120} c="#2A3690" dur="7s" />
      </div>
    </>
  );
}

/* ---------- 5. Starlight Road ---------- */
export function SkyScene() {
  return (
    <>
      <Layer d={-70}>
        <div className="absolute left-[6%] top-[18%] h-20 w-20 animate-float rounded-full bg-gradient-to-br from-[#8F9BFF] to-[#4C5BD4]">
          <span className="absolute left-1/2 top-1/2 h-5 w-36 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-4 border-ember/90" />
        </div>
        <div className="absolute left-[26%] top-[62%] h-10 w-10 animate-float rounded-full bg-gradient-to-br from-[#FF9AC6] to-[#C2417A] [animation-delay:1.5s]" />
        <span className="absolute left-[40%] top-[12%] animate-float text-3xl [animation-delay:.7s]">🛰️</span>
      </Layer>
      <Layer d={-20}>
        <Art h="40%" vb="0 0 1440 300">
          {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={i * 96} cy={210 + ((i * 31) % 40)} r={70 + ((i * 17) % 40)} fill="#4A4F9E" />)}
        </Art>
      </Layer>
      <Layer d={0}>
        <Art h="40%" vb="0 0 1440 300">
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={40 + i * 108} cy={270 + ((i * 23) % 30)} r={80 + ((i * 13) % 30)} fill="#6E73C4" />)}
        </Art>
      </Layer>
    </>
  );
}

/* ---------- 6. The Moon ---------- */
export function MoonScene() {
  return (
    <>
      <Layer d={-60}>
        {/* Home planet, far behind */}
        <div className="absolute left-[8%] top-[10%] h-24 w-24 overflow-hidden rounded-full bg-[#2F6FE0] shadow-[0_0_40px_rgba(80,140,255,0.6)] sm:h-32 sm:w-32">
          <span className="absolute left-3 top-4 h-10 w-12 rounded-[45%] bg-[#4BB35A]" />
          <span className="absolute bottom-3 right-2 h-12 w-10 rounded-[45%] bg-[#4BB35A]" />
          <span className="absolute left-6 top-14 h-3 w-16 rounded-full bg-white/70" />
        </div>
      </Layer>
      <Layer d={0}>
        <Art h="55%" vb="0 0 1440 400">
          <defs>
            <radialGradient id="moonSurf" cx="0.5" cy="0" r="1">
              <stop offset="0" stopColor="#FFF4CF" />
              <stop offset="0.5" stopColor="#E9D9A6" />
              <stop offset="1" stopColor="#B9A574" />
            </radialGradient>
          </defs>
          <ellipse cx="720" cy="560" rx="1100" ry="430" fill="url(#moonSurf)" />
          {[[260, 230, 50], [520, 290, 30], [880, 220, 40], [1160, 280, 60], [700, 350, 24], [380, 340, 22]].map(([x, y, rr], i) => (
            <g key={i}><ellipse cx={x} cy={y} rx={rr} ry={rr * 0.35} fill="#C9B47E" /><ellipse cx={x} cy={y - 3} rx={rr * 0.8} ry={rr * 0.25} fill="#B39E68" /></g>
          ))}
          {/* Landed rocket */}
          <g transform="translate(1040 200)">
            <path d="M0 -120 Q26 -80 26 -10 H-26 Q-26 -80 0 -120 Z" fill="#F4F6FF" />
            <circle cy="-60" r="11" fill="#6EC8FF" stroke="#3E2D6B" strokeWidth="4" />
            <path d="M-26 -30 L-46 6 H-26 Z M26 -30 L46 6 H26 Z" fill="#FF5A4E" />
            <rect x="-14" y="-10" width="28" height="12" fill="#3E2D6B" />
          </g>
          {/* Pokemoon flag */}
          <g transform="translate(330 250)">
            <rect x="0" y="-120" width="5" height="120" fill="#E8E8F0" />
            <path d="M5 -118 H95 V-62 H5 Z" fill="#FFD93D" />
            <path d="M44 -112 L28 -88 H40 L34 -68 L58 -96 H45 L52 -112 Z" fill="#070B24" />
          </g>
        </Art>
      </Layer>
    </>
  );
}
