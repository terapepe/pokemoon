import './globals.css';
import site from '@/config/site.json';

export const metadata = {
  metadataBase: new URL(site.domain),
  title: `POKEMOON (${site.symbol}) — Catch the Moon`,
  description:
    'Pokemoon is a community-driven meme coin on Robinhood Chain. Catch the Moon. Go Pokemoon!',
  keywords: ['Pokemoon', 'POKEMOON', 'meme coin', 'Robinhood Chain', 'crypto'],
  openGraph: {
    title: `POKEMOON (${site.symbol})`,
    description: site.slogan,
    url: site.domain,
    siteName: 'Pokemoon',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', site: '@Pokemoon_Shop', title: 'POKEMOON', description: site.slogan },
};

export const viewport = { themeColor: '#070B24' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
