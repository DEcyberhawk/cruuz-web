"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryItem = {
  title: string;
  image: string;
};

export default function GalleryModal({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const item = items[index];

  function previous() {
    setIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  }

  function next() {
    setIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 p-4 backdrop-blur-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close preview"
      >
        <X size={22} />
      </button>

      <button
        type="button"
        onClick={previous}
        className="absolute left-5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-4">
        <p className="text-center text-sm font-black uppercase tracking-[0.25em] text-white/70">
          {item.title}
        </p>

        <div className="relative h-[78vh] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}