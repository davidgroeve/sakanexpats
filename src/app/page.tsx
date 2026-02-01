import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PropertyListings from '@/components/PropertyListings';
import MortgageCalculator from '@/components/MortgageCalculator';
import InsuranceSection from '@/components/InsuranceSection';
import UserDashboard from '@/components/UserDashboard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PropertyListings />
        <MortgageCalculator />
        <InsuranceSection />
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
}
