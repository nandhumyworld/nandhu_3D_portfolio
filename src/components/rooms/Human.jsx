import { useState } from "react";
import { human } from "../../content/human";
import Gallery from "../shared/Gallery";

const TABS = [
  { id: "photography", label: "Photography" },
  { id: "music", label: "Music" },
  { id: "arts", label: "Arts" },
  { id: "events", label: "Events" },
];

export default function Human() {
  const [tab, setTab] = useState("photography");
  const section = human[tab];

  return (
    <section
      id="human"
      className="relative bg-bg-dark text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(196,77,110,0.12), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(122,77,196,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the artist within
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">The Human</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all border ${
                tab === t.id
                  ? "bg-accent-gold/20 border-accent-gold/60 text-accent-gold"
                  : "border-white/10 text-text-dark/70 hover:border-accent-gold/40 hover:text-accent-gold"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {section.intro && (
          <p className="font-serif italic text-text-dark/85 text-lg md:text-xl text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            {section.intro}
          </p>
        )}

        {tab === "photography" && (
          <Gallery items={section.gallery} columns={3} />
        )}

        {tab === "music" && (
          section.tracks.length === 0 ? (
            <p className="text-center text-text-dark/50 italic">Tracks coming soon.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-6">
              {section.tracks.map((t, i) => (
                <li key={i} className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden">
                  <iframe
                    src={t.embedUrl}
                    title={t.title}
                    className="w-full aspect-video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                  <div className="px-4 py-3">
                    <p className="text-text-dark/90">{t.title}</p>
                    <p className="text-xs text-text-dark/50">{t.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}

        {tab === "arts" && (
          section.gallery.length === 0 ? (
            <p className="text-center text-text-dark/50 italic">Pieces coming soon.</p>
          ) : (
            <Gallery items={section.gallery} columns={3} />
          )
        )}

        {tab === "events" && (
          section.items.length === 0 ? (
            <p className="text-center text-text-dark/50 italic">Events coming soon.</p>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((e, i) => (
                <li key={i} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <p className="font-serif text-lg">{e.name}</p>
                  <p className="text-xs text-text-dark/50 mt-1">{e.year} · {e.role}</p>
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noreferrer" className="text-xs text-accent-gold hover:underline mt-2 inline-block">
                      Visit ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
