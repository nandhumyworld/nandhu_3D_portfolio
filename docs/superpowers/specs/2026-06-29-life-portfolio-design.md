# Nandhu Kishore — Life Portfolio (V1)

**Date:** 2026-06-29
**Status:** Design approved, ready for implementation planning
**Owner:** Nandhu Kishore (nandhu.myworld@gmail.com)

---

## 1. Purpose

A personal-brand portfolio site that showcases Nandhu Kishore as a multi-passionate human — coach, founder, farmer, IT architect, artist, musician, photographer — all unified by a spiritual journey. Visitors should walk away with a vivid sense of who Nandhu is and the option to book a 30-min call or send a personal note.

**Core philosophy that anchors the site:**

> *"We are not spiritual beings on a human journey. We are human beings on a spiritual journey."*

**Primary audience:** Personal-brand visitors — prospective coaching clients, tribe members, collaborators, and anyone curious about Nandhu's work.

**Primary action:** Book an appointment (Calendly + EmailJS form).

**Secondary actions:** Explore the rooms; follow Nandhu on social.

---

## 2. Scope

### In scope (V1)

- 11 rooms on a single-page scroll site (see §4)
- Dark cinematic Hero + Seeker + Connect; light editorial interior rooms
- Persistent top nav, floating "Book a call" CTA, mobile sticky CTA
- Connect form (EmailJS → `nandhu.myworld@gmail.com`) + Calendly embed (`https://calendly.com/nandhu-myworld/30min`)
- Static content from `src/content/*.js` modules — no backend, no CMS
- A reusable `life-portfolio-interview` skill (local, under `~/.claude/skills/`) that captures content room by room across sessions
- Asset pipeline: drop images into `public/images/<room>/` with a naming convention

### Out of scope (deferred to V2+)

- Blog / writing
- Podcast section
- YouTube section
- Press / recognition section
- CMS or admin UI
- Analytics dashboards (basic Plausible/Vercel analytics later, not in V1)
- Multi-language

---

## 3. Architecture

### Stack

- **Build:** Vite 4 (existing)
- **Framework:** React 18 (existing)
- **Styling:** Tailwind CSS 3 (existing)
- **3D:** `@react-three/fiber`, `@react-three/drei`, `three` (existing — used only on Hero and selectively as accents)
- **Motion:** `framer-motion` (existing)
- **Timeline:** `react-vertical-timeline-component` (existing)
- **Email:** `@emailjs/browser` (existing)
- **Routing:** None for V1 (single page, anchor navigation)

No new heavyweight dependencies for V1.

### Visual mode (locked Q4 = D — dual-mode)

- **Hero, Seeker, Connect:** dark cinematic — warm earthy palette (forest green `#3a6b3a`, warm gold `#c9a227`, indigo accents `#5b3aa0`) on near-black background
- **Interior rooms (Story → Certifications):** light editorial — cream/off-white background, large serif headings + clean sans body, generous whitespace
- **Room dividers:** thin dark bands carrying a single spiritual one-liner each (8–10 across the page)

### Folder layout

```
src/
  constants/
    profile.js            # hero/global identity (name, roles, social, contact, calendly)
  content/
    timeline.js
    coaching.js
    tribe.js
    eyediaWorks.js
    farm.js
    human.js
    career.js
    certifications.js
    seeker.js
    dividers.js
  components/
    rooms/
      Hero.jsx
      Story.jsx
      Coach.jsx
      Tribe.jsx
      EyediaWorks.jsx
      Farm.jsx
      Human.jsx
      Career.jsx
      Certifications.jsx
      Seeker.jsx
      Connect.jsx
    shared/
      Nav.jsx
      FloatingCTA.jsx
      RoomDivider.jsx
      Gallery.jsx
      SocialLinks.jsx
      BookCallCTA.jsx
content/
  raw/                    # interview skill writes raw markdown here
    _progress.json        # interview state for resumability
public/
  images/
    profile/
    timeline/
    coach/
    tribe/
    eyediaworks/
    farm/
    human/{photography,music,arts,events}/
    career/
    certifications/
    seeker/
docs/
  superpowers/specs/2026-06-29-life-portfolio-design.md
```

---

## 4. Rooms (in scroll order)

