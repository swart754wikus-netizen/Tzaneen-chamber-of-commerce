"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-primary/10 rounded-2xl border border-brand-primary/10">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-brand-primary"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.question}
              <span
                aria-hidden
                className={`shrink-0 text-brand-accent-dark transition-transform ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open && (
              <p className="px-5 pb-4 text-sm text-brand-ink/70">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
