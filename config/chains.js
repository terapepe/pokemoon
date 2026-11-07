// Official network parameters. Pokemoon runs on Robinhood Chain only (CA: site.json -> contracts.evm).
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
];

export const EVM_CHAINS = CHAINS.filter((c) => c.type === 'evm');
export const chainByKey = (k) => CHAINS.find((c) => c.key === k);
export const chainByHex = (hex) =>
  EVM_CHAINS.find((c) => c.chainId === parseInt(hex, 16));
export const tokenUrl = (chain, ca) => (ca ? `${chain.explorer}${chain.tokenPath}${ca}` : null);
