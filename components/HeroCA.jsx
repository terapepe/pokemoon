'use client';
import { useState } from 'react';
import { CA_GROUPS, tokenUrl } from '@/config/chains';
import ChainBadge from './ChainBadge';

function CopyCA({ group }) {
  const [done, setDone] = useState(false);
  const { ca, chains } = group;
  const accent = chains.length === 1 ? chains[0].color : '#FFD93D';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ca);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  };
  return (
    <div className="rounded-2xl border-2 bg-navy/70 p-4" style={{ borderColor: `${accent}99`, boxShadow: `0 0 30px ${accent}40` }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>CA</span>
          {chains.map((c) => <ChainBadge key={c.key} chain={c} />)}
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          {chains.map((c) => tokenUrl(c, ca) && (
            <a key={c.key} href={tokenUrl(c, ca)} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-volt">
              {chains.length > 1 ? `${c.short} ↗` : 'Explorer ↗'}
            </a>
          ))}
        </div>
      </div>
      <button onClick={copy} disabled={!ca} title="Copy contract address"
        className="mt-2 flex w-full items-center gap-3 rounded-xl bg-black/30 px-4 py-3 text-left transition hover:bg-white/5 disabled:cursor-not-allowed">
        <code className="flex-1 break-all font-mono text-sm font-bold sm:text-base" style={{ color: accent }}>{ca || 'To be announced'}</code>
        <span className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-navy" style={{ background: accent }}>
          {done ? '✓ COPIED' : `COPY ${chains.map((c) => c.short).join('/')} CA`}
        </span>
      </button>
    </div>
  );
}

export default function HeroCA() {
  return (
    <div className="mx-auto mt-8 grid max-w-xl gap-3 lg:mx-0">
      {CA_GROUPS.map((g) => <CopyCA key={g.id} group={g} />)}
    </div>
  );
}