| #  | Room                      | Anchor              | Mode                     | Purpose                                                              |
| -- | ------------------------- | ------------------- | ------------------------ | -------------------------------------------------------------------- |
| 1  | Hero                      | `#home`           | dark                     | Identity, rotating roles, manifesto quote, social, scroll cue        |
| 2  | Story & Timeline          | `#story`          | light                    | Narrative + vertical timeline of milestones across all interests     |
| 3  | The Coach                 | `#coach`          | light (gold)             | Philosophy, who I help, signature offer, testimonials, Book CTA      |
| 4  | Freedom Architects Tribe  | `#tribe`          | light                    | Mission, benefits, events, join link                                 |
| 5  | eyediaWorks               | `#eyediaworks`    | light                    | Tagline, services, case studies, link                                |
| 6  | Nandhavanam Farm          | `#farm`           | light (green)            | Story, philosophy, gallery, what we grow                             |
| 7  | The Human                 | `#human`          | light (multi-color tabs) | Photography · Music · Arts · Events sub-galleries                 |
| 8  | Career & Projects         | `#career`         | light (navy)             | 13+ yr Guidewire/IT arc → Entrepreneur turn                         |
| 9  | Certifications & Learning | `#certifications` | light                    | Cert grid (tech / marketing / coaching / other) + currently learning |
| 10 | The Seeker                | `#seeker`         | dark (indigo)            | Spiritual path, guru/lineage, practices, certifications, teachings   |
| 11 | Connect                   | `#connect`        | dark                     | Two paths: EmailJS form + Calendly embed; social + footer            |

**Hero rotating sub-roles:** Seeker · Coach · Founder · Architect · Farmer · Artist · Musician · Photographer · Lifelong Experimenter.

**Room dividers** (thin dark bands between rooms): 8–10 short spiritual one-liners captured during the interview (e.g., *"The farm is meditation in soil."*).

---

## 5. Data Model

All content lives in `src/content/*.js` as plain JS objects. Components import only what they need. Empty arrays/strings are valid — components skip empty sections gracefully so the site can launch with partial content.

### `src/constants/profile.js`

```js
export const profile = {
  name: "Nandhu Kishore",
  roles: ["Seeker", "Coach", "Founder", "Architect", "Farmer", "Artist", "Musician", "Photographer", "Lifelong Experimenter"],
  essence: "",                          // one-line who I am
  manifesto: "We are not spiritual beings on a human journey. We are human beings on a spiritual journey.",
  avatar: "/images/profile/hero.jpg",
  email: "nandhu.myworld@gmail.com",
  calendly: "https://calendly.com/nandhu-myworld/30min",
  social: [
    { platform: "linkedin",  url: "" },
    { platform: "instagram", url: "" },
    { platform: "youtube",   url: "" },
    { platform: "twitter",   url: "" },
    { platform: "github",    url: "" },
    // others added during interview
  ],
};
```

### `src/content/timeline.js`

```js
export const timeline = [
  { year: 0, title: "", category: "life", story: "", image: "" },
  // 30–60 entries spanning school → today
];

export const categoryColors = {
  life:          "#8b8b8b",
  career:        "#1e3a5f",  // navy
  coaching:      "#c9a227",  // gold
  farm:          "#3a6b3a",  // forest
  arts:          "#c44d6e",  // rose
  music:         "#7a4dc4",  // violet
  photography:   "#2a8a8a",  // teal
  event:         "#d97706",  // amber
  certification: "#555555",
  spiritual:     "#5b3aa0",  // indigo
};
```

### `src/content/coaching.js`

```js
export const coaching = {
  philosophy: "",
  whoIHelp: [],
  signatureOffer: { name: "", format: "", duration: "", includes: [], price: "" },
  testimonials: [],   // [{ name, role, quote, image }]
};
```

### `src/content/tribe.js`

```js
export const tribe = {
  name: "Freedom Architects Tribe",
  mission: "",
  memberBenefits: [],     // [{ title, description }]
  events: [],             // [{ name, date, summary, link }]
  joinUrl: "",
};
```

### `src/content/eyediaWorks.js`

