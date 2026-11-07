'use client';
import { useState } from 'react';
import { CHAINS, tokenUrl } from '@/config/chains';

export default function HeroCA({ ca }) {
  const [done, setDone] = useState(false);
  const chain = CHAINS[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ca);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  };
  return (
    <div className="mx-auto mt-8 max-w-xl rounded-2xl border-2 border-volt/60 bg-navy/70 p-4 shadow-[0_0_30px_rgba(255,217,61,0.25)] lg:mx-0">
      <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest">
        <span className="text-volt">CA · {chain.name}</span>
        {tokenUrl(chain, ca) && (
          <a href={tokenUrl(chain, ca)} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-volt">Explorer ↗</a>
        )}
      </div>
      <button onClick={copy} disabled={!ca} title="Copy contract address"
        className="mt-2 flex w-full items-center gap-3 rounded-xl bg-black/30 px-4 py-3 text-left transition hover:bg-volt/10">
        <code className="flex-1 break-all font-mono text-sm font-bold text-volt sm:text-base">{ca || 'To be announced'}</code>
        <span className="shrink-0 rounded-lg bg-volt px-3 py-1.5 text-xs font-bold text-navy">{done ? '✓ COPIED' : 'COPY'}</span>
      </button>
    </div>
  );
}
