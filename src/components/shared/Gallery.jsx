import { useState } from "react";

export default function Gallery({ items = [], columns = 3 }) {
  const [active, setActive] = useState(null);
  if (!items.length) return null;

  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" }[columns] || "md:grid-cols-3";

  return (
    <>
      <ul className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4`}>
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group block w-full overflow-hidden rounded-lg bg-light-border"
            >
              <img
                src={item.src}
                alt={item.caption || ""}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.caption && (
                <span className="block px-3 py-2 text-xs text-light-muted text-left">{item.caption}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-bg-dark/95 flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-text-dark/70 hover:text-accent-gold"
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <figure className="max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img src={active.src} alt={active.caption || ""} className="max-h-[80vh] object-contain" />
            {active.caption && (
              <figcaption className="mt-3 text-sm text-text-dark/70 text-center">{active.caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
