import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | CRUUZ",
  description:
    "Read CRUUZ's Acceptable Use Policy for riders, drivers, vendors, delivery partners, businesses, and other platform users.",
};

const sections = [
  {
    title: "1. Purpose",
    body: (
      <>
        <p>
          This Acceptable Use Policy explains how riders, drivers, vendors,
          delivery partners, fleet operators, businesses, service providers,
          and other users may use the CRUUZ platform.
        </p>

        <p>
          The purpose of this policy is to help protect customers, providers,
          CRUUZ, payment partners, and the wider community from unlawful,
          fraudulent, unsafe, abusive, or prohibited activity.
        </p>
      </>
    ),
  },
  {
    title: "2. Lawful Use",
    body: (
      <p>
        Users may only use CRUUZ for lawful purposes and must comply with all
        laws, regulations, licensing requirements, safety requirements, and
        contractual obligations applicable to their activities.
      </p>
    ),
  },
  {
    title: "3. Prohibited Goods and Services",
    body: (
      <>
        <p>
          CRUUZ must not be used to advertise, arrange, transport, sell,
          purchase, deliver, distribute, or facilitate prohibited or unlawful
          goods or services.
        </p>

        <ul>
          <li>Illegal drugs or controlled substances.</li>
          <li>Illegal weapons, explosives, or dangerous materials.</li>
          <li>Stolen, counterfeit, or unlawfully obtained goods.</li>
          <li>Goods or services that infringe intellectual-property rights.</li>
          <li>Fraudulent financial products or deceptive schemes.</li>
          <li>Human trafficking, exploitation, or illegal transportation activity.</li>
          <li>Unlawful gambling or betting activity.</li>
          <li>Illegal or prohibited adult services.</li>
          <li>Any goods or services prohibited by applicable law.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Fraud and Financial Abuse",
    body: (
      <>
        <p>Users must not:</p>

        <ul>
          <li>Use stolen or unauthorised payment methods.</li>
          <li>Create fraudulent bookings or transactions.</li>
          <li>Manipulate fares, prices, settlements, promotions, or refunds.</li>
          <li>Create multiple accounts to abuse promotions or platform benefits.</li>
          <li>Misrepresent the nature of a transaction.</li>
          <li>Attempt to conceal the source or destination of unlawful funds.</li>
          <li>Use CRUUZ to facilitate money laundering or other financial crime.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Identity and Verification",
    body: (
      <>
        <p>
          Users must provide accurate and authentic registration and
          verification information where requested.
        </p>

        <p>
          Drivers, vendors, delivery partners, fleet operators, businesses, and
          other providers must not submit false, altered, stolen, expired, or
          misleading identity, licence, vehicle, insurance, registration,
          business, or settlement information.
        </p>

        <p>
          CRUUZ may restrict access while verification information is being
          reviewed or where information cannot reasonably be confirmed.
        </p>
      </>
    ),
  },
  {
    title: "6. Safety and Conduct",
    body: (
      <>
        <p>Users must not:</p>

        <ul>
          <li>Threaten, harass, abuse, discriminate against, or endanger another person.</li>
          <li>Engage in violent or reckless behaviour.</li>
          <li>Use CRUUZ services while unlawfully impaired.</li>
          <li>Carry passengers or goods in unsafe conditions.</li>
          <li>Interfere with safety equipment or required vehicle systems.</li>
          <li>Use another person's account without authorisation.</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Platform Security",
    body: (
      <>
        <p>Users must not:</p>

        <ul>
          <li>Attempt unauthorised access to CRUUZ systems or user accounts.</li>
          <li>Introduce malware, harmful code, bots, or automated abuse.</li>
          <li>Scrape or extract data without authorisation.</li>
          <li>Attempt to bypass authentication or security controls.</li>
          <li>Interfere with the availability or integrity of CRUUZ services.</li>
          <li>Exploit platform vulnerabilities for unlawful purposes.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Vendor and Provider Responsibilities",
    body: (
      <>
        <p>
          Vendors and service providers are responsible for ensuring that the
          services or goods they offer through CRUUZ are lawful, accurately
          represented, appropriately licensed where required, and compliant
          with CRUUZ policies.
        </p>

        <p>
          Providers must maintain accurate contact, identity, business,
          settlement, and operational information and must cooperate with
          reasonable compliance, safety, fraud, dispute, or verification
          reviews.
        </p>
      </>
    ),
  },
  {
    title: "9. Misleading or Deceptive Activity",
    body: (
      <>
        <p>Users must not:</p>

        <ul>
          <li>Impersonate another person, business, or organisation.</li>
          <li>Misrepresent prices, services, qualifications, or availability.</li>
          <li>Create fake reviews, bookings, orders, ratings, or transactions.</li>
          <li>Mislead users about the identity of a driver, provider, or business.</li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Payments Outside CRUUZ",
    body: (
      <p>
        Where a service is designated for payment through the CRUUZ platform,
        users must not attempt to manipulate, bypass, or improperly redirect the
        transaction in a way that facilitates fraud, fee avoidance, or other
        prohibited activity.
      </p>
    ),
  },
  {
    title: "11. Investigations and Enforcement",
    body: (
      <>
        <p>
          CRUUZ may review accounts, transactions, reports, supporting
          documents, and platform activity where reasonably necessary to
          investigate suspected fraud, safety incidents, policy violations,
          disputes, or unlawful activity.
        </p>

        <p>
          Depending on the circumstances, CRUUZ may warn, restrict, suspend, or
          terminate an account or service-provider relationship.
        </p>

        <p>
          CRUUZ may also preserve or disclose information where required by
          applicable law, court order, regulatory obligation, or lawful request
          from an authorised authority.
        </p>
      </>
    ),
  },
  {
    title: "12. Reporting Violations",
    body: (
      <>
        <p>
          Users who become aware of suspected fraud, prohibited goods, unsafe
          activity, identity misuse, payment abuse, or another violation should
          report it to CRUUZ Support.
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="font-black text-white">CRUUZ Logistics Ltd</p>

          <p className="mt-3">
            Email:{" "}
            <a
              href="mailto:support@cruuz.org"
              className="text-violet-300 hover:text-violet-200"
            >
              support@cruuz.org
            </a>
          </p>

          <div className="mt-4 space-y-1">
            <p>
              MTN:{" "}
              <a href="tel:+233551550335" className="text-violet-300">
                +233 55 155 0335
              </a>
            </p>

            <p>
              Telecel:{" "}
              <a href="tel:+233303983906" className="text-violet-300">
                +233 30 398 3906
              </a>
            </p>

            <p>
              AirtelTigo:{" "}
              <a href="tel:+233271128889" className="text-violet-300">
                +233 27 112 8889
              </a>
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "13. Changes to this Policy",
    body: (
      <p>
        CRUUZ may update this Acceptable Use Policy as its services,
        regulatory obligations, operating procedures, and risk controls evolve.
        The current version will be published on the CRUUZ website.
      </p>
    ),
  },
];

export default function AcceptableUsePage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="border-b border-white/10 bg-white/[0.02] px-6 pb-16 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            CRUUZ Legal & Compliance
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Acceptable Use Policy
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            This policy establishes standards for lawful, safe, responsible,
            and trustworthy use of the CRUUZ platform.
          </p>

          <p className="mt-6 text-sm text-white/40">
            Effective date: 9 September 2026
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl space-y-8">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8"
            >
              <h2 className="text-xl font-black sm:text-2xl">
                {section.title}
              </h2>

              <div className="mt-4 space-y-4 leading-7 text-white/65 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
                {section.body}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}