"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDocuments, getConstitutionUrl, type ChamberDocument } from "@/lib/documents";
import { isFirebaseConfigured } from "@/lib/firebase";

export function DocumentsList() {
  const [documents, setDocuments] = useState<ChamberDocument[]>([]);
  const [constitutionUrl, setConstitutionUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      return;
    }
    Promise.all([getAllDocuments(), getConstitutionUrl()])
      .then(([docs, url]) => {
        setDocuments(docs);
        setConstitutionUrl(url);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <p className="text-center text-brand-ink/60">
        Documents aren&apos;t set up yet — check back soon.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-brand-ink/60">Loading…</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-bold text-brand-primary">Constitution</h2>
        {constitutionUrl ? (
          <a
            href={constitutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-semibold text-brand-accent-dark hover:text-brand-accent"
          >
            Download the Chamber&apos;s Constitution (PDF) →
          </a>
        ) : (
          <p className="mt-2 text-sm text-brand-ink/60">
            Not uploaded yet.
          </p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-brand-primary">Letters & Notices</h2>
        {documents.length === 0 ? (
          <p className="mt-2 text-sm text-brand-ink/60">
            No documents uploaded yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {documents.map((document) => (
              <li key={document.id}>
                <Link
                  href={`/documents/${document.id}`}
                  className="font-semibold text-brand-accent-dark hover:text-brand-accent"
                >
                  {document.title} →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
