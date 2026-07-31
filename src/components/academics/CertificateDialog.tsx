"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type CertificateDialogProps = {
  imageSrc: string;
  title: string;
  triggerLabel?: string;
  compact?: boolean;
};

function isImageReady(img: HTMLImageElement | null | undefined) {
  return Boolean(img?.complete && img.naturalWidth > 0);
}

export default function CertificateDialog({
  imageSrc,
  title,
  triggerLabel = "View certificate",
  compact = false,
}: CertificateDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  const syncLoadedFromImage = () => {
    if (isImageReady(imageRef.current)) {
      setLoaded(true);
    }
  };

  const open = () => {
    dialogRef.current?.showModal();
    // Cached images stay complete in the DOM and won't re-fire onLoad after a reset.
    if (isImageReady(imageRef.current)) {
      setLoaded(true);
    } else {
      setLoaded(false);
      // onLoad may have fired before the listener attached; re-check after paint.
      requestAnimationFrame(syncLoadedFromImage);
    }
  };

  const close = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  useEffect(() => {
    setLoaded(false);
    syncLoadedFromImage();
  }, [imageSrc]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`${triggerLabel}: ${title}`}
        title={triggerLabel}
        className={
          compact
            ? "inline-flex shrink-0 items-center justify-center rounded-full p-1 text-white/50 transition-colors duration-300 hover:text-accent-orange-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
            : "inline-flex shrink-0 items-center justify-center rounded-full border border-accent-orange-soft/40 p-1.5 text-accent-orange-soft transition-colors duration-300 hover:border-accent-orange-soft/60 hover:bg-accent-orange/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
        }
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={compact ? "h-4 w-4" : "h-5 w-5"}
        >
          <path
            d="M14 5h5v5M10 14L19 5M15 5h4v4M5 19h14a2 2 0 0 0 2-2V9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`cert-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="fixed inset-0 z-50 m-0 h-dvh max-h-dvh w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/75 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <div className="relative mx-auto flex max-h-[92dvh] w-[min(920px,94vw)] flex-col overflow-hidden rounded-2xl border border-glass-border bg-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5">
            <h3
              id={`cert-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
              className="truncate text-sm font-semibold text-[#f5f2ec] sm:text-base"
            >
              {title}
            </h3>
            <button
              type="button"
              onClick={close}
              aria-label="Close certificate preview"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glass-border bg-glass text-white/80 transition-colors duration-300 hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange-soft"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative min-h-[200px] flex-1 overflow-auto bg-black/40 p-3 sm:p-5">
            {!loaded && (
              <div
                aria-hidden="true"
                className="absolute inset-3 animate-pulse rounded-xl bg-white/5 sm:inset-5"
              />
            )}
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={title}
              width={1200}
              height={1600}
              unoptimized
              onLoad={() => setLoaded(true)}
              className={`mx-auto h-auto w-full max-w-full rounded-lg object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
