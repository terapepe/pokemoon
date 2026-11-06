export default function ChainBadge({ chain, size = 'sm' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white/5 font-semibold ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: chain.color, boxShadow: `0 0 8px ${chain.color}` }} />
      {chain.short}
    </span>
  );
}
