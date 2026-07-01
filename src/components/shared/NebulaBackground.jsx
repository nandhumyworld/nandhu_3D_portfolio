import { motion, useScroll, useTransform } from "framer-motion";

// Mid-depth nebula clouds — parallax at 0.5x window scroll (so they drift
// past at half the speed of foreground content, feeling mid-distance).
// Layered radial gradients only — no assets, no blur filter (soft alpha
// stops carry the wispiness so paint stays cheap on tall pages).
export default function NebulaBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * 0.5);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        y,
        zIndex: -10,
        background: [
          "radial-gradient(ellipse 65% 40% at 15% 8%, rgba(91,58,160,0.35), rgba(91,58,160,0.08) 45%, transparent 70%)",
          "radial-gradient(ellipse 45% 30% at 88% 18%, rgba(196,77,110,0.28), rgba(196,77,110,0.06) 45%, transparent 70%)",
          "radial-gradient(ellipse 40% 25% at 20% 30%, rgba(201,162,39,0.18), rgba(201,162,39,0.04) 45%, transparent 70%)",
          "radial-gradient(ellipse 55% 35% at 55% 45%, rgba(58,107,58,0.22), rgba(58,107,58,0.05) 45%, transparent 70%)",
          "radial-gradient(ellipse 50% 35% at 90% 55%, rgba(122,77,196,0.30), rgba(122,77,196,0.06) 45%, transparent 70%)",
          "radial-gradient(ellipse 55% 40% at 10% 70%, rgba(30,58,95,0.32), rgba(30,58,95,0.07) 45%, transparent 70%)",
          "radial-gradient(ellipse 45% 30% at 50% 80%, rgba(196,77,110,0.22), rgba(196,77,110,0.05) 45%, transparent 70%)",
          "radial-gradient(ellipse 55% 40% at 85% 92%, rgba(91,58,160,0.30), rgba(91,58,160,0.06) 45%, transparent 70%)",
          "radial-gradient(ellipse 40% 30% at 20% 95%, rgba(201,162,39,0.14), rgba(201,162,39,0.03) 45%, transparent 70%)",
        ].join(", "),
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
