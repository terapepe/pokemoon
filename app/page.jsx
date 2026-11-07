import { WalletProvider } from '@/components/wallet/WalletContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Character from '@/components/Character';
import Tokenomics from '@/components/Tokenomics';
import Community from '@/components/Community';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import WalletModal from '@/components/wallet/WalletModal';

export default function Home() {
  return (
    <WalletProvider>
      <Starfield />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Tokenomics />
        <About />
        <Character />
        <Community />
      </main>
      <Footer />
      <WalletModal />
    </WalletProvider>
  );
}
