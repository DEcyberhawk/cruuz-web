import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | CRUUZ",
  description:
    "Answers to common questions about CRUUZ rides, drivers, business services, payments, safety, cancellations, support, and account verification.",
};

const faqSections = [
  {
    title: "About CRUUZ",
    questions: [
      {
        question: "What is CRUUZ?",
        answer:
          "CRUUZ Logistics Ltd is a technology-powered mobility and logistics company building services that connect riders, drivers, businesses, delivery partners, and other service providers through a digital platform.",
      },
      {
        question: "Where does CRUUZ operate?",
        answer:
          "CRUUZ is proudly Ghanaian and is being developed initially for the Ghanaian market, with a long-term vision to serve additional African and international markets.",
      },
      {
        question: "What services does CRUUZ provide?",
        answer:
          "CRUUZ is being developed to support passenger transportation, delivery and logistics services, airport transportation, business mobility, scheduled rides, and related technology-enabled mobility services.",
      },
    ],
  },
  {
    title: "Rides & Bookings",
    questions: [
      {
        question: "How do I book a CRUUZ ride?",
        answer:
          "When CRUUZ ride services are available in your location, you will be able to enter your pickup point and destination, review available ride options, request a ride, and receive information about your assigned driver and trip.",
      },
      {
        question: "Can I schedule a ride in advance?",
        answer:
          "CRUUZ is being designed to support scheduled transportation for eligible services, including business and airport transportation. Availability may depend on location and service type.",
      },
      {
        question: "Can businesses use CRUUZ?",
        answer:
          "Yes. CRUUZ is developing business mobility services for organisations that need employee transportation, scheduled rides, airport transfers, departmental billing, cost centres, ride policies, and related transportation management tools.",
      },
    ],
  },
  {
    title: "Drivers & Service Providers",
    questions: [
      {
        question: "How can I become a CRUUZ driver or service provider?",
        answer:
          "Eligible applicants will be able to register through CRUUZ and provide the information and supporting documents required for the applicable service.",
      },
      {
        question: "Does CRUUZ verify drivers and providers?",
        answer:
          "CRUUZ may require identity, driving licence, vehicle, business, insurance, registration, operating, and other relevant information before a driver or service provider is approved to offer applicable services through the platform.",
      },
      {
        question: "Does submitting an application guarantee approval?",
        answer:
          "No. Registration or submission of documents does not automatically guarantee approval. Applications may be reviewed for eligibility, completeness, safety, compliance, and other applicable requirements.",
      },
    ],
  },
  {
    title: "Payments",
    questions: [
      {
        question: "How can I pay for CRUUZ services?",
        answer:
          "Available payment methods will be displayed during the booking or checkout process. Payment options may vary depending on the service, location, and supported payment providers.",
      },
      {
        question: "Are online payments secure?",
        answer:
          "CRUUZ may work with authorised payment service providers to process electronic transactions. CRUUZ does not ask customers to disclose sensitive payment credentials through unofficial channels.",
      },
      {
        question: "Will I receive information about my transaction?",
        answer:
          "Where supported, customers will receive booking or transaction information through the CRUUZ platform or associated communication channels.",
      },
    ],
  },
  {
    title: "Cancellations, Refunds & Disputes",
    questions: [
      {
        question: "Can I cancel a booking?",
        answer:
          "Bookings may be cancelled subject to the conditions applicable to the service. Any applicable cancellation conditions or charges should be presented through the platform or relevant CRUUZ policy.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "If you believe you are entitled to a refund, contact CRUUZ Support with the relevant booking or transaction information. Refund eligibility depends on the circumstances of the transaction and the applicable CRUUZ policy.",
      },
      {
        question: "What should I do if I have a payment or service dispute?",
        answer:
          "Contact CRUUZ Support and provide the relevant booking, transaction, and supporting information. The matter can then be reviewed and, where necessary, information may be requested from the parties involved.",
      },
    ],
  },
  {
    title: "Safety & Support",
    questions: [
      {
        question: "What should I do if I have a safety concern?",
        answer:
          "Report the issue to CRUUZ Support as soon as possible. If there is an immediate threat to life or safety, contact the appropriate emergency authorities first.",
      },
      {
        question: "How can I contact CRUUZ?",
        answer:
          "You can contact CRUUZ through info@cruuz.org for general enquiries or support@cruuz.org for customer support. Our official MTN, Telecel, and AirtelTigo customer hotlines are also listed below.",
      },
      {
        question: "How can I recognise official CRUUZ communication?",
        answer:
          "Customers should use the official CRUUZ website, official CRUUZ email addresses, applications, and published support numbers. Be cautious of anyone requesting passwords, authentication codes, or sensitive financial information through unofficial channels.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="px-6 pb-16 pt-36">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            Help Centre
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Find answers about CRUUZ rides, drivers, business services,
            payments, safety, cancellations, refunds, verification, and
            customer support.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-12">
          {faqSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-2xl font-black">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.questions.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] open:bg-white/[0.06]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-bold text-white">
                      <span>{item.question}</span>

                      <span className="text-2xl font-light text-violet-300 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-white/10 px-6 py-5">
                      <p className="max-w-4xl leading-7 text-white/60">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-2xl font-black">
            Still need help?
          </h2>

          <p className="mt-3 text-white/60">
            Contact the CRUUZ customer support team through any of our
            official support channels.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="mailto:support@cruuz.org"
              className="rounded-2xl border border-white/10 p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                Email Support
              </p>
              <p className="mt-2 font-bold">support@cruuz.org</p>
            </a>

            <a
              href="tel:+233551550335"
              className="rounded-2xl border border-white/10 p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                MTN
              </p>
              <p className="mt-2 font-bold">+233 55 155 0335</p>
            </a>

            <a
              href="tel:+233303983906"
              className="rounded-2xl border border-white/10 p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                Telecel
              </p>
              <p className="mt-2 font-bold">+233 30 398 3906</p>
            </a>

            <a
              href="tel:+233271128889"
              className="rounded-2xl border border-white/10 p-5 transition hover:bg-white/[0.06]"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                AirtelTigo
              </p>
              <p className="mt-2 font-bold">+233 27 112 8889</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}