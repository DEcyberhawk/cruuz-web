import Heading from "@/components/ui/Heading";
import FeatureCard from "@/components/ui/FeatureCard";
import Section from "@/components/ui/Section";
import { assets } from "@/lib/assets";
export default function WhyCruuz() {
  return (
    <Section>
      <Heading
        subtitle="WHY CRUUZ"
        title="Built around trust, safety and intelligent mobility."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <FeatureCard
          image={assets.badges.verifiedDriver}
          title="Verified Drivers"
          description="Every driver completes identity, document and vehicle verification before joining CRUUZ."
        />

        <FeatureCard
         image={assets.badges.trustedPartner}
          title="Trusted Partners"
          description="Businesses, fleets and mobility partners are carefully verified to maintain a trusted ecosystem."
        />

        <FeatureCard
          image={assets.badges.securePayments}
          title="Secure Payments"
          description="Fast, secure and reliable payments with modern wallet and payment protection."
        />
      </div>
    </Section>
  );
}