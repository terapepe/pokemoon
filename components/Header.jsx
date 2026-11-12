'use client';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import ChainBadge from './ChainBadge';
import { useWallet } from './wallet/WalletContext';
import { EVM_CHAINS, chainByKey } from '@/config/chains';

const NAV = [['🏡 Village', '#village'], ['🌲 Legend', '#forest'], ['⛰️ Volty', '#peak'], ['🌊 Tokenomics', '#sea'], ['🚀 Quests', '#sky'], ['🌕 Moon', '#moon']];
const short = (a) => (a ? `${a.slice(0, 4)}…${a.slice(-4)}` : '');

function WalletButton() {
  const w = useWallet();
  const [open, setOpen] = useState(false);
  if (!w.connected) return <button onClick={() => w.setModalOpen(true)} className="btn-volt whitespace-nowrap px-4 py-2.5 text-sm sm:px-5"><span className="sm:hidden">CONNECT</span><span className="hidden sm:inline">CONNECT WALLET</span></button>;

  const chain = chainByKey(w.chainKey);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="btn border-2 border-volt/60 bg-navy/80 px-4 py-2 text-sm">
        {chain ? <ChainBadge chain={chain} /> : <span className="text-xs text-red-300">Wrong network</span>}
        <span className="font-mono">{short(w.address)}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-space p-3 shadow-2xl">
          <p className="px-2 text-xs text-white/50">{w.walletName} · {chain?.name || 'Unsupported network'}</p>
          <p className="break-all px-2 py-1 font-mono text-xs text-volt">{w.address}</p>
          {w.kind === 'evm' && (
            <div className="mt-2 border-t border-white/10 pt-2">
              <p className="px-2 pb-1 text-xs text-white/50">Switch network</p>
              {EVM_CHAINS.map((c) => (
                <button key={c.key} onClick={() => w.switchNetwork(c.key).catch(() => {})}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white/10 ${c.key === w.chainKey ? 'text-volt' : ''}`}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  {c.name} {c.key === w.chainKey && '✓'}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => { setOpen(false); w.disconnect(); }}
            className="mt-2 w-full rounded-xl bg-red-500/15 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/25">
            DISCONNECT
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'bg-navy/70 shadow-lg backdrop-blur-md' : 'bg-gradient-to-b from-navy/60 to-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-1 rounded-full border-2 border-white/20 bg-navy/60 p-1 backdrop-blur lg:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="rounded-full px-3 py-1.5 text-sm font-semibold text-white/85 transition hover:bg-volt/15 hover:text-volt">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <WalletButton />
          <button className="text-2xl lg:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        </div>
      </div>
      {menu && (
        <nav className="border-t border-white/10 bg-navy/95 px-5 py-3 lg:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className="block py-2 font-semibold text-white/80">{l}</a>)}
        </nav>
      )}
    </header>
  );
}
