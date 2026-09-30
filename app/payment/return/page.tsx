"use client";

import { useEffect } from "react";

export default function PaymentReturnPage() {
  useEffect(() => {
    const queryString = window.location.search;

    // Reuse the existing CRUUZ payment callback implementation.
    window.location.replace(
      `/book/payment/callback${queryString}`
    );
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            border: "5px solid #e5e7eb",
            borderTopColor: "#111827",
            borderRadius: "50%",
            margin: "0 auto 24px",
            animation: "spin 0.9s linear infinite",
          }}
        />

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "28px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Confirming your payment
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Please wait while CRUUZ securely confirms your payment.
        </p>

        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </main>
  );
}