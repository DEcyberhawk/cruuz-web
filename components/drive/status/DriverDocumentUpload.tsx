"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

type Props = {
  driverId: string;
  documentType: string;
  label: string;
  onUploaded: () => Promise<void> | void;
};

export default function DriverDocumentUpload({
  driverId,
  documentType,
  label,
  onUploaded,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [expiresAt, setExpiresAt] = useState("");
  const [ghanaCardNumber, setGhanaCardNumber] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const requiresExpiry = [
    "DRIVER_LICENSE",
    "INSURANCE",
    "ROADWORTHY",
    "GHANA_CARD",
  ].includes(documentType);

  async function uploadDocument() {
    setMessage("");

    const token = localStorage.getItem("cruuz_web_token");

    if (!token) {
      setMessage("Please verify your phone again.");
      return;
    }

    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    if (requiresExpiry && !expiresAt) {
      setMessage("Expiry date is required.");
      return;
    }

    if (
      documentType === "GHANA_CARD" &&
      !/^GHA-\d{9}-\d$/.test(ghanaCardNumber.trim())
    ) {
      setMessage("Use Ghana Card format: GHA-000000000-0");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("document", file);
      formData.append("documentType", documentType);

      if (expiresAt) {
        formData.append("expiresAt", expiresAt);
      }

      if (documentType === "GHANA_CARD") {
        formData.append("ghanaCardNumber", ghanaCardNumber.trim());
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002"
        }/driver-documents/driver/${driverId}/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Upload failed");
      }

      setFile(null);
      setExpiresAt("");
      setGhanaCardNumber("");
      setMessage("Uploaded successfully. Waiting for Ops review.");

      await onUploaded();
    } catch (error: any) {
      setMessage(error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm font-black text-white">Upload {label}</p>

      <div className="mt-3 grid gap-3">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="block w-full text-sm text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
        />

        {requiresExpiry && (
         import DatePicker from "react-datepicker";
        import "react-datepicker/dist/react-datepicker.css";

       const [expiryDate, setExpiryDate] = useState<Date | null>(null);
        )}

        {documentType === "GHANA_CARD" && (
          <input
            value={ghanaCardNumber}
            onChange={(event) => setGhanaCardNumber(event.target.value)}
            placeholder="GHA-000000000-0"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
          />
        )}

        <button
          type="button"
          onClick={uploadDocument}
          disabled={uploading}
          className="w-fit rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-black text-white disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>

        {message && <p className="text-xs text-yellow-300">{message}</p>}
      </div>
    </div>
  );
}