'use client';
import { useState } from 'react';
import { CHAINS, chainByKey } from '@/config/chains';
import site from '@/config/site.json';
import { useWallet, SOL_WALLETS } from './WalletContext';

const host = site.domain.replace(/^https?:\/\//, '');
const EVM_INSTALL = [
  { name: 'MetaMask', url: 'https://metamask.io/download/', app: `https://metamask.app.link/dapp/${host}` },
  { name: 'Coinbase Wallet', url: 'https://www.coinbase.com/wallet/downloads', app: `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(site.domain)}` },
];

function Row({ icon, name, hint, onClick, href, disabled }) {
  const cls = 'flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-volt/60 hover:bg-volt/10 disabled:opacity-50';
  const body = (
    <>
      {icon ? <img src={icon} alt="" className="h-8 w-8 rounded-lg" /> : <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-volt/20 text-volt">⚡</span>}
      <span className="flex-1 font-semibold">{name}</span>
      {hint && <span className="text-xs text-white/50">{hint}</span>}
    </>
  );
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
    : <button onClick={onClick} disabled={disabled} className={cls}>{body}</button>;
}

export default function WalletModal() {
  const w = useWallet();
  const [chainKey, setChainKey] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  if (!w.modalOpen) return null;

  const close = () => { w.setModalOpen(false); setChainKey(null); setErr(''); setBusy(false); };
  const run = async (fn) => {
    setErr(''); setBusy(true);
    try { await fn(); close(); }
    catch (e) { setErr(e?.code === 4001 ? 'Request rejected in wallet.' : e?.message || 'Connection failed'); setBusy(false); }
  };
  const chain = chainKey && chainByKey(chainKey);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center" onClick={close}>
      <div className="w-full max-w-md rounded-3xl border border-volt/30 bg-space p-6 shadow-[0_0_60px_rgba(255,217,61,0.2)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">
            {chain ? <button onClick={() => setChainKey(null)} className="mr-2 text-volt">←</button> : null}
            {chain ? `Connect · ${chain.name}` : 'Choose network'}
          </h3>
          <button onClick={close} className="text-2xl text-white/60 hover:text-white" aria-label="Close">×</button>
        </div>

        {!chain && (
          <div className="mt-5 grid gap-3">
            {CHAINS.map((c) => (
              <button key={c.key} onClick={() => setChainKey(c.key)}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left font-semibold transition hover:border-volt/60 hover:bg-volt/10">
                <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: c.color, boxShadow: `0 0 10px ${c.color}` }} />
                {c.name}
              </button>
            ))}
          </div>
        )}

        {chain?.type === 'evm' && (
          <div className="mt-5 space-y-3">
            {w.evmWallets.map((x) => (
              <Row key={x.info.rdns} icon={x.info.icon} name={x.info.name} hint="Detected" disabled={busy}
                onClick={() => run(() => w.connectEvm(chain.key, x))} />
            ))}
            {!w.evmWallets.length && (
              <>
                <p className="text-sm text-white/60">No EVM wallet detected. Install one or open this site in your wallet app:</p>
                {EVM_INSTALL.map((x) => (
                  <div key={x.name} className="grid grid-cols-2 gap-2">
                    <Row name={x.name} hint="Install" href={x.url} />
                    <Row name="Open in app" hint="Mobile" href={x.app} />
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {chain?.type === 'solana' && (
          <div className="mt-5 space-y-3">
            {Object.entries(SOL_WALLETS).map(([id, x]) => {
              const detected = typeof window !== 'undefined' && !!x.get();
              return detected
                ? <Row key={id} name={x.name} hint="Detected" disabled={busy} onClick={() => run(() => w.connectSolana(id))} />
                : <Row key={id} name={x.name} hint="Install" href={x.install} />;
            })}
            <Row name="Open in Phantom app" hint="Mobile"
              href={`https://phantom.app/ul/browse/${encodeURIComponent(site.domain)}?ref=${encodeURIComponent(site.domain)}`} />
          </div>
        )}

        {err && <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-2 text-sm text-red-300">{err}</p>}

        <p className="mt-6 text-xs leading-relaxed text-white/45">
          🔒 Connecting only shares your public address. Pokemoon never asks for your private key or seed phrase and never sends transactions automatically.
        </p>
      </div>
    </div>
  );
}
