// Network parameters. Which ones are shown is set in site.json:
//   "mode": "single" → only "singleChain" (Robinhood) · "mode": "multi" → all chains below
// Contract addresses: site.json -> contracts.evm (shared by all EVM chains) / contracts.sol (Solana).
import site from './site.json';

export const ALL_CHAINS = [
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

export const IS_SINGLE = site.mode !== 'multi' && ALL_CHAINS.some((c) => c.key === (site.singleChain || 'robinhood'));
export const CHAINS = IS_SINGLE ? ALL_CHAINS.filter((c) => c.key === (site.singleChain || 'robinhood')) : ALL_CHAINS;
export const EVM_CHAINS = CHAINS.filter((c) => c.type === 'evm');
export const chainByKey = (k) => CHAINS.find((c) => c.key === k);
export const chainByHex = (hex) =>
  EVM_CHAINS.find((c) => c.chainId === parseInt(hex, 16));
export const tokenUrl = (chain, ca) => (ca ? `${chain.explorer}${chain.tokenPath}${ca}` : null);

// One CA for every EVM chain (contracts.evm), Solana uses contracts.sol
const C = site.contracts || {};
export const caOf = (chain) => ((chain.type === 'solana' ? C.sol : C.evm) || '').trim();

// "Robinhood Chain" (single) · "Robinhood Chain, Solana, Base & BNB Smart Chain" (multi)
export const CHAIN_LABEL = CHAINS.map((c) => c.name).join(', ').replace(/, ([^,]*)$/, ' & $1');
