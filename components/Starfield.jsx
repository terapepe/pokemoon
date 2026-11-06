// Deterministic star positions (no hydration mismatch).
function rand(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}
const r = rand(42);
const STARS = Array.from({ length: 90 }, () => ({
  x: r() * 100,
  y: r() * 100,
  s: r() * 2 + 0.6,
  d: r() * 4,
}));

export default function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {STARS.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDelay: `${st.d}s` }}
        />
      ))}
      <span className="absolute text-2xl animate-rocket" style={{ left: 0, top: '70%' }}>🚀</span>
    </div>
  );
}
