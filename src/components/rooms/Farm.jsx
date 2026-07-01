import { lazy, Suspense } from "react";
import { farm } from "../../content/farm";
const EarthCanvas = lazy(() => import("../canvas/Earth"));

export default function Farm() {
  return (
    <section
      id="farm"
      className="relative text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(58,107,58,0.25), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,162,39,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the soil
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">{farm.name}</h2>
          {farm.location && (
            <p className="text-text-dark/60 text-sm mt-3">{farm.location}</p>
          )}
        </div>

        {farm.story && (
          <p className="text-text-dark/85 leading-relaxed max-w-3xl mx-auto mb-10 text-center">
            {farm.story}
          </p>
        )}

        <div className="h-72 md:h-96 mb-14 max-w-3xl mx-auto">
          <Suspense fallback={<div className="w-full h-full" />}>
            <EarthCanvas />
          </Suspense>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {farm.philosophy.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-accent-gold mb-4">Philosophy</h3>
              <ul className="space-y-2.5">
                {farm.philosophy.map((p, i) => (
                  <li key={i} className="text-text-dark/80 leading-relaxed pl-4 border-l-2 border-accent-green/60">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {farm.whatWeGrow.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-accent-gold mb-4">What we grow</h3>
              <ul className="flex flex-wrap gap-2">
                {farm.whatWeGrow.map((w, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 border border-accent-green/40 rounded-full text-sm text-text-dark/85 bg-accent-green/5"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {farm.gallery.length > 0 && (
          <div className="mb-14">
            <h3 className="font-serif text-xl text-accent-gold mb-6 text-center">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {farm.gallery.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-lg bg-black/40 aspect-square"
                >
                  <img
                    src={src}
                    alt={`${farm.name} — photo ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-6 border-t border-white/10 space-x-3">
          {farm.link && (
            <a
              href={farm.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 bg-accent-green text-text-dark rounded-full hover:bg-accent-green/90 transition-colors font-medium mb-2"
            >
              Visit Nandhavanam ↗
            </a>
          )}
          {farm.social?.facebook && (
            <a
              href={farm.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-3 border border-white/20 rounded-full text-text-dark/80 hover:text-accent-gold hover:border-accent-gold/50 transition-colors text-sm mb-2"
            >
              Facebook
            </a>
          )}
          {farm.social?.googleBusiness && (
            <a
              href={farm.social.googleBusiness}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-3 border border-white/20 rounded-full text-text-dark/80 hover:text-accent-gold hover:border-accent-gold/50 transition-colors text-sm mb-2"
            >
              Google Business
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
