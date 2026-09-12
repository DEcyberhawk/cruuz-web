import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refunds, Cancellations & Disputes | CRUUZ",
  description:
    "Learn how CRUUZ handles booking cancellations, refund requests, service disputes, and transaction reviews.",
};

const sections = [
  {
    title: "1. Overview",
    body: (
      <>
        <p>
          This policy explains how CRUUZ Logistics Ltd handles cancellations,
          refund requests, service complaints, payment disputes, and related
          transaction reviews across applicable CRUUZ services.
        </p>

        <p>
          The outcome of a cancellation or refund request may depend on the
          service involved, the stage of fulfilment, the circumstances of the
          transaction, and any applicable charges already incurred.
        </p>
      </>
    ),
  },
  {
    title: "2. Booking Cancellations",
    body: (
      <>
        <p>
          Customers may be able to cancel a booking before or after a driver,
          delivery partner, or other provider accepts the request, subject to
          the rules applicable to that service.
        </p>

        <p>
          A cancellation charge may apply where a provider has already accepted
          the request, travelled toward the pickup location, incurred costs, or
          started providing the requested service.
        </p>

        <p>
          Where possible, applicable cancellation information should be made
          available to the customer through the CRUUZ platform before the
          cancellation is confirmed.
        </p>
      </>
    ),
  },
  {
    title: "3. Provider Cancellations",
    body: (
      <>
        <p>
          A driver, delivery partner, or other service provider may cancel a
          booking where fulfilment is not reasonably possible or where safety,
          operational, legal, or other legitimate concerns arise.
        </p>

        <p>
          Repeated or inappropriate provider cancellations may be reviewed by
          CRUUZ and may affect continued access to the platform.
        </p>
      </>
    ),
  },
  {
    title: "4. Refund Eligibility",
    body: (
      <>
        <p>
          A refund may be considered where there is a valid reason, including
          circumstances such as:
        </p>

        <ul>
          <li>A duplicate or erroneous charge.</li>
          <li>A cancelled service for which payment was taken but no service was provided.</li>
          <li>A failed transaction where the customer was charged.</li>
          <li>A verified billing or fare error.</li>
          <li>A service failure that reasonably justifies a full or partial refund.</li>
          <li>Another circumstance where CRUUZ determines that a refund is appropriate.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Non-Refundable Circumstances",
    body: (
      <>
        <p>
          A refund may not be available where:
        </p>

        <ul>
          <li>The service was substantially completed as requested.</li>
          <li>The customer provided incorrect booking information that caused the issue.</li>
          <li>A valid cancellation charge applies.</li>
          <li>The request is fraudulent, abusive, or unsupported by available information.</li>
          <li>The dispute concerns an issue outside CRUUZ&apos;s reasonable control and no refund obligation applies.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. How to Request a Refund",
    body: (
      <>
        <p>
          Customers should contact CRUUZ Support and provide enough information
          for the transaction to be reviewed.
        </p>

        <p>Relevant information may include:</p>

        <ul>
          <li>Customer name and contact information.</li>
          <li>Booking, order, or trip reference where available.</li>
          <li>Transaction or payment reference where available.</li>
          <li>Date and approximate time of the transaction.</li>
          <li>Description of the issue.</li>
          <li>Supporting screenshots, receipts, or other relevant evidence.</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Refund Review",
    body: (
      <>
        <p>
          CRUUZ may review booking records, payment information, platform logs,
          location or trip information, provider information, customer
          communications, and other relevant evidence when evaluating a refund
          request.
        </p>

        <p>
          CRUUZ may contact the customer, provider, payment processor, or other
          relevant party where additional information is reasonably required.
        </p>
      </>
    ),
  },
  {
    title: "8. Refund Processing",
    body: (
      <>
        <p>
          Where a refund is approved, it will generally be processed through
          the appropriate payment channel or payment service provider used for
          the transaction.
        </p>

        <p>
          The time required for refunded funds to appear may depend on the
          payment provider, bank, mobile-money provider, card network, or other
          financial institution involved.
        </p>
      </>
    ),
  },
  {
    title: "9. Partial Refunds",
    body: (
      <p>
        CRUUZ may issue a partial refund where only part of the service was
        affected or where a partial reimbursement is considered reasonable
        based on the circumstances of the transaction.
      </p>
    ),
  },
  {
    title: "10. Payment Disputes",
    body: (
      <>
        <p>
          If a customer believes a payment is incorrect, unauthorised, or
          associated with a service problem, the customer should first contact
          CRUUZ Support so the matter can be reviewed.
        </p>

        <p>
          CRUUZ may investigate the relevant transaction and cooperate with
          payment processors, banks, mobile-money providers, card networks, or
          other authorised parties where required.
        </p>
      </>
    ),
  },
  {
    title: "11. Service Complaints",
    body: (
      <>
        <p>
          Complaints relating to driver conduct, service quality, delivery
          issues, safety concerns, incorrect charges, or provider behaviour may
          be submitted to CRUUZ Support.
        </p>

        <p>
          CRUUZ may request supporting information and may review the accounts
          or transaction records of the parties involved.
        </p>
      </>
    ),
  },
  {
    title: "12. Fraudulent or Abusive Claims",
    body: (
      <>
        <p>
          CRUUZ may reject refund or dispute claims that appear fraudulent,
          deliberately misleading, repetitive, abusive, or intended to obtain
          an improper financial benefit.
        </p>

        <p>
          Accounts associated with suspected fraud or payment abuse may be
          restricted, suspended, or investigated.
        </p>
      </>
    ),
  },
  {
    title: "13. Provider Disputes",
    body: (
      <>
        <p>
          Drivers, vendors, delivery partners, fleet operators, or other
          providers who dispute a transaction, settlement, cancellation, or
          platform decision should contact CRUUZ through the applicable support
          channel.
        </p>

        <p>
          CRUUZ may review service records, transaction information, supporting
          documentation, and communications before making a decision.
        </p>
      </>
    ),
  },
  {
    title: "14. Contact CRUUZ",
    body: (
      <>
        <p>
          Refund requests, cancellations, complaints, and transaction disputes
          may be submitted through the official CRUUZ support channels.
        </p>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="font-black text-white">CRUUZ Logistics Ltd</p>

          <p className="mt-3">
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
  {
    title: "15. Policy Updates",
    body: (
      <p>
        CRUUZ may update this policy as services, payment methods, operational
        procedures, or legal and regulatory requirements evolve. The current
        version will be published on the CRUUZ website.
      </p>
    ),
  },
];

export default function RefundsCancellationsPage() {
  return (
    <main className="min-h-screen bg-[#101936] text-white">
      <section className="border-b border-white/10 bg-white/[0.02] px-6 pb-16 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            CRUUZ Customer Protection
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Refunds, Cancellations & Disputes
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            This policy explains how CRUUZ handles booking cancellations,
            refunds, service complaints, and transaction disputes.
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