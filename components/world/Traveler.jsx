// The player: a young trainer + Volty (back view), walking toward the Moon. Vehicle changes per zone.
const LINES = {
  village: "Let's go, trainer! ⚡",
  forest: 'Shh… wild creatures nearby 👀',
  peak: 'Feel that static? Bzzt!',
  sea: 'All aboard! ⛵',
  sky: '3… 2… 1… liftoff! 🚀',
  moon: 'We made it! 🌕',
};

export default function Traveler({ zone }) {
  const boat = zone === 'sea';
  const fly = zone === 'sky';
  const landed = zone === 'moon';
  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden w-36 md:block" aria-hidden="true">
      <div key={zone} className="mb-1 ml-16 w-max max-w-[13rem] animate-float rounded-2xl rounded-bl-none bg-white px-3 py-1.5 text-xs font-bold text-navy shadow-lg">
        {LINES[zone]}
      </div>
      <div className={boat ? 'animate-bob' : fly ? 'animate-float [animation-duration:1.6s]' : ''}>
        <svg viewBox="240 418 200 190" className="w-full overflow-visible">
          {fly && (
            <g className="animate-glow">
              <path d="M280 572 L292 610 L304 572 Z" fill="#FF8A1F" />
              <path d="M286 572 L292 596 L298 572 Z" fill="#FFF07A" />
              <path d="M360 572 L372 614 L384 572 Z" fill="#FF8A1F" />
              <path d="M366 572 L372 600 L378 572 Z" fill="#FFF07A" />
            </g>
          )}
          {landed && (
            <g>
              <rect x="420" y="470" width="4" height="110" fill="#E8E8F0" />
              <path d="M424 472 L470 486 L424 502 Z" fill="#FFD93D" />
              <path d="M444 478 L438 488 H443 L440 496 L449 485 H444 Z" fill="#070B24" />
            </g>
          )}
          {boat && (
            <g>
              <rect x="408" y="430" width="5" height="130" fill="#7A4A2A" />
              <path d="M413 436 L413 548 L470 548 Z" fill="#FFF4CF" opacity="0.95" />
            </g>
          )}
          <g className="traveler-body">
            {/* Boy */}
            <rect className="leg leg-a" x="276" y="535" width="12" height="38" rx="5" fill="#1E2A5A" />
            <rect className="leg leg-b" x="294" y="530" width="12" height="38" rx="5" fill="#1E2A5A" />
            <rect x="258" y="488" width="11" height="42" rx="5.5" fill="#3B82F6" transform="rotate(8 263 488)" />
            <path d="M312 494 Q330 506 342 524" stroke="#3B82F6" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="343" cy="526" r="6" fill="#F2C29B" />
            <rect x="266" y="478" width="50" height="62" rx="17" fill="#3B82F6" />
            <rect x="276" y="487" width="30" height="38" rx="9" fill="#FFD93D" stroke="#FF8A1F" strokeWidth="3" />
            <path d="M293 494 L284 508 H291 L288 519 L299 504 H292 Z" fill="#FF8A1F" />
            <circle cx="267" cy="460" r="5" fill="#F2C29B" />
            <circle cx="315" cy="460" r="5" fill="#F2C29B" />
            <circle cx="291" cy="457" r="24" fill="#2B1D14" />
            <path d="M268 450 Q291 424 314 450 Z" fill="#FF5A4E" />
            <rect x="266" y="447" width="50" height="6" rx="3" fill="#E04338" />
            {/* Volty */}
            <ellipse className="leg leg-b" cx="358" cy="573" rx="10" ry="6" fill="#E06F0A" />
            <ellipse className="leg leg-a" cx="384" cy="573" rx="10" ry="6" fill="#E06F0A" />
            <circle cx="398" cy="548" r="9" fill="#FFE27A" />
            <ellipse cx="371" cy="540" rx="29" ry="31" fill="#FF8A1F" />
            <rect x="343" y="536" width="56" height="7" rx="3.5" fill="#FFD93D" />
            <rect x="356" y="512" width="30" height="24" rx="8" fill="#E06F0A" />
            <circle cx="347" cy="474" r="11" fill="#FFD93D" />
            <circle cx="395" cy="474" r="11" fill="#FFD93D" />
            <circle cx="371" cy="498" r="31" fill="#FFD93D" />
            <path d="M371 468 Q373 455 381 448" stroke="#FFD93D" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M383 430 L374 446 H381 L377 458 L390 441 H383 L387 430 Z" fill="#FFF07A" stroke="#FF8A1F" strokeWidth="1.5" />
            <circle cx="371" cy="494" r="45" fill="#BFE3FF" fillOpacity="0.12" stroke="#DDF0FF" strokeOpacity="0.8" strokeWidth="2.5" />
          </g>
          {boat && (
            <g>
              <path d="M240 560 H440 L414 600 H266 Z" fill="#C2410C" />
              <rect x="240" y="556" width="200" height="8" rx="4" fill="#FFD93D" />
              <path d="M220 600 Q260 588 300 600 T380 600 T460 600" stroke="#BFE3FF" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
