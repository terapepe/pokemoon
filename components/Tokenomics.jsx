'use client';
import { useState } from 'react';
import site from '@/config/site.json';
import { CHAINS, tokenUrl } from '@/config/chains';
import ChainBadge from './ChainBadge';

function CopyButton({ value }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {}
  };
  return (
    <button onClick={copy} disabled={!value} className="btn-volt shrink-0 px-5 py-2.5 text-sm">
      {done ? '✓ COPIED' : 'COPY CONTRACT ADDRESS'}
    </button>
  );
}

function ContractRow({ title, ca, chains }) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-2 font-display text-xl font-semibold">{title}</h3>
        {chains.map((c) => <ChainBadge key={c.key} chain={c} />)}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <code className="flex-1 break-all rounded-xl bg-navy/70 px-4 py-3 text-sm text-volt">
          {ca || 'To be announced'}
        </code>
        <CopyButton value={ca} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chains.map((c) => {
          const url = tokenUrl(c, ca);
          return url ? (
            <a key={c.key} href={url} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm transition hover:border-volt hover:text-volt">
              View on {c.name} explorer ↗
            </a>
          ) : (
            <span key={c.key} className="cursor-not-allowed rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/35">
              {c.name} explorer · soon
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Tokenomics() {
  const evm = CHAINS.filter((c) => c.type === 'evm');
  const sol = CHAINS.filter((c) => c.type === 'solana');
  const info = [
    ['Token Name', site.name],
    ['Symbol', site.symbol],
    ['Total Supply', site.totalSupply],
    ['Blockchain', site.blockchain],
  ];
  return (
    <section id="tokenomics" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="section-title text-center">
        <span className="text-volt text-glow">Tokenomics</span>
      </h2>
      <p className="mt-3 text-center text-white/60">Simple. Transparent. Moon-bound.</p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {info.map(([k, v]) => (
          <div key={k} className="card p-6 text-center transition hover:-translate-y-1 hover:border-volt/50">
            <p className="text-sm uppercase tracking-widest text-white/50">{k}</p>
            <p className="mt-2 font-display text-xl font-semibold text-volt">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5">
        <ContractRow title="EVM Contract" ca={site.contracts.evm} chains={evm} />
        <ContractRow title="Solana Contract" ca={site.contracts.solana} chains={sol} />
      </div>
    </section>
  );
}
