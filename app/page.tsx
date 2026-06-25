import { DownloadSection } from "@/components/DownloadSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PlatformSection } from "@/components/PlatformSection";
import { SafetySection } from "@/components/SafetySection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05050d] text-white">
      <Navbar />
      <Hero />
      <PlatformSection />
      <FeatureGrid />
      <SafetySection />
      <DownloadSection />
      <Footer />
    </main>
  );
}