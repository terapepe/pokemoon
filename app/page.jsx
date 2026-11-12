import { WalletProvider } from '@/components/wallet/WalletContext';
import Header from '@/components/Header';
import WalletModal from '@/components/wallet/WalletModal';
import { JourneyProvider, Sky, HUD } from '@/components/world/Journey';
import { Village, Forest, Peak, Sea, SkyRoad, Moon } from '@/components/world/Zones';

export default function Home() {
  return (
    <WalletProvider>
      <JourneyProvider>
        <Sky />
        <Header />
        <main className="relative z-10">
          <Village />
          <Forest />
          <Peak />
          <Sea />
          <SkyRoad />
          <Moon />
        </main>
        <HUD />
      </JourneyProvider>
      <WalletModal />
    </WalletProvider>
  );
}
