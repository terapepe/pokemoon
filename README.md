# POKEMOON ($POKE) — pokemoon.shop

Next.js 14 (static export) + Tailwind CSS. No backend.

## Edit project info
All editable data lives in **`config/site.json`** (edit directly on GitHub):

| Field | Meaning |
|---|---|
| `mode` | `"single"` = only `singleChain` (Robinhood) · `"multi"` = Robinhood + Solana + Base + BSC |
| `contracts.evm` | Contract address on **Robinhood Chain** |
| `contracts.sol` / `base` / `bsc` | CA on the extra chains (multi mode) |
| `totalSupply`, `blockchain` | Tokenomics cards |
| `buyUrl` | Link for the BUY button (empty → scrolls to Tokenomics) |
| `social.x`, `social.telegram` | Community links (empty → "Coming soon") |

When a CA is filled in, the COPY button and explorer links turn on automatically:
Robinhood → robinhoodchain.blockscout.com

Network params (chain IDs, RPC, explorers) are in `config/chains.js`.

## Wallet
- EVM: any injected wallet via EIP-6963 (MetaMask, Coinbase Wallet, Rabby, OKX…), auto add/switch network.
- Session stored in localStorage (public address only). Disconnect anytime.

## Run / build
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out → upload contents to public_html
```
