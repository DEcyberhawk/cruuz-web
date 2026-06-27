import DriveHero from "@/components/drive/DriveHero";
import WhyDrive from "@/components/drive/WhyDrive";
import DriverRequirements from "@/components/drive/DriverRequirements";
import DriverProcess from "@/components/drive/DriverProcess";
import DriveCTA from "@/components/drive/DriveCTA";
import DriverSuccessCenter from "@/components/drive/DriverSuccessCenter";
import EarningsCalculator from "@/components/drive/EarningsCalculator";


export default function DrivePage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <DriveHero />
      <WhyDrive />
      <DriverRequirements />
      <DriverProcess />
      <DriverSuccessCenter />
      <EarningsCalculator />
      <DriveCTA />
    </main>
  );
}