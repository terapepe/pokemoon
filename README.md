# POKEMOON ($POKEMOON) — pokemoon.shop

Next.js 14 (static export) + Tailwind CSS. No backend.

## Edit project info
All editable data lives in **`config/site.json`** (edit directly on GitHub):

| Field | Meaning |
|---|---|
| `contracts.evm` | One CA shared by **Robinhood Chain, Base, BSC, Ethereum** |
| `contracts.solana` | Solana mint address |
| `totalSupply`, `blockchain` | Tokenomics cards |
| `buyUrl` | Link for the BUY button (empty → scrolls to Tokenomics) |
| `social.x`, `social.telegram` | Community links (empty → "Coming soon") |

When a CA is filled in, the COPY button and explorer links turn on automatically:
Robinhood → robinhoodchain.blockscout.com · Base → basescan.org · BSC → bscscan.com · ETH → etherscan.io · Solana → solscan.io

Network params (chain IDs, RPC, explorers) are in `config/chains.js`.

## Wallet
- EVM: any injected wallet via EIP-6963 (MetaMask, Coinbase Wallet, Rabby, OKX…), auto add/switch network.
- Solana: Phantom, Solflare.
- Session stored in localStorage (public address only). Disconnect anytime.

## Run / build
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out → upload contents to public_html
```
