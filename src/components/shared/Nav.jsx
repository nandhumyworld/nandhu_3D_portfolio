import { useEffect, useState } from "react";
import { profile } from "../../constants/profile";
import BookCallCTA from "./BookCallCTA";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "human", label: "The Human" },
  { id: "story", label: "Story" },
  { id: "career", label: "Career" },
  { id: "certifications", label: "Certifications" },
  { id: "eyediaworks", label: "EyediaWorks" },
  { id: "coach", label: "Coach" },
  { id: "tribe", label: "Tribe" },
  { id: "farm", label: "Farm" },
  { id: "seeker", label: "Seeker" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-serif text-lg text-text-dark hover:text-accent-gold transition-colors">
          {profile.name}
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-text-dark/70 hover:text-accent-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <BookCallCTA variant="primary" />
        </div>

        <button
          className="lg:hidden text-text-dark"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-bg-dark/95 backdrop-blur-md border-t border-white/5">
          <nav className="px-6 py-4 flex flex-col gap-3">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="text-sm text-text-dark/80 hover:text-accent-gold transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2">
              <BookCallCTA variant="primary" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
