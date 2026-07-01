import { tribe } from "../../content/tribe";

export default function Tribe() {
  return (
    <section
      id="tribe"
      className="relative text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(58,107,58,0.15), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(201,162,39,0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the tribe
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">{tribe.name}</h2>
        </div>

        {tribe.mission && (
          <p className="font-serif italic text-text-dark/90 text-lg md:text-xl text-center max-w-3xl mx-auto mb-14 leading-relaxed">
            {tribe.mission}
          </p>
        )}

        {tribe.memberBenefits.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {tribe.memberBenefits.map((b, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 rounded-lg p-6 hover:border-accent-gold/40 transition-colors"
              >
                <h3 className="font-serif text-lg text-accent-gold mb-2">{b.title}</h3>
                <p className="text-text-dark/75 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        )}

        {tribe.events.length > 0 && (
          <div className="mb-12">
            <h3 className="font-serif text-xl text-accent-gold mb-6 text-center">Events</h3>
            <ul className="space-y-3">
              {tribe.events.map((e, i) => (
                <li key={i} className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <div className="flex justify-between items-baseline gap-3 mb-1">
                    <p className="font-serif text-text-dark">{e.name}</p>
                    <span className="text-xs text-accent-gold">{e.date}</span>
                  </div>
                  <p className="text-text-dark/70 text-sm">{e.summary}</p>
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noreferrer" className="text-xs text-accent-gold hover:underline mt-2 inline-block">
                      Details ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center pt-6 border-t border-white/10">
          {tribe.joinUrl ? (
            <a
              href={tribe.joinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-7 py-3 bg-accent-gold text-bg-dark rounded-full hover:bg-accent-gold/90 transition-colors font-medium"
            >
              Join the Tribe
            </a>
          ) : (
            <p className="text-text-dark/50 text-sm italic">Doors opening soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
