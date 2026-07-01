export default function RoomDivider({ line }) {
  if (!line) return null;
  return (
    <div className="relative py-10 px-6 text-center">
      <p className="font-serif italic text-accent-gold/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        {line}
      </p>
    </div>
  );
}
