type NeedsContentProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Visible callout for a spot where real content is still needed from the
 * client — never fill this with invented copy.
 */
export function NeedsContent({ children, className = "" }: NeedsContentProps) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-brand-accent/40 bg-brand-accent/5 p-6 text-sm text-brand-ink/70 ${className}`}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-accent-dark">
        Needs content from you
      </p>
      {children}
    </div>
  );
}
