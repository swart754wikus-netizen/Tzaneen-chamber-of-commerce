"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { downloadCsv } from "@/lib/csvExport";

type Application = {
  id: string;
  firstName: string;
  surname: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  vatNumber: string;
  submittedAt: string;
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      return;
    }
    getDocs(query(collection(db, "applications"), orderBy("submittedAt", "desc")))
      .then((snapshot) => {
        setApplications(
          snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              ...data,
              submittedAt: data.submittedAt?.toDate
                ? data.submittedAt.toDate().toLocaleString("en-ZA")
                : "",
            } as Application;
          })
        );
      })
      .finally(() => setLoading(false));
  }, []);

  function handleExport() {
    downloadCsv(
      "membership-applications",
      applications.map((a) => ({
        Name: a.firstName,
        Surname: a.surname,
        "Company Address": a.companyAddress,
        "Company Phone": a.companyPhone,
        "Company Email": a.companyEmail,
        "VAT Number": a.vatNumber,
        "Submitted At": a.submittedAt,
      }))
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-primary">
          Membership Applications
        </h1>
        <button
          onClick={handleExport}
          disabled={applications.length === 0}
          className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accent-dark disabled:opacity-50"
        >
          Download CSV (Excel)
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-brand-ink/60">Loading…</p>
      ) : applications.length === 0 ? (
        <p className="mt-8 text-brand-ink/60">
          No applications saved yet. (Only applications submitted after
          Firebase was set up will appear here — earlier ones only went out
          by email/WhatsApp.)
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-brand-primary/10 text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">VAT</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a.id} className="border-b border-brand-primary/5">
                  <td className="px-4 py-3">
                    {a.firstName} {a.surname}
                  </td>
                  <td className="px-4 py-3">{a.companyAddress}</td>
                  <td className="px-4 py-3">{a.companyPhone}</td>
                  <td className="px-4 py-3">{a.companyEmail}</td>
                  <td className="px-4 py-3">{a.vatNumber}</td>
                  <td className="px-4 py-3">{a.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