```js
export const eyediaWorks = {
  tagline: "",
  description: "",
  services: [],     // [{ title, icon, description }]
  clients: [],      // [{ name, logo }]
  caseStudies: [],  // [{ title, summary, link }]
  websiteUrl: "",
};
```

### `src/content/farm.js`

```js
export const farm = {
  name: "Nandhavanam Farm",
  story: "",
  philosophy: [],
  whatWeGrow: [],
  gallery: [],          // image paths
  location: "",
  link: "",
};
```

### `src/content/human.js`

```js
export const human = {
  photography: { intro: "", gallery: [] },   // [{ src, caption, year }]
  music:       { intro: "", tracks: [] },    // [{ title, year, embedUrl, platform }]
  arts:        { intro: "", gallery: [] },   // [{ src, caption, year, medium }]
  events:      { intro: "", items: [] },     // [{ name, year, role, image, link }]
};
```

### `src/content/career.js`

```js
export const career = {
  summary: "",   // includes the 13+ yr Guidewire arc and entrepreneur pivot
  experiences: [],  // [{ company, role, years, location, highlights, logo }]
  projects: [],     // [{ title, client, domain, role, impact, tech, year }]
  skills: [],       // [{ name, category: "language|framework|tool|domain" }]
};
```

### `src/content/certifications.js`

```js
export const certifications = [];   // [{ name, issuer, year, category, credentialUrl, logo }]
export const currentlyLearning = [];
```

### `src/content/seeker.js`

```js
export const seeker = {
  coreQuote: "We are not spiritual beings on a human journey. We are human beings on a spiritual journey.",
  path: "",
  guruLineage: "",
  practices: [],
  certifications: [],   // [{ name, lineage, year }]
  teachings: [],
  offerings: "",
};
```

### `src/content/dividers.js`

```js
export const dividers = [];   // 8–10 short lines that appear between rooms
```

---

## 6. Booking & Contact (`#connect`)

### Layout

Two paths side by side (stacked on mobile):

- **Left:** EmailJS form (qualified lead capture)
- **Right:** Calendly inline embed → `https://calendly.com/nandhu-myworld/30min`

### Form fields

| Field                           | Type                        | Required      |
| ------------------------------- | --------------------------- | ------------- |
| Name                            | text                        | yes           |
| Email                           | email (regex check)         | yes           |
| Phone                           | tel                         | no            |
| About yourself                  | textarea                    | yes           |
| Have we met before?             | radio (Yes/No)              | no            |
| Where did we meet?              | text — shown only if "Yes" | conditional   |
| What do you want to talk about? | textarea (min 10 chars)     | yes           |
| `website` (honeypot, hidden)  | text                        | — (bot trap) |

### EmailJS wiring

- Library already installed: `@emailjs/browser`
- Vite env vars (no values committed):
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- `.env.example` committed listing the var names + setup notes
- `.env` in `.gitignore`
- Recipient: `nandhu.myworld@gmail.com`

### EmailJS template variables sent

```
from_name, from_email, from_phone,
about_self, met_before, met_where,
message, sent_at (ISO), source ("Portfolio Connect Form")
```

### Form UX states

- `idle` — Send enabled
- `submitting` — spinner, button disabled
- `success` — message replaces form:
  - If `met_before === "Yes"`: *"Good to reconnect. I'll write back personally within 48 hours. — Nandhu"*
  - Else: *"Thanks for reaching out. I'll write back personally within 48 hours. — Nandhu"*
- `error` — inline: *"Couldn't send. Email me directly at nandhu.myworld@gmail.com"* with mailto link

### Calendly embed

- Inline `<div data-url>` widget with the official Calendly script lazy-loaded on first scroll into `#connect`
- Fallback button: "Open Calendly in a new tab" (in case embed fails)

### Persistent CTAs

- Top nav "Book a call" button (gold) — anchors to `#connect`
- Floating "Book a call" pill — appears after scrolling past hero, dismissible
- Mobile: sticky bottom bar with the same CTA

---

## 7. Content Capture — `life-portfolio-interview` Skill

Built via `skill-creator`. Lives at `~/.claude/skills/life-portfolio-interview/` (local, reusable). Not committed to the portfolio repo.

### Mode (locked Q5 = A + iii)

For each room, three phases:

