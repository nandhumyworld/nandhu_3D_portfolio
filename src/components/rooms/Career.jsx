import { career } from "../../content/career";

export default function Career() {
  return (
    <section
      id="career"
      className="relative bg-bg-dark text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(30,58,95,0.20), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,162,39,0.08), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the engine room
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Career &amp; Projects</h2>
        </div>

        {career.summary && (
          <p className="font-serif text-text-dark/85 text-lg md:text-xl text-center max-w-3xl mx-auto mb-16 leading-relaxed italic">
            {career.summary}
          </p>
        )}

        {career.experiences.length > 0 && (
          <div className="mb-20">
            <h3 className="font-serif text-2xl text-accent-gold mb-8 text-center">Experience</h3>
            <div className="space-y-6">
              {career.experiences.map((e, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-6 md:p-7 hover:border-accent-gold/30 transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-baseline gap-3 mb-3">
                    <div>
                      <h4 className="font-serif text-xl text-text-dark">{e.company}</h4>
                      <p className="text-accent-gold text-sm mt-1">{e.role}</p>
                    </div>
                    <div className="text-xs text-text-dark/50 text-right">
                      <p>{e.years}</p>
                      <p>{e.location}</p>
                    </div>
                  </div>
                  {e.highlights.length > 0 && (
                    <ul className="space-y-1.5 mt-3">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="text-text-dark/75 text-sm pl-4 relative">
                          <span className="absolute left-0 text-accent-gold">·</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {career.projects.length > 0 && (
          <div className="mb-20">
            <h3 className="font-serif text-2xl text-accent-gold mb-8 text-center">Standout Projects</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {career.projects.map((p, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-6 hover:border-accent-gold/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-lg text-text-dark leading-snug">{p.title}</h4>
                    <span className="text-xs text-accent-gold ml-3 whitespace-nowrap">{p.year}</span>
                  </div>
                  <p className="text-xs text-text-dark/60 mb-2">{p.client} · {p.domain}</p>
                  <p className="text-text-dark/75 text-sm leading-relaxed mb-3">{p.impact}</p>
                  <p className="text-xs text-accent-gold/80 mb-2">{p.role}</p>
                  {p.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 border border-white/10 rounded text-text-dark/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {career.skills.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl text-accent-gold mb-6 text-center">Skills</h3>
            <ul className="flex flex-wrap justify-center gap-2">
              {career.skills.map((s, i) => (
                <li
                  key={i}
                  className="text-xs px-3 py-1.5 border border-white/15 rounded-full text-text-dark/80"
                >
                  {s.name}
                  <span className="text-text-dark/40 ml-1.5">· {s.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
