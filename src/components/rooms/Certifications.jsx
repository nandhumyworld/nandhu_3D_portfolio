import { certifications, currentlyLearning } from "../../content/certifications";

const CATEGORY_COLORS = {
  tech: "#2a8a8a",
  marketing: "#d97706",
  coaching: "#c9a227",
  other: "#5b3aa0",
};

export default function Certifications() {
  if (!certifications.length && !currentlyLearning.length) return null;
  return (
    <section
      id="certifications"
      className="relative text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.10), transparent 55%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the lifelong student
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Certifications &amp; Learning</h2>
        </div>

        {certifications.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {certifications.map((c, i) => {
              const color = CATEGORY_COLORS[c.category] || "#888";
              return (
                <a
                  key={i}
                  href={c.credentialUrl || undefined}
                  target={c.credentialUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-5 hover:border-accent-gold/40 transition-colors block"
                >
                  <div className="flex items-start gap-3">
                    {c.logo ? (
                      <img src={c.logo} alt="" className="w-10 h-10 object-contain rounded" />
                    ) : (
                      <div
                        className="w-10 h-10 rounded flex items-center justify-center text-xs font-serif"
                        style={{ background: `${color}22`, color }}
                      >
                        {c.category[0].toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-dark text-sm leading-snug">{c.name}</p>
                      <p className="text-xs text-text-dark/60 mt-1">{c.issuer}</p>
                      {c.tracks?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {c.tracks.map((t, ti) => (
                            <li key={ti} className="text-xs text-text-dark/75">· {t}</li>
                          ))}
                        </ul>
                      )}
                      <p className="text-[10px] uppercase tracking-widest mt-2" style={{ color }}>
                        {c.year} · {c.category}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {currentlyLearning.length > 0 && (
          <div className="text-center">
            <h3 className="font-serif text-xl text-accent-gold mb-4">Currently learning</h3>
            <ul className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {currentlyLearning.map((s, i) => (
                <li
                  key={i}
                  className="text-xs px-3 py-1.5 border border-accent-gold/30 rounded-full text-text-dark/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
