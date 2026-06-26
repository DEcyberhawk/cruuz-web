import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import RideOptions from "@/components/home/RideOptions";
import Download from "@/components/home/Download";
import WhyCruuz from "@/components/sections/WhyCruuz";
import Ecosystem from "@/components/sections/Ecosystem";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <Navbar />
<Hero />
<WhyCruuz />
<RideOptions />
<Ecosystem />
<Download />
<Footer />
    </main>
  );
}