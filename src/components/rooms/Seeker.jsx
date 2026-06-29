import { seeker } from "../../content/seeker";
import BookCallCTA from "../shared/BookCallCTA";

export default function Seeker() {
  const hasContent =
    seeker.path ||
    seeker.guruLineage ||
    seeker.practices.length ||
    seeker.teachings.length ||
    seeker.offerings;
  if (!hasContent) return null;

  return (
    <section
      id="seeker"
      className="relative bg-bg-dark text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(91,58,160,0.18), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,162,39,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent-indigo uppercase tracking-[0.3em] text-xs mb-3">
            Room X · The deepest layer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">The Seeker</h2>
        </div>

        {seeker.coreQuote && (
          <blockquote className="font-serif italic text-accent-gold text-xl md:text-2xl text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            "{seeker.coreQuote}"
          </blockquote>
        )}

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {seeker.path && (
            <div>
              <h3 className="font-serif text-xl text-accent-indigo mb-3">The path</h3>
              <p className="text-text-dark/80 leading-relaxed">{seeker.path}</p>
              {seeker.guruLineage && (
                <p className="text-text-dark/60 text-sm mt-4 italic">{seeker.guruLineage}</p>
              )}
            </div>
          )}

          {seeker.practices.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-accent-indigo mb-3">Practices</h3>
              <ul className="space-y-2">
                {seeker.practices.map((p, i) => (
                  <li key={i} className="text-text-dark/80 leading-relaxed pl-4 border-l-2 border-accent-indigo/40">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {seeker.certifications.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-xl text-accent-indigo mb-3 text-center">Certifications</h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {seeker.certifications.map((c, i) => (
                <li
                  key={i}
                  className="px-4 py-2 border border-accent-indigo/30 rounded-full text-sm text-text-dark/80"
                >
                  {c.name} · {c.lineage} · {c.year}
                </li>
              ))}
            </ul>
          </div>
        )}

        {seeker.teachings.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-xl text-accent-indigo mb-6 text-center">Teachings</h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {seeker.teachings.map((t, i) => (
                <li
                  key={i}
                  className="bg-white/[0.03] border border-accent-indigo/20 rounded-lg p-5 text-text-dark/85 leading-relaxed"
                >
                  <span className="block text-accent-indigo font-serif text-sm mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {seeker.offerings && (
          <div className="text-center max-w-2xl mx-auto pt-8 border-t border-white/10">
            <p className="text-text-dark/85 leading-relaxed mb-6">{seeker.offerings}</p>
            <BookCallCTA variant="ghost" label="Reach out" />
          </div>
        )}
      </div>
    </section>
  );
}
