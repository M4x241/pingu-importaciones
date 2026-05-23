import HeroSection from '../components/HeroSection';
import TrustSection from '../components/TrustSection';
import GroupsSection from '../components/GroupsSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';

export default function HomePage() {
  return (
    <div className="font-sans antialiased">
      <main>
        <HeroSection />
        <TrustSection />
        <GroupsSection />
        <StatsSection />
        <CTASection />
      </main>
    </div>
  );
}
