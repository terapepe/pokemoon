'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { chainByHex, chainByKey } from '@/config/chains';

const KEY = 'pokemoon_wallet'; // stores only public info: kind, wallet id, chain, address
const Ctx = createContext(null);
export const useWallet = () => useContext(Ctx);

const SOL_WALLETS = {
  phantom: { name: 'Phantom', get: () => window.phantom?.solana, install: 'https://phantom.app/download' },
  solflare: { name: 'Solflare', get: () => window.solflare, install: 'https://solflare.com/download' },
};
export { SOL_WALLETS };

async function switchEvmChain(provider, chain) {
  try {
    await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.hexId }] });
  } catch (e) {
    const code = e?.code ?? e?.data?.originalError?.code;
    if (code !== 4902) throw e;
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: chain.hexId,
        chainName: chain.name,
        nativeCurrency: chain.currency,
        rpcUrls: [chain.rpc],
        blockExplorerUrls: [chain.explorer],
      }],
    });
  }
}

export function WalletProvider({ children }) {
  const [evmWallets, setEvmWallets] = useState([]); // EIP-6963 discovered
  const [state, setState] = useState({ connected: false });
  const [modalOpen, setModalOpen] = useState(false);
  const active = useRef(null); // { provider, cleanup }

  const save = (s) => {
    setState(s);
    try { s.connected ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch {}
  };

  const detach = () => { active.current?.cleanup?.(); active.current = null; };

  const disconnect = useCallback(async () => {
    const p = active.current?.provider;
    if (state.kind === 'solana') { try { await p?.disconnect?.(); } catch {} }
    if (state.kind === 'evm') {
      try { await p?.request?.({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] }); } catch {}
    }
    detach();
    save({ connected: false });
  }, [state.kind]);

  const attachEvm = (provider, base) => {
    const onAcc = (accs) => (accs?.length ? save({ ...base, address: accs[0] }) : (detach(), save({ connected: false })));
    const onChain = (hex) => { base = { ...base, chainKey: chainByHex(hex)?.key || 'unsupported' }; save({ ...base, address: base.address }); };
    provider.on?.('accountsChanged', onAcc);
    provider.on?.('chainChanged', onChain);
    active.current = { provider, cleanup: () => { provider.removeListener?.('accountsChanged', onAcc); provider.removeListener?.('chainChanged', onChain); } };
  };

  const connectEvm = async (chainKey, wallet) => {
    const chain = chainByKey(chainKey);
    const p = wallet.provider;
    const accs = await p.request({ method: 'eth_requestAccounts' });
    await switchEvmChain(p, chain);
    detach();
    const s = { connected: true, kind: 'evm', walletId: wallet.info.rdns, walletName: wallet.info.name, chainKey, address: accs[0] };
    attachEvm(p, s);
    save(s);
  };

  const switchNetwork = async (chainKey) => {
    const p = active.current?.provider;
    if (!p || state.kind !== 'evm') return;
    await switchEvmChain(p, chainByKey(chainKey));
    save({ ...state, chainKey });
  };

  const connectSolana = async (id, opts) => {
    const p = SOL_WALLETS[id].get();
    if (!p) throw new Error(`${SOL_WALLETS[id].name} not detected`);
    await p.connect(opts);
    const address = p.publicKey?.toString();
    if (!address) throw new Error('No public key returned');
    detach();
    const s = { connected: true, kind: 'solana', walletId: id, walletName: SOL_WALLETS[id].name, chainKey: 'solana', address };
    const onDisc = () => { detach(); save({ connected: false }); };
    const onAcc = (pk) => (pk ? save({ ...s, address: pk.toString() }) : onDisc());
    p.on?.('disconnect', onDisc);
    p.on?.('accountChanged', onAcc);
    active.current = { provider: p, cleanup: () => { p.off?.('disconnect', onDisc); p.off?.('accountChanged', onAcc); p.removeListener?.('disconnect', onDisc); p.removeListener?.('accountChanged', onAcc); } };
    save(s);
  };

  // EIP-6963 wallet discovery
  useEffect(() => {
    const found = new Map();
    const onAnnounce = (e) => {
      const { info, provider } = e.detail || {};
      if (!info?.rdns || found.has(info.rdns)) return;
      found.set(info.rdns, { info, provider });
      setEvmWallets([...found.values()]);
    };
    window.addEventListener('eip6963:announceProvider', onAnnounce);
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    const t = setTimeout(() => {
      if (!found.size && window.ethereum) {
        found.set('injected', { info: { rdns: 'injected', name: 'Browser Wallet', icon: '' }, provider: window.ethereum });
        setEvmWallets([...found.values()]);
      }
    }, 400);
    return () => { window.removeEventListener('eip6963:announceProvider', onAnnounce); clearTimeout(t); };
  }, []);

  // Silent session restore (no popups)
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    let saved;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch {}
    if (!saved?.connected) { restored.current = true; return; }
    if (saved.kind === 'solana') {
      restored.current = true;
      connectSolana(saved.walletId, { onlyIfTrusted: true }).catch(() => save({ connected: false }));
      return;
    }
    const w = evmWallets.find((x) => x.info.rdns === saved.walletId);
    if (!w) return; // wait for discovery
    restored.current = true;
    w.provider.request({ method: 'eth_accounts' }).then(async (accs) => {
      if (!accs?.length) return save({ connected: false });
      const hex = await w.provider.request({ method: 'eth_chainId' });
      const s = { ...saved, address: accs[0], chainKey: chainByHex(hex)?.key || 'unsupported' };
      attachEvm(w.provider, s);
      save(s);
    }).catch(() => save({ connected: false }));
  }, [evmWallets]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Ctx.Provider value={{ ...state, evmWallets, connectEvm, connectSolana, switchNetwork, disconnect, modalOpen, setModalOpen }}>
      {children}
    </Ctx.Provider>
  );
}
