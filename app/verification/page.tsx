import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification & KYC Policy | CRUUZ",
  description:
    "Learn how CRUUZ reviews identity, business, driver, vehicle, and provider information before approving eligible users and service providers.",
};

const sections = [
  {
    title: "1. Purpose",
    body: (
      <>
        <p>
          CRUUZ Logistics Ltd uses verification procedures to help protect
          riders, drivers, delivery partners, vendors, fleet operators,
          businesses, payment partners, and other users of the CRUUZ platform.
        </p>

        <p>
          Verification is intended to support identity confirmation, fraud
          prevention, safety, regulatory compliance, payment integrity, and
          responsible access to CRUUZ services.
        </p>
      </>
    ),
  },
  {
    title: "2. Who May Be Required to Complete Verification",
    body: (
      <>
        <p>
          Verification requirements may apply to users who provide services,
          operate businesses, receive settlements, or access features that
          require additional trust or compliance checks.
        </p>

        <p>This may include:</p>

        <ul>
          <li>Drivers.</li>
          <li>Delivery partners.</li>
          <li>Fleet owners and fleet operators.</li>
          <li>Vendors and merchants.</li>
          <li>Business-account administrators.</li>
          <li>Other service providers using CRUUZ.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Information CRUUZ May Request",
    body: (
      <>
        <p>
          Depending on the provider type and service, CRUUZ may request
          information such as:
        </p>

        <ul>
          <li>Full legal name.</li>
          <li>Date of birth where applicable.</li>
          <li>Telephone number and email address.</li>
          <li>Residential or business address.</li>
          <li>Government-issued identification.</li>
          <li>Driver&apos;s licence for applicable driver accounts.</li>
          <li>Vehicle registration information.</li>
          <li>Insurance and roadworthiness documentation where applicable.</li>
          <li>Business-registration information for business or vendor accounts.</li>
          <li>Information about authorised business representatives.</li>
          <li>Settlement-account information where payments are applicable.</li>
          <li>Other supporting information reasonably required for verification.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. How Information Is Reviewed",
    body: (
      <>
        <p>
          Information submitted to CRUUZ may be reviewed for completeness,
          consistency, validity, document quality, expiry dates, identity
          matching, and compliance with the requirements of the relevant
          service.
        </p>

        <p>
          CRUUZ may compare information provided across submitted documents,
          account details, contact information, business records, vehicle
          details, payment or settlement information, and other available
          records.
        </p>

        <p>
          Where necessary, CRUUZ may request additional documentation or
          clarification before an application is approved.
        </p>
      </>
    ),
  },
  {
    title: "5. Manual and Technology-Assisted Review",
    body: (
      <>
        <p>
          Verification may involve manual review by authorised CRUUZ personnel
          and, where available and appropriate, technology or third-party
          services that assist with identity, document, business, payment, or
          fraud checks.
        </p>

        <p>
          The specific verification method may differ depending on the type of
          user, provider, service, transaction risk, and information available.
        </p>
      </>
    ),
  },
  {
    title: "6. Driver Verification",
    body: (
      <>
        <p>
          Drivers may be required to provide identity information together with
          documents relevant to their ability to lawfully and safely provide
          transportation services.
        </p>

        <p>These may include:</p>

        <ul>
          <li>Government-issued identification.</li>
          <li>Valid driver&apos;s licence.</li>
          <li>Vehicle registration information.</li>
          <li>Vehicle insurance information.</li>
          <li>Roadworthiness or other required vehicle documents.</li>
          <li>Contact and profile information.</li>
        </ul>

        <p>
          Approval may be withheld where required documentation is incomplete,
          inconsistent, expired, invalid, or cannot reasonably be verified.
        </p>
      </>
    ),
  },
  {
    title: "7. Vendor and Business Verification",
    body: (
      <>
        <p>
          Vendors, merchants, fleet operators, and businesses may be required
          to provide information that identifies the business and its authorised
          representatives.
        </p>

        <p>This may include:</p>

        <ul>
          <li>Registered business name.</li>
          <li>Business-registration details.</li>
          <li>Business contact information.</li>
          <li>Identity information for authorised representatives.</li>
          <li>Operational or licensing documents where applicable.</li>
          <li>Settlement-account information where relevant.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Document Standards",
    body: (
      <>
        <p>
          Documents submitted for verification must be genuine, readable,
          complete, current where required, and must relate to the person,
          vehicle, or business being verified.
        </p>

        <p>
          CRUUZ may reject documents that appear altered, fraudulent,
          incomplete, illegible, expired, inconsistent, or otherwise
          unsuitable for verification.
        </p>
      </>
    ),
  },
  {
    title: "9. Additional Verification",
    body: (
      <>
        <p>
          CRUUZ may request additional verification where reasonably necessary,
          including when:
        </p>

        <ul>
          <li>Submitted information is inconsistent.</li>
          <li>Documents cannot be clearly reviewed.</li>
          <li>An account changes important identity or settlement information.</li>
          <li>Fraud or account misuse is suspected.</li>
          <li>A safety or compliance concern arises.</li>
          <li>Applicable regulatory or payment requirements change.</li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Ongoing Verification",
    body: (
      <>
        <p>
          Verification may not be limited to initial registration.
        </p>

        <p>
          CRUUZ may request updated information or documents where previous
          documents expire, account details change, the provider changes
          vehicles or business information, or additional review is reasonably
          required.
        </p>
      </>
    ),
  },
  {
    title: "11. False or Misleading Information",
    body: (
      <>
        <p>
          Users must not submit false, stolen, altered, forged, misleading, or
          fraudulent identity, business, vehicle, licence, insurance, or
          settlement information.
        </p>

        <p>
          Accounts associated with suspected false documentation or identity
          misuse may be restricted, suspended, rejected, or investigated.
        </p>
      </>
    ),
  },
  {
    title: "12. Verification Does Not Guarantee Conduct",
    body: (
      <p>
        Verification helps CRUUZ assess information supplied by a user or
        provider, but it cannot guarantee future behaviour, service quality, or
        that misconduct will never occur. CRUUZ therefore combines
        verification with platform rules, reporting, support, safety controls,
        and ongoing compliance review.
      </p>
    ),
  },
  {
    title: "13. Privacy and Data Protection",
    body: (
      <>
        <p>
          Verification information is handled in accordance with the CRUUZ
          Privacy Policy and applicable data-protection requirements.
        </p>

        <p>
          Access to verification information should be limited to legitimate
          business, safety, fraud-prevention, payment, compliance, and legal
          purposes.
        </p>
      </>
    ),
  },
  {
    title: "14. Approval and Rejection",
    body: (
      <>
        <p>
          Submission of verification information does not automatically
          guarantee approval.
        </p>

        <p>
          CRUUZ may approve, reject, delay, restrict, or request additional
          information where reasonably necessary to protect users, comply with
          applicable requirements, or maintain platform integrity.
        </p>
      </>
    ),
  },
  {
    title: "15. Contact CRUUZ",
    body: (
      <>
        <p>
          Questions about verification, provider registration, or supporting
          documents may be submitted through the official CRUUZ support
          channels.
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="font-black text-white">CRUUZ Logistics Ltd</p>

          <p className="mt-3">
            General enquiries:{" "}
            <a
              href="mailto:info@cruuz.org"
              className="text-violet-300 hover:text-violet-200"
            >
              info@cruuz.org
            </a>
          </p>

          <p>
            Support:{" "}
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
];

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="border-b border-white/10 bg-white/[0.02] px-6 pb-16 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            CRUUZ Trust & Compliance
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Verification & KYC Policy
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            How CRUUZ reviews identity, business, vehicle, driver, and provider
            information before granting eligible platform access.
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