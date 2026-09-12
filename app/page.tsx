import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RideOptions from "@/components/home/RideOptions";
import Download from "@/components/home/Download";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <Hero />
      <Features />
      <RideOptions />
      <Download />
    </main>
  );
}