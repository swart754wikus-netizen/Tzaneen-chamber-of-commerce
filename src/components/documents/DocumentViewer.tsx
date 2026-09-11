"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getDocument, type ChamberDocument } from "@/lib/documents";

export function DocumentViewer({ documentId }: { documentId: string }) {
  const [document, setDocument] = useState<ChamberDocument | null | undefined>(
    undefined
  );

  useEffect(() => {
    getDocument(documentId).then(setDocument).catch(() => setDocument(null));
  }, [documentId]);

  if (document === undefined) {
    return <p className="text-center text-brand-ink/60">Loading…</p>;
  }
  if (document === null) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-primary">{document.title}</h1>
        <a
          href={document.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-brand-accent-dark"
        >
          Open PDF ↗
        </a>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-primary/10 shadow-sm">
        <iframe
          src={`${document.fileUrl}#toolbar=0&navpanes=0`}
          title={document.title}
          className="h-[75vh] w-full"
        />
      </div>
    </div>
  );
}
