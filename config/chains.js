// Official network parameters. EVM chains share one contract address (site.json -> contracts.evm).
export const CHAINS = [
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
    color: '#F3BA2F',
    type: 'evm',
    chainId: 56,
    hexId: '0x38',
    currency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpc: 'https://bsc-dataseed.bnbchain.org',
    explorer: 'https://bscscan.com',
    tokenPath: '/token/',
  },
  {
    key: 'ethereum',
    name: 'Ethereum',
    short: 'ETH',
    color: '#8A92B2',
    type: 'evm',
    chainId: 1,
    hexId: '0x1',
    currency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpc: 'https://ethereum-rpc.publicnode.com',
    explorer: 'https://etherscan.io',
    tokenPath: '/token/',
  },
  {
    key: 'solana',
    name: 'Solana',
    short: 'SOL',
    color: '#14F195',
    type: 'solana',
    explorer: 'https://solscan.io',
    tokenPath: '/token/',
  },
];

export const EVM_CHAINS = CHAINS.filter((c) => c.type === 'evm');
export const chainByKey = (k) => CHAINS.find((c) => c.key === k);
export const chainByHex = (hex) =>
  EVM_CHAINS.find((c) => c.chainId === parseInt(hex, 16));
export const tokenUrl = (chain, ca) => (ca ? `${chain.explorer}${chain.tokenPath}${ca}` : null);
