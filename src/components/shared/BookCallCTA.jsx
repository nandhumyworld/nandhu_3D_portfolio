export default function BookCallCTA({ variant = "primary", label = "Book a call" }) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? "bg-accent-gold text-bg-dark hover:bg-accent-gold/90 shadow-lg shadow-accent-gold/20"
      : "border border-accent-gold text-accent-gold hover:bg-accent-gold/10";

  return (
    <a href="#connect" className={`${base} ${styles}`}>
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}
