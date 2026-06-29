const icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.33a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.01v-4.49c0-2.4-1.28-3.51-2.99-3.51-1.38 0-2 .76-2.34 1.29v-1.1h-2.67v7.84h2.67v-4.38c0-.24.02-.47.09-.64.18-.47.61-.96 1.33-.96.94 0 1.31.7 1.31 1.74v4.24h2.6z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.84l-5.36-7-6.13 7H1.4l8.02-9.17L1 2h7l4.84 6.4L18.244 2zm-1.2 18h1.9L7.1 4H5.1l11.94 16z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.95 10.95 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.77 1.07.77 2.15v3.18c0 .31.21.67.8.56C20.21 21.42 23.5 17.1 23.5 12.02 23.5 5.66 18.35.5 12 .5z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 10c3-1 7-1 10 1M7.5 13c2.5-.8 6-.8 8.5.7M8 16c2-.6 5-.6 7 .6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  ),
};

const labels = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
  twitter: "Twitter / X",
  github: "GitHub",
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  behance: "Behance",
  dribbble: "Dribbble",
};

export default function SocialLinks({ links = [], variant = "dark" }) {
  const live = links.filter((l) => l.url && l.url.trim() !== "");
  if (live.length === 0) return null;

  const hoverColor =
    variant === "dark" ? "hover:text-accent-gold" : "hover:text-accent-indigo";
  const baseColor = variant === "dark" ? "text-text-dark/70" : "text-light-muted";

  return (
    <ul className="flex items-center gap-4">
      {live.map(({ platform, url }) => (
        <li key={platform}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={labels[platform] || platform}
            className={`${baseColor} ${hoverColor} transition-colors`}
          >
            {icons[platform] || icons.default}
          </a>
        </li>
      ))}
    </ul>
  );
}
