'use client';
import { useState } from 'react';
import { CHAINS, caOf, tokenUrl } from '@/config/chains';

export default function HeroCA() {
  const [done, setDone] = useState(false);
  const [key, setKey] = useState(CHAINS[0].key);
  const chain = CHAINS.find((c) => c.key === key) || CHAINS[0];
  const ca = caOf(chain);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ca);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  };
  return (
    <div className="mx-auto mt-8 max-w-xl rounded-2xl border-2 border-volt/60 bg-navy/70 p-4 shadow-[0_0_30px_rgba(255,217,61,0.25)] lg:mx-0">
      {CHAINS.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {CHAINS.map((c) => (
            <button key={c.key} onClick={() => setKey(c.key)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition ${c.key === chain.key ? 'border-volt bg-volt/15 text-volt' : 'border-white/15 text-white/70 hover:border-white/40'}`}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
              {c.short}
            </button>
          ))}
        </div>
      )}
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
