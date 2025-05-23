
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoriesGrid from '@/components/CategoriesGrid';
import WholesaleBanner from '@/components/WholesaleBanner';
import SubscriptionTeaser from '@/components/SubscriptionTeaser';
import ContactStrip from '@/components/ContactStrip';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroBanner />
        <CategoriesGrid />
        <WholesaleBanner />
        <SubscriptionTeaser />
        <ContactStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
