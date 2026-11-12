# POKEMOON ($POKE) — pokemoon.shop

Next.js 14 (static export) + Tailwind CSS. No backend.

## Edit project info
All editable data lives in **`config/site.json`** (edit directly on GitHub):

| Field | Meaning |
|---|---|
| `mode` | `"single"` = only `singleChain` · `"multi"` = always all 4 chains (Solana, Robinhood, Base, BSC) |
| `singleChain` | `robinhood` \| `solana` \| `base` \| `bsc` — chain shown in single mode (accent color, badge, tagline follow it) |
| `multiOrder` | Display order of chains in multi mode |
| `contracts.evm` | CA shared by all EVM chains (Robinhood, Base, BSC) |
| `contracts.sol` | Solana mint |
| `chains.<key>` | Per-chain overrides: `name`, `short`, `color`, `tagline`, `ca` (empty `ca` → uses `contracts.evm` / `contracts.sol`) |
| `totalSupply` | Tokenomics card |
| `social.x`, `social.telegram` | Community links (empty → "Coming soon") |
| `quests[]` | Quest Log on Starlight Road: `zone` (village/forest/peak/sea/sky/moon → icon), `title`, `text`, `done` (true = ✓ Cleared) |

Chains with the same CA are grouped into one COPY CA block (multi: RH/BASE/BSC share one block, SOL has its own).
When a CA is filled in, COPY and explorer links turn on automatically.

Network params (chain IDs, RPC, explorers) are in `config/chains.js`.

## Adventure world
The page is one scrolling journey: Sparkle Village → Whisperwood Forest → Thunder Peak → Crystal Sea → Starlight Road → The Moon.
- Zone names/sky colors: `components/world/zones.js`
- Landscapes (SVG, parallax): `components/world/Scenes.jsx`
- Zone content: `components/world/Zones.jsx`
- Scroll engine, sky, HUD (zone toast, map, progress): `components/world/Journey.jsx`
- Walking trainer + Volty: `components/world/Traveler.jsx`

## Wallet
- EVM: any injected wallet via EIP-6963 (MetaMask, Coinbase Wallet, Rabby, OKX…), auto add/switch network.
- Session stored in localStorage (public address only). Disconnect anytime.

## Run / build
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out → upload contents to public_html
```
