import { coaching } from "../../content/coaching";
import BookCallCTA from "../shared/BookCallCTA";

export default function Coach() {
  return (
    <section
      id="coach"
      className="relative text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(201,162,39,0.12), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(58,107,58,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the coach
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Freedom Architect 1:1</h2>
        </div>

        {coaching.philosophy && (
          <p className="font-serif italic text-text-dark/90 text-lg md:text-xl text-center max-w-3xl mx-auto mb-14 leading-relaxed">
            {coaching.philosophy}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {coaching.whoIHelp.length > 0 && (
            <div>
              <h3 className="font-serif text-xl text-accent-gold mb-4">Who I help</h3>
              <ul className="space-y-3">
                {coaching.whoIHelp.map((p, i) => (
                  <li key={i} className="text-text-dark/80 leading-relaxed pl-4 border-l-2 border-accent-gold/40">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {coaching.signatureOffer.name && (
            <div className="bg-white/[0.03] border border-accent-gold/30 rounded-lg p-6">
              <p className="text-xs uppercase tracking-widest text-accent-gold mb-2">Signature offer</p>
              <h3 className="font-serif text-2xl text-text-dark mb-3">{coaching.signatureOffer.name}</h3>
              <p className="text-text-dark/60 text-sm mb-4">
                {coaching.signatureOffer.format} · {coaching.signatureOffer.duration}
              </p>
              <ul className="space-y-1.5 mb-4">
                {coaching.signatureOffer.includes.map((it, i) => (
                  <li key={i} className="text-text-dark/80 text-sm pl-4 relative leading-relaxed">
                    <span className="absolute left-0 text-accent-gold">·</span>
                    {it}
                  </li>
                ))}
              </ul>
              <p className="text-accent-gold text-sm">
                {coaching.signatureOffer.price}
              </p>
            </div>
          )}
        </div>

        {coaching.testimonials.length > 0 && (
          <div className="mb-12">
            <h3 className="font-serif text-xl text-accent-gold mb-6 text-center">Testimonials</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {coaching.testimonials.map((t, i) => (
                <figure key={i} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <blockquote className="text-text-dark/85 leading-relaxed italic">"{t.quote}"</blockquote>
                  <figcaption className="mt-3 text-sm text-text-dark/60">
                    — {t.name}, {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="text-center pt-6 border-t border-white/10">
          <BookCallCTA variant="primary" label="Book a clarity call" />
        </div>
      </div>
    </section>
  );
}
