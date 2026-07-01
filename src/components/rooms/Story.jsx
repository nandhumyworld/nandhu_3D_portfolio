import { timeline, categoryColors } from "../../content/timeline";

export default function Story() {
  if (!timeline.length) return null;
  const sorted = [...timeline].sort((a, b) => a.year - b.year);

  return (
    <section
      id="story"
      className="relative text-text-dark py-24 px-6 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.10), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(58,107,58,0.10), transparent 55%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent-gold uppercase tracking-[0.3em] text-xs mb-3">
            Room · the story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Timeline</h2>
          <p className="mt-4 text-text-dark/60 text-sm max-w-xl mx-auto">
            One life. Many threads. Sorted by year.
          </p>
        </div>

        <ol className="relative border-l border-accent-gold/20 ml-3 md:ml-6 space-y-8">
          {sorted.map((item, i) => {
            const color = categoryColors[item.category] || "#888";
            return (
              <li key={i} className="pl-6 md:pl-8 relative">
                <span
                  className="absolute -left-[7px] top-2 w-3 h-3 rounded-full ring-4 ring-bg-dark"
                  style={{ background: color }}
                />
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="font-serif text-accent-gold text-lg">{item.year}</span>
                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border"
                    style={{ borderColor: `${color}66`, color }}
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="text-text-dark text-lg md:text-xl leading-snug">{item.title}</h3>
                {item.story && (
                  <p className="text-text-dark/70 text-sm mt-2 leading-relaxed">{item.story}</p>
                )}
                {item.image && (
                  <img src={item.image} alt={item.title} className="mt-3 rounded-lg max-h-56 object-cover" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
