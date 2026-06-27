import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RideHero from "@/components/ride/RideHero";
import HowItWorks from "@/components/ride/HowItWorks";
import RidePageTypes from "@/components/ride/RidePageTypes";
import RideSafety from "@/components/ride/RideSafety";
import RideCTA from "@/components/ride/RideCTA";

export default function RidePage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <Navbar />
      <RideHero />
      <HowItWorks />
      <RidePageTypes />
      <RideSafety />
      <RideCTA />
      <Footer />
    </main>
  );
}