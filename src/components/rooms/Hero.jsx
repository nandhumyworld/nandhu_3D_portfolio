import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../constants/profile";
import SocialLinks from "../shared/SocialLinks";
import BookCallCTA from "../shared/BookCallCTA";

function RoleRotator({ roles }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <div className="mt-6 h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-accent-gold uppercase tracking-[0.3em] text-xs md:text-sm"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-bg-dark text-text-dark overflow-hidden"
    >
      {/* Subtle radial gradient backdrop — earthy palette */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.12), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(58,107,58,0.15), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(91,58,160,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-28 pb-20 text-center">
        {profile.avatar && (
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            src={profile.avatar}
            alt={profile.name}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border border-accent-gold/40 shadow-xl shadow-accent-gold/10 mb-6"
          />
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl tracking-tight"
        >
          {profile.name}
        </motion.h1>

        <RoleRotator roles={profile.roles} />

        {profile.essence && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-2xl text-base md:text-lg text-text-dark/80 leading-relaxed"
          >
            {profile.essence}
          </motion.p>
        )}

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-3xl italic font-serif text-accent-gold/90 text-sm md:text-base leading-relaxed border-t border-b border-accent-gold/20 py-4"
        >
          "{profile.manifesto}"
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-5 items-center"
        >
          <BookCallCTA variant="primary" />
          <SocialLinks links={profile.social} variant="dark" />
        </motion.div>

        <a
          href="#story"
          aria-label="Scroll to Story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-text-dark/50 hover:text-accent-gold transition-colors"
        >
          scroll ↓
        </a>
      </div>
    </section>
  );
}
