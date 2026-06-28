"use client";

import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  driverId: string;
  documentType: string;
  label: string;
  onUploaded: () => Promise<void> | void;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

const MAX_FILE_SIZE_MB = 10;

const EXPIRY_REQUIRED_DOCUMENTS = [
  "DRIVER_LICENSE",
  "INSURANCE",
  "ROADWORTHY",
  "GHANA_CARD",
];

function formatGhanaCardNumber(value: string) {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/^GHA/, "");

  const digits = cleaned.replace(/\D/g, "").slice(0, 10);

  if (!digits) return "GHA-";

  const main = digits.slice(0, 9);
  const check = digits.slice(9, 10);

  return `GHA-${main}${check ? `-${check}` : ""}`;
}

function isValidGhanaCardNumber(value: string) {
  return /^GHA-\d{9}-\d$/.test(value.trim());
}

export default function DriverDocumentUpload({
  driverId,
  documentType,
  label,
  onUploaded,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [ghanaCardNumber, setGhanaCardNumber] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "warning" | "error">(
    "warning"
  );

  const requiresExpiry = EXPIRY_REQUIRED_DOCUMENTS.includes(documentType);

  const filePreview = useMemo(() => {
    if (!file) return null;

    return {
      name: file.name,
      sizeMb: file.size / 1024 / 1024,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type || "Unknown file type",
    };
  }, [file]);

  function showMessage(
    text: string,
    tone: "success" | "warning" | "error" = "warning"
  ) {
    setMessage(text);
    setMessageTone(tone);
  }

  function handleFileSelect(selectedFile?: File) {
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    const isAccepted =
      allowedMimeTypes.includes(selectedFile.type) ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isAccepted) {
      setFile(null);
      showMessage("Only JPG, PNG or PDF files are accepted.", "error");
      return;
    }

    const fileSizeMb = selectedFile.size / 1024 / 1024;

    if (fileSizeMb > MAX_FILE_SIZE_MB) {
      setFile(null);
      showMessage(
        `File is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`,
        "error"
      );
      return;
    }

    setFile(selectedFile);
  }

  async function uploadDocument() {
    setMessage("");

    const token = localStorage.getItem("cruuz_web_token");

    if (!token) {
      showMessage("Please verify your phone again before uploading.", "error");
      return;
    }

    if (!driverId) {
      showMessage("Driver profile was not found. Please refresh the page.", "error");
      return;
    }

    if (!file) {
      showMessage("Please choose a document file first.", "warning");
      return;
    }

    if (requiresExpiry && !expiryDate) {
      showMessage(`${label} requires an expiry date.`, "warning");
      return;
    }

    if (
      documentType === "GHANA_CARD" &&
      !isValidGhanaCardNumber(ghanaCardNumber)
    ) {
      showMessage("Use Ghana Card format: GHA-000000000-0", "warning");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("document", file);
      formData.append("documentType", documentType);

      if (expiryDate) {
        formData.append("expiresAt", expiryDate.toISOString());
      }

      if (documentType === "GHANA_CARD") {
        formData.append("ghanaCardNumber", ghanaCardNumber.trim());
      }

      const response = await fetch(
        `${API_BASE_URL}/driver-documents/driver/${driverId}/upload`,
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
      setExpiryDate(null);
      setGhanaCardNumber("");

      showMessage(
        `${label} uploaded successfully. Waiting for Nexaro Ops review.`,
        "success"
      );

      await onUploaded();
    } catch (error: any) {
      showMessage(error?.message || "Upload failed.", "error");
    } finally {
      setUploading(false);
    }
  }

  const messageClass =
    messageTone === "success"
      ? "text-emerald-300"
      : messageTone === "error"
      ? "text-red-300"
      : "text-yellow-300";

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-white">Upload {label}</p>
          <p className="mt-1 text-xs leading-5 text-white/45">
            JPG, PNG or PDF accepted. Maximum file size: {MAX_FILE_SIZE_MB} MB.
          </p>
        </div>

        {requiresExpiry && (
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-yellow-300">
            Expiry required
          </span>
        )}
      </div>

      <label className="mt-4 block cursor-pointer rounded-2xl border border-dashed border-violet-400/30 bg-violet-500/5 p-5 transition hover:bg-violet-500/10">
        <input
          type="file"
          accept="image/jpeg,image/png,.pdf"
          onChange={(event) => handleFileSelect(event.target.files?.[0])}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-2xl">
            📄
          </div>

          <div>
            <p className="text-sm font-black text-white">
              {file ? "File selected" : "Choose document file"}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/50">
              Click here to browse and select your document.
            </p>
          </div>
        </div>
      </label>

      {filePreview && (
        <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-sm font-black text-emerald-300">
            Ready to upload
          </p>

          <div className="mt-2 space-y-1 text-xs text-white/70">
            <p>Name: {filePreview.name}</p>
            <p>Size: {filePreview.size}</p>
            <p>Type: {filePreview.type}</p>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3">
        {requiresExpiry && (
          <DatePicker
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Select expiry date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            disabled={uploading}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-60"
          />
        )}

        {documentType === "GHANA_CARD" && (
          <input
            value={ghanaCardNumber}
            onChange={(event) =>
              setGhanaCardNumber(formatGhanaCardNumber(event.target.value))
            }
            placeholder="GHA-000000000-0"
            disabled={uploading}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-60"
          />
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={uploadDocument}
            disabled={uploading}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>

          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={uploading}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white/70 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Remove File
            </button>
          )}
        </div>

        {message && <p className={`text-xs font-bold ${messageClass}`}>{message}</p>}
      </div>
    </div>
  );
}