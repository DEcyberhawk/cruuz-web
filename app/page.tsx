import { BookingWidget } from "@/components/BookingWidget";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PlatformSection } from "@/components/PlatformSection";
import { SafetySection } from "@/components/SafetySection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070611] text-white">
      <Navbar />
      <Hero />
      <BookingWidget />
      <FeatureGrid />
      <PlatformSection />
      <SafetySection />
      <Footer />
    </main>
  );
}