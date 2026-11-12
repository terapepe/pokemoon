'use client';
import { useState } from 'react';
import site from '@/config/site.json';
import { CA_GROUPS, CHAINS, CHAIN_LABEL, IS_SINGLE, tokenUrl } from '@/config/chains';
import ChainBadge from './ChainBadge';

function CopyButton({ value, label }) {
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
      {done ? '✓ COPIED' : `COPY ${label} CA`}
    </button>
  );
}

function ContractRow({ title, ca, chains }) {
  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-2 font-display text-xl font-semibold">{title}</h3>
        {chains.map((c) => <ChainBadge key={c.key} chain={c} />)}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <code className="flex-1 break-all rounded-xl bg-navy/70 px-4 py-3 text-sm text-volt">
          {ca || 'To be announced'}
        </code>
        <CopyButton value={ca} label={chains.map((c) => c.short).join('/')} />
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
  const info = [
    ['🪙', 'Token Name', site.name],
    ['💎', 'Symbol', site.symbol],
    ['🧰', 'Total Supply', site.totalSupply],
    ['🗺️', CHAINS.length > 1 ? 'Blockchains' : 'Blockchain', CHAIN_LABEL],
  ];
  return (
    <div id="tokenomics">
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {info.map(([icon, k, v]) => (
          <div key={k} className="panel p-5 text-center transition hover:-translate-y-1 hover:border-volt/60">
            <div className="text-3xl">{icon}</div>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/50">{k}</p>
            <p className="mt-1 font-display text-lg font-semibold text-volt">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {CA_GROUPS.map((g) => (
          <ContractRow key={g.id} ca={g.ca} chains={g.chains}
            title={IS_SINGLE ? 'Contract Address' : g.chains.length > 1 ? 'EVM Contract Address' : `${g.chains[0].name} CA`} />
        ))}
      </div>
    </div>
  );
}
