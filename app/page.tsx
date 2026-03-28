import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import HowItWorks from "@/components/marketing/HowItWorks";
import PricingTeaser from "@/components/marketing/PricingTeaser";
import Philosophy from "@/components/marketing/Philosophy";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <PricingTeaser />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
}
