import { motion, useScroll, useTransform } from "framer-motion";

// Deepest layer — Milky Way galactic band. Parallax at 0.3x scroll so it
// feels the furthest away. Built from:
//   - a slanted linear gradient acting as the diffuse band of light
//   - overlapping radial gradients acting as dense star-cloud clumps
//     along the band's axis
//   - a thin darker linear-gradient stripe simulating the galactic dust lane
// Pure CSS, no assets.
export default function MilkyWayGalaxy() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * 0.3);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        y,
        zIndex: -20,
        background: [
          // The diffuse glow of the band — 20deg tilt across the sky
          "linear-gradient(20deg, transparent 34%, rgba(255,240,215,0.05) 44%, rgba(255,245,220,0.12) 50%, rgba(255,240,215,0.05) 56%, transparent 66%)",
          // Dark dust lane cutting through the middle of the band
          "linear-gradient(20deg, transparent 47%, rgba(10,8,18,0.35) 50%, transparent 53%)",
          // Star-cloud clumps along the band axis (top-left → bottom-right)
          "radial-gradient(ellipse 24% 12% at 20% 30%, rgba(210,190,255,0.22), transparent 70%)",
          "radial-gradient(ellipse 28% 14% at 40% 45%, rgba(255,220,180,0.24), transparent 70%)",
          "radial-gradient(ellipse 22% 11% at 55% 55%, rgba(255,205,175,0.20), transparent 70%)",
          "radial-gradient(ellipse 26% 13% at 72% 68%, rgba(200,215,255,0.22), transparent 70%)",
          "radial-gradient(ellipse 24% 12% at 85% 82%, rgba(230,200,255,0.20), transparent 70%)",
          // A pale halo suggesting the galactic core density
          "radial-gradient(ellipse 40% 22% at 48% 50%, rgba(255,235,200,0.14), transparent 65%)",
        ].join(", "),
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
