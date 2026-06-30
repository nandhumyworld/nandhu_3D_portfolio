import { eyediaWorks } from "../../content/eyediaWorks";
import BookCallCTA from "../shared/BookCallCTA";

export default function EyediaWorks() {
  return (
    <section
      id="eyediaworks"
      className="relative bg-bg-dark text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(201,162,39,0.14), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(91,58,160,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the studio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">EyediaWorks</h2>
          {eyediaWorks.tagline && (
            <p className="font-serif italic text-accent-gold text-lg md:text-xl mt-4">
              {eyediaWorks.tagline}
            </p>
          )}
        </div>

        {eyediaWorks.description && (
          <p className="text-text-dark/85 leading-relaxed max-w-3xl mx-auto mb-14 text-center">
            {eyediaWorks.description}
          </p>
        )}

        {eyediaWorks.services.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {eyediaWorks.services.map((s, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-lg p-6 hover:border-accent-gold/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/15 flex items-center justify-center mb-4 text-accent-gold font-serif">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-lg text-text-dark mb-2 leading-snug">{s.title}</h3>
                <p className="text-text-dark/70 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-6 border-t border-white/10">
          {eyediaWorks.websiteUrl ? (
            <a
              href={eyediaWorks.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 border border-accent-gold/50 text-accent-gold rounded-full hover:bg-accent-gold hover:text-bg-dark transition-colors mr-3"
            >
              Visit EyediaWorks ↗
            </a>
          ) : null}
          <BookCallCTA variant="primary" label="Start a project" />
        </div>
      </div>
    </section>
  );
}
