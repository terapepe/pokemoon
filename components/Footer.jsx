import { LogoMark } from './Logo';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10 text-center">
      <LogoMark className="mx-auto h-12 w-12" />
      <p className="mt-3 font-display text-lg font-semibold">POKEMOON © 2026</p>
      <p className="text-volt">Catch the Moon. Go Pokemoon! ⚡</p>
      <p className="mx-auto mt-4 max-w-xl px-5 text-xs text-white/40">
        Meme coin for entertainment. Not financial advice. We will never ask for your private key or seed phrase.
      </p>
    </footer>
  );
}
