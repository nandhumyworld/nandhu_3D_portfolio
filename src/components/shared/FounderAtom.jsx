import { motion } from "framer-motion";

const electrons = [
  {
    name: "EyediaWorks",
    logo: "/images/brand/eyediaworks.png",
    radius: 140,
    duration: 16,
    startAngle: 0,
    bg: "bg-white",
  },
  {
    name: "Freedom Architects Tribe",
    logo: "/images/brand/freedom-architects-tribe.png",
    radius: 180,
    duration: 22,
    startAngle: 120,
    bg: "bg-bg-dark",
  },
  {
    name: "Nandhavanam Farm",
    logo: "/images/brand/nandhavanam-farm.png",
    radius: 220,
    duration: 28,
    startAngle: 240,
    bg: "bg-white",
  },
];

export default function FounderAtom() {
  const size = 520;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
      className="founder-atom relative mx-auto mb-10 flex items-center justify-center"
      style={{ width: size, maxWidth: "94vw", height: size }}
    >
      {/* Orbit rings (tilted ellipses for atom feel) */}
      <svg
        viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <ellipse cx="0" cy="0" rx="140" ry="60" fill="none" stroke="rgba(201,162,39,0.18)" strokeWidth="1" />
        <ellipse cx="0" cy="0" rx="180" ry="80" fill="none" stroke="rgba(201,162,39,0.15)" strokeWidth="1" transform="rotate(60)" />
        <ellipse cx="0" cy="0" rx="220" ry="95" fill="none" stroke="rgba(201,162,39,0.12)" strokeWidth="1" transform="rotate(120)" />
      </svg>

      {/* Nucleus — Founder portrait */}
      <div className="absolute z-20 flex flex-col items-center pointer-events-none">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent-gold/25 blur-2xl scale-125" />
          <img
            src="/images/brand/nandhu-kishore.png"
            alt="Nandhu Kishore — Founder"
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-accent-gold/70 shadow-2xl shadow-accent-gold/30 bg-bg-dark"
          />
        </div>
        <div className="mt-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-accent-gold">
          Founder
        </div>
      </div>

      {/* Electrons — circular orbits, logos stay upright */}
      {electrons.map((e, i) => (
        <div
          key={i}
          className="absolute inset-0 founder-spin pointer-events-none"
          style={{
            animationDuration: `${e.duration}s`,
            animationDelay: `${-(e.duration * e.startAngle) / 360}s`,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2"
            style={{ transform: `translate(-50%, -50%) translateX(${e.radius}px)` }}
          >
            {/* counter-rotate so logo stays flat to screen */}
            <div
              className="founder-counter flex flex-col items-center"
              style={{
                animationDuration: `${e.duration}s`,
                animationDelay: `${-(e.duration * e.startAngle) / 360}s`,
              }}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${e.bg} border border-accent-gold/50 shadow-lg shadow-black/40 flex items-center justify-center overflow-hidden`}
              >
                <img
                  src={e.logo}
                  alt={e.name}
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <div className="mt-1.5 text-center text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-text-dark/85 whitespace-nowrap">
                {e.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
