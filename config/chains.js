// Network parameters (chain IDs, RPC, explorers). Everything editable lives in site.json:
//   "mode": "single" → only "singleChain" (robinhood | solana | base | bsc)
//   "mode": "multi"  → always all 4 chains, ordered by "multiOrder"
//   "chains.<key>"   → name / short / color / tagline / ca (ca empty → contracts.evm or contracts.sol)
import site from './site.json';

const BASE_CHAINS = [
  {
    key: 'robinhood',
    name: 'Robinhood Chain',
    short: 'RH',
    color: '#CCFF00',
    type: 'evm',
    chainId: 4663,
    hexId: '0x1237',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://robinhoodchain.blockscout.com',
    tokenPath: '/token/',
  },
  {
    key: 'solana',
    name: 'Solana',
    short: 'SOL',
    color: '#9945FF',
    type: 'solana',
    explorer: 'https://solscan.io',
    tokenPath: '/token/',
  },
  {
    key: 'base',
    name: 'Base',
    short: 'BASE',
    color: '#0052FF',
    type: 'evm',
    chainId: 8453,
    hexId: '0x2105',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    tokenPath: '/token/',
  },
  {
    key: 'bsc',
    name: 'BNB Smart Chain',
    short: 'BSC',
    color: '#F0B90B',
    type: 'evm',
    chainId: 56,
    hexId: '0x38',
    currency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpc: 'https://bsc-dataseed.bnbchain.org',
    explorer: 'https://bscscan.com',
    tokenPath: '/token/',
  },
];

// Merge per-chain overrides from site.json (empty values are ignored)
const OV = site.chains || {};
const clean = (o) => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v !== '' && v != null));
export const ALL_CHAINS = BASE_CHAINS.map((c) => ({ ...c, ...clean(OV[c.key]) }));

const single = ALL_CHAINS.find((c) => c.key === site.singleChain) || ALL_CHAINS[0];
const order = [...(site.multiOrder || []), ...ALL_CHAINS.map((c) => c.key)];
const MULTI = [...new Set(order)].map((k) => ALL_CHAINS.find((c) => c.key === k)).filter(Boolean);

export const IS_SINGLE = site.mode !== 'multi';
export const CHAINS = IS_SINGLE ? [single] : MULTI; // multi = always all 4
export const PRIMARY = CHAINS[0]; // drives the accent color
export const EVM_CHAINS = CHAINS.filter((c) => c.type === 'evm');
export const chainByKey = (k) => CHAINS.find((c) => c.key === k);
export const chainByHex = (hex) => EVM_CHAINS.find((c) => c.chainId === parseInt(hex, 16));
export const tokenUrl = (chain, ca) => (ca ? `${chain.explorer}${chain.tokenPath}${ca}` : null);

// CA: chains.<key>.ca → else contracts.evm (all EVM chains share it) / contracts.sol
const C = site.contracts || {};
export const caOf = (chain) => (chain.ca || (chain.type === 'solana' ? C.sol : C.evm) || '').trim();

// Chains sharing the same CA are grouped (multi: RH + Base + BSC → one EVM CA)
export const CA_GROUPS = CHAINS.reduce((acc, c) => {
  const ca = caOf(c);
  const id = ca ? ca.toLowerCase() : c.key;
  const g = acc.find((x) => x.id === id);
  g ? g.chains.push(c) : acc.push({ id, ca, chains: [c] });
  return acc;
}, []);

// "Robinhood Chain" (single) · "Solana, Robinhood Chain, Base & BNB Smart Chain" (multi)
export const CHAIN_LABEL = CHAINS.map((c) => c.name).join(', ').replace(/, ([^,]*)$/, ' & $1');