1. **Phase 1 — Bullets dump:** skill posts one message with all prompts for the room; user replies free-form
2. **Phase 2 — Deepening:** skill asks 3–6 targeted follow-ups based on weak-spot heuristics (vague, generic, no specifics, missing emotional hook)
3. **Phase 3 — Persist & confirm:** writes raw answers to `content/raw/<room>.md` and structured content to `src/content/<room>.js`; shows result for edits

### Interview order (locked — one room per session)

1. Identity / Hero
2. The Seeker
3. Timeline / Story
4. The Human (photography · music · arts · events)
5. Career & Projects
6. The Coach
7. Freedom Architects Tribe
8. eyediaWorks
9. Nandhavanam Farm
10. Certifications & Learning
11. Dividers (8–10 spiritual one-liners)

### Skill layout

```
~/.claude/skills/life-portfolio-interview/
  SKILL.md
  rooms/
    01-hero.md
    02-seeker.md
    03-timeline.md
    04-human.md
    05-career.md
    06-coach.md
    07-tribe.md
    08-eyediaworks.md
    09-farm.md
    10-certifications.md
    11-dividers.md
  references/
    weak-spot-heuristics.md
    data-shapes.md
    asset-naming.md
```

### Resumability

- `content/raw/_progress.json` tracks: rooms completed, current room, last activity timestamp
- On invocation, skill reads progress and resumes at the next pending room (or accepts an explicit room name)

### Asset handling

- User drops images into `public/images/<room>/`
- Naming: `<room>-<kebab-name>-<year>.ext` (e.g., `photography-mountain-temple-2019.jpg`)
- Skill records filename references in JS content modules; never moves or renames user files

---

## 8. Component Conventions

- One component per room under `src/components/rooms/`
- Each room imports its own content file from `src/content/`
- Empty content → component renders nothing (clean partial-launch)
- Tailwind classes only; no CSS-in-JS additions
- Framer Motion variants live alongside the component that uses them
- 3D content (`@react-three/fiber`) limited to Hero and one optional accent (kept off interior rooms for performance and clarity)

---

## 9. Build, Run, Deploy

- `npm run dev` — local dev (Vite)
- `npm run build` — static build, output to `dist/`
- Deployment target: any static host (Vercel/Netlify/Cloudflare Pages). No backend.
- Env vars set in the host dashboard for EmailJS keys.

---

## 10. Success Criteria

V1 ships when:

1. All 11 rooms render with real captured content (no lorem ipsum)
2. Hero shows rotating roles + manifesto quote + working social links
3. Timeline shows ≥ 20 milestones across at least 5 categories including `spiritual`
4. Coach, Tribe, eyediaWorks, Farm, Seeker rooms each have ≥ 1 paragraph + relevant assets
5. The Human has ≥ 6 photography images, ≥ 1 music embed, ≥ 1 art image, ≥ 1 event card
6. Career shows the Guidewire arc and ≥ 3 projects
7. Certifications grid lists all certs categorized
8. 8–10 dividers thread between rooms
9. Connect form submits via EmailJS to `nandhu.myworld@gmail.com` with all fields including `about_self` and `met_before` / `met_where`
10. Calendly embed renders and links to `https://calendly.com/nandhu-myworld/30min`
11. Site is responsive (mobile, tablet, desktop) and Lighthouse Performance ≥ 80 on desktop

---

## 11. Open Items / Risks

- **EmailJS account setup:** user must create the service, template, and public key, then populate `.env`. Spec assumes user owns this.
- **Calendly account:** assumed already created (`nandhu-myworld/30min` link provided).
- **Asset availability:** photography, music embeds, art, event photos, certification logos must be sourced from user during/after interview.
- **Guru lineage disclosure:** user's call during the Seeker interview whether to name the lineage publicly.
- **Hero 3D scene:** the existing template scene will be recolored; whether to replace with a new symbolic object (e.g., tree, abstract form) is deferred to implementation review.

---

## 12. Approvals

- Section 1 (Architecture): approved 2026-06-29
- Section 2 (Rooms): approved 2026-06-29
- Section 3 (Data model): approved 2026-06-29 (after Seeker layer added)
- Section 4 (Booking + form additions): approved 2026-06-29
- Section 5 (Interview skill): approved 2026-06-29
