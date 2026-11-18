import site from '@/config/site.json';

/* hybot sync: CA, token name, symbol, X and Telegram follow the newest token hybot launched for this site
   (https://hybot.xyz/api/site-token?site=<domain>; config/site.json = fallback). Empty X / Telegram on the
   launched token → the link shows "Coming soon". */
const API = import.meta.env.VITE_TOKEN_API || 'https://hybot.xyz/api/site-token';

export async function syncToken() {
  const host = location.hostname.replace(/^www\./, '');
  const site_ = /\./.test(host) && !/(^|\.)(vercel\.app|localhost|127\.0\.0\.1)$/.test(host) ? host : new URL(site.domain).hostname;
  let d = null;
  try {
    d = await (await fetch(`${API}?site=${encodeURIComponent(site_)}`, { signal: AbortSignal.timeout(2500) })).json();
  } catch { return; }
  if (!d?.found || !/^0x[0-9a-fA-F]{40}$/.test(d.ca || '')) return;
  site.contracts.evm = d.ca;
  // network from hybot (Pons launches → single on robinhood)
  site.mode = d.mode || 'single';
  site.singleChain = d.singleNetwork || 'robinhood';
  site.primaryNetwork = d.primaryNetwork || site.singleChain;
  const net = site.singleChain;
  if (site.chains?.[net]) site.chains[net].ca = '';
  if (d.name) site.name = d.name;
  if (d.symbol) site.symbol = '$' + d.symbol;
  site.social.x = d.x || '';
  site.social.telegram = d.telegram || '';
}
