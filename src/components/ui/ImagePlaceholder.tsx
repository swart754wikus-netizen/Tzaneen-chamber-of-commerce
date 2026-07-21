type ImagePlaceholderProps = {
  label: string;
  className?: string;
  /** Use "dark" when the placeholder sits on a dark/brand-green background. */
  variant?: "light" | "dark";
};

const variantClasses = {
  light: "border-brand-green/40 bg-brand-green/5 text-brand-green-dark",
  dark: "border-white/50 bg-white/10 text-white",
};

/**
 * Visible stand-in for a real photo. Never swap this for a stock or
 * AI-generated image — replace with an actual <Image> once the client
 * supplies real photography.
 */
export function ImagePlaceholder({
  label,
  className = "",
  variant = "light",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed text-center text-sm ${variantClasses[variant]} ${className}`}
    >
      <span className="px-4 py-2">{label}</span>
    </div>
  );
}
