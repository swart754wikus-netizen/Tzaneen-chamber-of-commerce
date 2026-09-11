"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  getAllDocuments,
  deleteDocument,
  createDocument,
  getConstitutionUrl,
  setConstitutionUrl,
  type ChamberDocument,
} from "@/lib/documents";
import { uploadFile } from "@/lib/storageUpload";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<ChamberDocument[]>([]);
  const [constitutionUrl, setConstitutionUrlState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [constitutionFile, setConstitutionFile] = useState<File | null>(null);
  const [uploadingConstitution, setUploadingConstitution] = useState(false);

  function refresh() {
    Promise.all([getAllDocuments(), getConstitutionUrl()])
      .then(([docs, url]) => {
        setDocuments(docs);
        setConstitutionUrlState(url);
      })
      .finally(() => setLoading(false));
  }

  useEffect(refresh, []);

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !file) {
      setError("Please give it a title and choose a PDF file.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const fileUrl = await uploadFile("documents", file);
      await createDocument(title.trim(), fileUrl);
      setTitle("");
      setFile(null);
      refresh();
    } catch {
      setError("Something went wrong uploading this document.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this document?")) return;
    await deleteDocument(id);
    refresh();
  }

  async function handleConstitutionUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!constitutionFile) return;
    setUploadingConstitution(true);
    try {
      const url = await uploadFile("constitution", constitutionFile);
      await setConstitutionUrl(url);
      setConstitutionFile(null);
      refresh();
    } finally {
      setUploadingConstitution(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-primary">Documents</h1>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-primary">Constitution</h2>
        <p className="mt-1 text-sm text-brand-ink/60">
          {constitutionUrl ? "A Constitution PDF is currently live." : "No Constitution uploaded yet."}
        </p>
        <form onSubmit={handleConstitutionUpload} className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setConstitutionFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
          <button
            type="submit"
            disabled={!constitutionFile || uploadingConstitution}
            className="rounded-full bg-brand-accent px-5 py-2 text-sm font-semibold text-white hover:bg-brand-accent-dark disabled:opacity-50"
          >
            {uploadingConstitution ? "Uploading…" : "Upload / Replace"}
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-bold text-brand-primary">Upload a Letter / Document</h2>
        <p className="mt-1 text-sm text-brand-ink/60">
          Shown to visitors as view-only — no direct download link.
        </p>
        <form onSubmit={handleUpload} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-2.5 text-brand-ink focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
          {error && <p className="text-sm text-brand-accent-dark">{error}</p>}
          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      </div>

      {loading ? (
        <p className="mt-8 text-brand-ink/60">Loading…</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {documents.map((document) => (
            <li
              key={document.id}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-brand-primary">{document.title}</p>
              <button
                onClick={() => handleDelete(document.id)}
                className="text-sm font-semibold text-brand-accent-dark hover:text-brand-accent"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
