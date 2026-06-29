# Life Portfolio V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, scrollable 11-room personal-brand portfolio for Nandhu Kishore that captures his entire life journey (school → today) across photography, music, arts, IT career, entrepreneurship, farm, coaching, and the spiritual journey that anchors them all — with an EmailJS lead form + Calendly booking flow as the primary CTA.

**Architecture:** Static React + Vite single-page site. Content lives in `src/content/*.js` modules (no backend). A local Claude skill (`life-portfolio-interview`) drives room-by-room content capture across resumable sessions. Each room is one self-contained component. Hero/Seeker/Connect use the existing dark cinematic 3D style; interior rooms switch to light editorial.

**Tech Stack:** Vite 4, React 18, Tailwind 3, `@react-three/fiber` + `drei` + `three` (existing — hero only), `framer-motion`, `react-vertical-timeline-component`, `@emailjs/browser`. No new heavy dependencies.

## Global Constraints

- Spec source of truth: `docs/superpowers/specs/2026-06-29-life-portfolio-design.md`
- Recipient email (form): `nandhu.myworld@gmail.com`
- Calendly URL: `https://calendly.com/nandhu-myworld/30min`
- Core manifesto (must appear in Hero and Connect, verbatim): *"We are not spiritual beings on a human journey. We are human beings on a spiritual journey."*
- Hero rotating sub-roles (verbatim, in order): `Seeker · Coach · Founder · Architect · Farmer · Artist · Musician · Photographer · Lifelong Experimenter`
- Spiritual color: indigo `#5b3aa0`
- Earthy palette (hero/seeker/connect): forest green `#3a6b3a`, warm gold `#c9a227`, indigo `#5b3aa0`, near-black background
- Interior rooms (rooms 2–9): cream/off-white background, light editorial style
- Empty content arrays/strings must render gracefully (no broken sections) — supports partial-content launches
- One room per interview session (user preference)
- No backend; no CMS; no analytics in V1
- Image naming: `<room>-<kebab-name>-<year>.<ext>` under `public/images/<room>/`
- EmailJS env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (committed only as `.env.example`)
- "Tests" in this plan = (a) `npm run build` succeeds, (b) `npm run dev` renders the room without console errors, (c) the captured content appears as written. Unit tests are not added for static UI in V1 (YAGNI).

---

## File Structure

**Created in this plan:**

```
~/.claude/skills/life-portfolio-interview/      # local, outside repo
  SKILL.md
  rooms/{01-hero..11-dividers}.md
  references/{weak-spot-heuristics,data-shapes,asset-naming}.md

src/
  constants/profile.js                          # hero/global identity
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
    theme.js                                    # palette + categoryColors
  components/
    rooms/{Hero,Story,Coach,Tribe,EyediaWorks,Farm,Human,Career,Certifications,Seeker,Connect}.jsx
    shared/{Nav,FloatingCTA,RoomDivider,Gallery,SocialLinks,BookCallCTA}.jsx
content/raw/                                    # interview writes here
  _progress.json
public/images/{profile,timeline,coach,tribe,eyediaworks,farm,career,certifications,seeker}/
public/images/human/{photography,music,arts,events}/
.env.example
```

**Modified in this plan:**
- `src/App.jsx` — replace existing structure with new room composition
- `src/constants/index.js` — kept for legacy assets; new content lives in `src/content/`
- `tailwind.config.cjs` — extend theme colors
- `index.html` — title + meta description
- `.gitignore` — confirm `.env` ignored

**Sequencing logic:** Tasks 1–3 = foundation (skill + scaffolding + shared components). Tasks 4–14 = one room each (interview → implement → verify → commit). Tasks 15–17 = polish, EmailJS wiring verification, build & deploy prep.

---

## Task 1: Build the `life-portfolio-interview` Claude skill

**Files:**
- Create: `C:\Users\NANDHU\.claude\skills\life-portfolio-interview\SKILL.md`
- Create: `C:\Users\NANDHU\.claude\skills\life-portfolio-interview\rooms\01-hero.md` through `11-dividers.md`
- Create: `C:\Users\NANDHU\.claude\skills\life-portfolio-interview\references\weak-spot-heuristics.md`
- Create: `C:\Users\NANDHU\.claude\skills\life-portfolio-interview\references\data-shapes.md`
- Create: `C:\Users\NANDHU\.claude\skills\life-portfolio-interview\references\asset-naming.md`
- Create (in this repo): `content/raw/_progress.json` initialized with `{ "completed": [], "current": "01-hero" }`

**Interfaces:**
- Consumes: spec at `docs/superpowers/specs/2026-06-29-life-portfolio-design.md` (data shapes)
- Produces: skill writes raw answers to `content/raw/<room>.md` and updates `src/content/<room>.js` / `src/constants/profile.js` matching the data shapes

- [ ] **Step 1: Invoke skill-creator to scaffold the skill**

Run the skill-creator skill with this brief: build `life-portfolio-interview`. Description: "Interview Nandhu Kishore room-by-room to capture life portfolio content. Triggered by 'continue the interview', 'capture my [room]', or '/life-portfolio-interview'."

- [ ] **Step 2: Author SKILL.md orchestration**

`SKILL.md` must contain:
- YAML frontmatter with `name`, `description`, `metadata.type: portfolio-interview`
- Three-phase loop (Bullets → Deepening → Persist) described concretely
- Reads `content/raw/_progress.json` to pick the next room, or accepts an explicit room name argument
- Loads the matching `rooms/<NN-name>.md` prompt file when entering a room
- After Phase 3, updates `_progress.json` and asks: "Continue to next room or stop here?"

- [ ] **Step 3: Author one prompt file per room**

Each `rooms/<NN-name>.md` contains:
1. Room context (what we're capturing and why)
2. Phase 1 prompts — the full bullet-dump checklist (matches the data shape in §5 of the spec)
3. Phase 2 weak-spot heuristics (per-room — e.g., for Hero: "if essence is generic adjectives, ask for a specific moment that captures the person")
4. Phase 3 persistence target — exact path to write to in `src/content/` and `content/raw/`

Use the data shapes from `references/data-shapes.md` (Step 4) to keep field names exact.

Hero (`01-hero.md`) prompts must request: pronunciation of name, essence line (1 sentence), social URLs (LinkedIn, Instagram, YouTube, Twitter/X, GitHub, others), avatar/hero photo filename.

Seeker (`02-seeker.md`) prompts must request: spiritual path narrative (1-2 paragraphs), guru/lineage (or "decline to share"), practices, certifications with year and lineage, teachings (3-5 short principles), offerings.

Timeline (`03-timeline.md`) prompts must request: year-by-year milestones — school years, college, first job, certifications, photography journey start, music journey start, art works, farm purchase, eyediaWorks founding, tribe founding, coaching path start, spiritual milestones. Each milestone needs year + category + 1-line story + optional photo path.

The Human (`04-human.md`): photography intro + images, music tracks/embeds, art pieces, event highlights.

Career (`05-career.md`): summary, experiences (company/role/years/location/highlights), projects (title/client/domain/role/impact/tech/year), skills.

Coach (`06-coach.md`): philosophy, who I help, signature offer (name/format/duration/includes/price), testimonials.

Tribe (`07-tribe.md`): mission, member benefits, events, join URL.

eyediaWorks (`08-eyediaworks.md`): tagline, description, services, clients, case studies, website URL.

Farm (`09-farm.md`): story, philosophy bullets, what we grow, gallery filenames, location, link.

Certifications (`10-certifications.md`): full list with name/issuer/year/category/credentialUrl/logo + currently learning items.

Dividers (`11-dividers.md`): 8–10 short spiritual one-liners between rooms.

- [ ] **Step 4: Author reference files**

`references/data-shapes.md` — copy the exact JS shapes from spec §5 verbatim so the skill never invents field names.

`references/weak-spot-heuristics.md`:
```
A bullet is "weak" if it matches any of:
- Uses generic adjectives (passionate, innovative, dynamic, driven) with no concrete object
- ≤ 4 words total
- Lists a role without an associated story, year, or outcome
- Contains placeholder phrases (someday, eventually, planning to)
- Repeats marketing language found elsewhere in the same room
When a bullet is weak, ask exactly one follow-up that requests a specific
moment, place, year, or outcome that anchors it.
```

`references/asset-naming.md`:
```
Drop images under public/images/<room>/.
Filename convention: <room>-<kebab-name>-<year>.<ext>
Examples:
  public/images/photography/photography-mountain-temple-2019.jpg
  public/images/farm/farm-first-harvest-2022.jpg
The skill records the relative path (e.g. "/images/farm/farm-first-harvest-2022.jpg")
into the matching content file. It never moves or renames files the user dropped.
```

- [ ] **Step 5: Initialize progress file in repo**

Create `content/raw/_progress.json`:
```json
{
  "completed": [],
  "current": "01-hero",
  "rooms": ["01-hero","02-seeker","03-timeline","04-human","05-career","06-coach","07-tribe","08-eyediaworks","09-farm","10-certifications","11-dividers"],
  "lastUpdated": null
}
```

- [ ] **Step 6: Verify skill loads**

Run: in a new Claude Code message, type `/life-portfolio-interview` (or trigger phrase).
Expected: skill activates and prompts to begin Hero room (Phase 1 prompts shown).

- [ ] **Step 7: Commit**

```bash
git add content/raw/_progress.json
git commit -m "chore: initialize life-portfolio interview progress tracker"
```

(The skill itself lives in `~/.claude/skills/` and is not committed to this repo.)

---

## Task 2: Theme tokens, content scaffolding, app shell

**Files:**
- Create: `src/content/theme.js`
- Create: `src/content/{timeline,coaching,tribe,eyediaWorks,farm,human,career,certifications,seeker,dividers}.js` (empty shapes from spec §5)
- Create: `src/constants/profile.js`
- Modify: `tailwind.config.cjs` — extend theme colors
- Modify: `src/App.jsx` — empty room shell (renders only Nav + Hero placeholder + Connect placeholder)
- Modify: `index.html` — title + meta
- Modify: `.gitignore` — ensure `.env` ignored
- Create: `.env.example`

**Interfaces:**
- Produces: `theme.tokens`, `theme.categoryColors`, all `src/content/*` empty exports matching spec §5 shapes, `profile` object from spec §5

- [ ] **Step 1: Create theme tokens**

`src/content/theme.js`:
```js
export const tokens = {
  dark: {
    bg: "#0b0d0c",
    text: "#e8e6e1",
    accentGreen: "#3a6b3a",
    accentGold: "#c9a227",
    accentIndigo: "#5b3aa0",
  },
  light: {
    bg: "#faf7f0",
    text: "#1a1a1a",
    muted: "#6b6b6b",
    border: "#e6e1d3",
  },
};

export const categoryColors = {
  life:          "#8b8b8b",
  career:        "#1e3a5f",
  coaching:      "#c9a227",
  farm:          "#3a6b3a",
  arts:          "#c44d6e",
  music:         "#7a4dc4",
  photography:   "#2a8a8a",
  event:         "#d97706",
  certification: "#555555",
  spiritual:     "#5b3aa0",
};
```

- [ ] **Step 2: Extend Tailwind config**

In `tailwind.config.cjs`, extend `theme.extend.colors` with: `bg-dark: '#0b0d0c'`, `text-dark: '#e8e6e1'`, `bg-cream: '#faf7f0'`, `accent-green: '#3a6b3a'`, `accent-gold: '#c9a227'`, `accent-indigo: '#5b3aa0'`, `category-*` matching `categoryColors`. Add `fontFamily.serif` (`'Fraunces', serif`) and `fontFamily.sans` keep existing.

- [ ] **Step 3: Create `src/constants/profile.js`**

```js
export const profile = {
  name: "Nandhu Kishore",
  roles: ["Seeker", "Coach", "Founder", "Architect", "Farmer", "Artist", "Musician", "Photographer", "Lifelong Experimenter"],
  essence: "",
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
  ],
};
```

- [ ] **Step 4: Create all empty content modules**

For each file, paste the exact shape from spec §5 with empty defaults. Example `src/content/coaching.js`:
```js
export const coaching = {
  philosophy: "",
  whoIHelp: [],
  signatureOffer: { name: "", format: "", duration: "", includes: [], price: "" },
  testimonials: [],
};
```
Repeat for `tribe.js`, `eyediaWorks.js`, `farm.js`, `human.js`, `career.js`, `certifications.js`, `seeker.js`, `dividers.js`, `timeline.js` (with `timeline = []` and re-export `categoryColors` from `./theme`).

- [ ] **Step 5: `.env.example` and `.gitignore`**

Create `.env.example`:
```
# EmailJS — get values at https://dashboard.emailjs.com/admin
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```
In `.gitignore`, confirm `.env` line exists (add if missing).

- [ ] **Step 6: App shell with placeholder rooms**

Modify `src/App.jsx` to render only: `<Nav />` (placeholder div), a Hero placeholder section showing `profile.name` + `profile.manifesto`, and a Connect placeholder section. No 3D yet. This proves wiring works.

- [ ] **Step 7: Update index.html**

`<title>Nandhu Kishore — Seeker · Coach · Founder · Lifelong Experimenter</title>`
`<meta name="description" content="Personal portfolio of Nandhu Kishore — multi-passionate human exploring coaching, building, farming, the arts, and the spiritual path.">`

- [ ] **Step 8: Verify dev server**

Run: `npm run dev`
Expected: page loads at `http://localhost:5173`, shows name + manifesto, no console errors.

Run: `npm run build`
Expected: build succeeds, `dist/` produced.

- [ ] **Step 9: Commit**

```bash
git add src/content src/constants/profile.js tailwind.config.cjs src/App.jsx index.html .env.example .gitignore
git commit -m "feat: scaffold content modules, theme tokens, app shell"
```

---

## Task 3: Shared components

**Files:**
- Create: `src/components/shared/{Nav,FloatingCTA,RoomDivider,Gallery,SocialLinks,BookCallCTA}.jsx`

**Interfaces:**
- Produces:
  - `<Nav />` — sticky top, anchors to `#home #story #coach #tribe #eyediaworks #farm #human #career #certifications #seeker #connect`, gold "Book a call" button on right linking to `#connect`. Mobile: hamburger menu.
  - `<FloatingCTA />` — fixed pill appearing after scroll past hero (uses `IntersectionObserver` watching `#home`), dismissible (state lives in component), links to `#connect`.
  - `<RoomDivider line={string} />` — thin dark band (~80px height), centered serif italic text in `accent-gold`.
  - `<Gallery items={Array<{src,caption?}>} columns={number} />` — responsive masonry/grid, lightbox on click (use simple modal state, no library), renders nothing if `items.length === 0`.
  - `<SocialLinks links={profile.social} variant="dark"|"light" />` — inline SVG icons (linkedin, instagram, youtube, twitter, github, generic). Skips entries with empty `url`.
  - `<BookCallCTA variant="primary"|"ghost" />` — button linking to `#connect`.

- [ ] **Step 1: Inline SVG icon set**

In `SocialLinks.jsx`, define a `const icons = { linkedin: <svg>..., instagram: ..., youtube: ..., twitter: ..., github: ..., default: ... }` map. Use 24px viewBox icons. No new icon library.

- [ ] **Step 2: Implement each component**

Each component is < 100 lines. Tailwind classes only. Framer Motion only where it earns attention (FloatingCTA entrance, Nav scroll shadow).

- [ ] **Step 3: Mount Nav + FloatingCTA in `App.jsx`**

Replace the placeholder Nav div with `<Nav />`. Add `<FloatingCTA />` at top level (renders fixed, position handled by component).

- [ ] **Step 4: Verify in dev**

Run: `npm run dev`
Expected:
- Sticky nav visible at top with anchor links + gold "Book a call" button
- Mobile: hamburger collapses links
- Scroll past hero → FloatingCTA pill fades in bottom-right
- Click pill X → it dismisses for the session

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared src/App.jsx
git commit -m "feat: shared Nav, FloatingCTA, Gallery, SocialLinks, RoomDivider, BookCallCTA"
```

---

## Task 4: Hero room — interview + implement

**Files:**
- Modify (via skill): `src/constants/profile.js`
- Modify (via skill): `content/raw/01-hero.md` (created)
- Create: `src/components/rooms/Hero.jsx`
- Modify: `src/App.jsx` — replace Hero placeholder with `<Hero />`

**Interfaces:**
- Consumes: `profile` from `src/constants/profile.js`, `SocialLinks`, `BookCallCTA` from `src/components/shared/`
- Produces: full-height dark cinematic Hero section anchored at `#home`

- [ ] **Step 1: Run Hero interview**

Trigger the `life-portfolio-interview` skill (`/life-portfolio-interview` or "continue the interview"). Skill enters Phase 1 for `01-hero`. User responds with bullets. Skill enters Phase 2 follow-ups. Skill writes:
- `content/raw/01-hero.md` (raw answers)
- `src/constants/profile.js` (filled `essence`, all `social.url` values, `avatar` path)
- Updates `content/raw/_progress.json` to mark `01-hero` complete, advance `current` to `02-seeker`

- [ ] **Step 2: Drop hero photo (user action)**

Drop hero avatar at `public/images/profile/hero.jpg` (filename matches `profile.avatar`).

- [ ] **Step 3: Implement `Hero.jsx`**

```jsx
import { motion } from "framer-motion";
import { profile } from "../../constants/profile";
import SocialLinks from "../shared/SocialLinks";
import BookCallCTA from "../shared/BookCallCTA";

const ROLES = profile.roles;

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-bg-dark text-text-dark overflow-hidden">
      {/* Existing 3D scene retained for now; recolor pass deferred to polish task */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl tracking-tight"
        >
          {profile.name}
        </motion.h1>

        <RoleRotator roles={ROLES} />

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-text-dark/80">
          {profile.essence}
        </p>

        <blockquote className="mt-10 max-w-3xl italic text-accent-gold text-base md:text-lg leading-relaxed">
          "{profile.manifesto}"
        </blockquote>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <BookCallCTA variant="primary" />
          <SocialLinks links={profile.social} variant="dark" />
        </div>

        <a href="#story" className="absolute bottom-8 text-sm opacity-60 hover:opacity-100">
          scroll ↓
        </a>
      </div>
    </section>
  );
}

function RoleRotator({ roles }) {
  // Cycles roles every 2.2s with framer-motion AnimatePresence fade
  // Implementation: useState index + setInterval in useEffect
  // ... (full code in the actual file)
}
```

Full `RoleRotator` cycles through `roles` array on a 2.2s interval, using `AnimatePresence` from `framer-motion` for fade transitions.

- [ ] **Step 4: Mount in `App.jsx`**

Replace the placeholder hero with `<Hero />` import + usage.

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected:
- `#home` section fills viewport
- Name renders in serif
- Sub-roles cycle through all 9 entries
- Essence line and manifesto quote visible
- Hero photo visible (if dropped) or graceful broken-image placeholder
- "Book a call" + social icons present
- Scroll cue at bottom; clicking it scrolls to `#story` (which is still empty for now)
- No console errors

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/constants/profile.js content/raw/01-hero.md content/raw/_progress.json public/images/profile/hero.jpg src/components/rooms/Hero.jsx src/App.jsx
git commit -m "feat(hero): capture Hero content and render Hero room"
```

---

## Task 5: Seeker room — interview + implement

**Files:**
- Modify (via skill): `src/content/seeker.js`
- Modify (via skill): `content/raw/02-seeker.md`
- Create: `src/components/rooms/Seeker.jsx`
- Modify: `src/App.jsx` — mount `<Seeker />` between Certifications and Connect placeholders

**Interfaces:**
- Consumes: `seeker` from `src/content/seeker.js`
- Produces: dark indigo-accented section anchored at `#seeker`, placed just before `#connect`

- [ ] **Step 1: Run Seeker interview** via skill. Skill fills `src/content/seeker.js` (path, guruLineage if shared, practices[], certifications[], teachings[], offerings) and writes raw to `content/raw/02-seeker.md`. Advance progress to `03-timeline`.

- [ ] **Step 2: Implement `Seeker.jsx`**

Layout:
- Background: `bg-bg-dark`, indigo accent borders/headings (`text-accent-indigo`)
- Headline: serif "The Seeker"
- Large pulled quote: `seeker.coreQuote` in `text-accent-gold`
- Two-column section (stacks on mobile): left = `path` narrative + `guruLineage`; right = `practices` list
- Below: certifications list (name · lineage · year)
- Below: `teachings` shown as 3-5 short principle cards
- If `offerings` non-empty, a small "What I share in this space" block at the bottom with a `BookCallCTA variant="ghost"`
- Each empty field renders nothing (no "(empty)" placeholders)

- [ ] **Step 3: Mount in `App.jsx`** between Certifications and Connect.

- [ ] **Step 4: Verify** — `npm run dev` shows section renders, scroll anchor `#seeker` works, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/content/seeker.js content/raw/02-seeker.md content/raw/_progress.json src/components/rooms/Seeker.jsx src/App.jsx
git commit -m "feat(seeker): capture Seeker content and render Seeker room"
```

---

## Task 6: Story & Timeline room — interview + implement

**Files:**
- Modify (via skill): `src/content/timeline.js`
- Modify (via skill): `content/raw/03-timeline.md`
- Create: `src/components/rooms/Story.jsx`
- Modify: `src/App.jsx` — mount `<Story />` between Hero and the next room

**Interfaces:**
- Consumes: `timeline` array + `categoryColors` from `src/content/timeline.js`
- Produces: light editorial section anchored at `#story` using `react-vertical-timeline-component`

- [ ] **Step 1: Run Timeline interview** — this is the heaviest room. Skill walks user through year-by-year milestones across categories: life, photography (start year), music, arts, IT career (each role), entrepreneurship (farm purchase, eyediaWorks, tribe), coaching, spiritual (initiation, retreats, certifications). Skill writes `src/content/timeline.js` with milestone array and `content/raw/03-timeline.md`. Advance progress.

- [ ] **Step 2: Implement `Story.jsx`**

```jsx
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { timeline, categoryColors } from "../../content/timeline";

export default function Story() {
  if (!timeline.length) return null;
  return (
    <section id="story" className="bg-bg-cream text-light-text py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl mb-4">The Journey</h2>
        <p className="text-light-muted mb-12 max-w-2xl">
          Milestones across many parallel paths — each color a different facet of the same person.
        </p>
        <VerticalTimeline lineColor="#d6cdb5">
          {timeline.map((m, i) => (
            <VerticalTimelineElement
              key={i}
              date={String(m.year)}
              iconStyle={{ background: categoryColors[m.category] || "#888", color: "#fff" }}
              contentStyle={{ background: "#fff", borderTop: `4px solid ${categoryColors[m.category] || "#888"}` }}
            >
              <h3 className="font-serif text-xl">{m.title}</h3>
              {m.story && <p className="mt-2 text-sm leading-relaxed">{m.story}</p>}
              {m.image && <img src={m.image} alt={m.title} className="mt-3 rounded" />}
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount** between `<Hero />` and the next room placeholder in `App.jsx`.

- [ ] **Step 4: Verify** — at least 20 milestones across ≥ 5 categories visible (success criterion §10.3), category colors distinct, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/content/timeline.js content/raw/03-timeline.md content/raw/_progress.json src/components/rooms/Story.jsx src/App.jsx
git commit -m "feat(story): capture timeline milestones and render Story room"
```

---

## Task 7: The Human room — interview + implement

**Files:**
- Modify (via skill): `src/content/human.js`
- Modify (via skill): `content/raw/04-human.md`
- Create: `src/components/rooms/Human.jsx`

**Interfaces:**
- Consumes: `human` from `src/content/human.js`, `Gallery` from shared
- Produces: section anchored at `#human` with 4 tabs (Photography · Music · Arts · Events)

- [ ] **Step 1: Run interview** for `04-human` — collect intros + galleries + music embeds + event cards. Skill writes shapes per spec §5. User drops images into `public/images/human/{photography,arts,events}/`.

- [ ] **Step 2: Implement `Human.jsx`**

- Tab state via `useState` (no router)
- Each tab renders only if its underlying array is non-empty; tabs with no content are hidden from the tab bar
- Photography tab → `<Gallery items={human.photography.gallery} columns={3} />`
- Music tab → list of `<iframe>` embeds based on `track.platform` ('youtube' | 'spotify' | 'sc')
- Arts tab → `<Gallery>` with `caption` showing `medium · year`
- Events tab → card grid (image + name + year + role + optional link)
- Light editorial background; tab underlines use category color from `categoryColors`

- [ ] **Step 3: Mount** in `App.jsx` after Farm placeholder slot (per spec §4 order: ...Farm → Human → Career...).

- [ ] **Step 4: Verify** — success criterion §10.5: ≥ 6 photography, ≥ 1 music embed, ≥ 1 art, ≥ 1 event. Lightbox opens/closes. Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/content/human.js content/raw/04-human.md content/raw/_progress.json public/images/human src/components/rooms/Human.jsx src/App.jsx
git commit -m "feat(human): capture multi-passionate content and render Human room"
```

---

## Task 8: Career & Projects room — interview + implement

**Files:**
- Modify (via skill): `src/content/career.js`, `content/raw/05-career.md`
- Create: `src/components/rooms/Career.jsx`

**Interfaces:**
- Consumes: `career` from `src/content/career.js`
- Produces: light section anchored at `#career` with navy accent (`#1e3a5f`)

- [ ] **Step 1: Run interview** — capture the IT arc (developer → tech lead → architect) and the entrepreneur turn. Use the existing `bio/NandhuKishore_Guidewire_13PlusYears.docx` as reference if helpful (skill can ask user to paste relevant lines).

- [ ] **Step 2: Implement `Career.jsx`**

- Summary paragraph at top in serif italic
- "Experience" subsection — vertical list of role cards (`company · role · years · location` + `highlights[]` bullets + optional logo). If `logo` empty, render a colored initial circle.
- "Projects" subsection — card grid (3 per row desktop, 1 mobile): `title`, small text `client · domain · year`, `role`, `impact`, tech badges row.
- "Skills" row — pill badges grouped by `category`.
- Navy accent on headings and card borders.

- [ ] **Step 3: Mount** in `App.jsx` after Human, before Certifications.

- [ ] **Step 4: Verify** — Guidewire arc + ≥ 3 projects visible (criterion §10.6). Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/content/career.js content/raw/05-career.md content/raw/_progress.json src/components/rooms/Career.jsx src/App.jsx
git commit -m "feat(career): capture career arc and render Career & Projects room"
```

---

## Task 9: The Coach room — interview + implement

**Files:**
- Modify (via skill): `src/content/coaching.js`, `content/raw/06-coach.md`
- Create: `src/components/rooms/Coach.jsx`

**Interfaces:**
- Consumes: `coaching` from `src/content/coaching.js`, `BookCallCTA`
- Produces: light section anchored at `#coach` with gold accent

- [ ] **Step 1: Run interview** — philosophy, whoIHelp, signatureOffer, testimonials.

- [ ] **Step 2: Implement `Coach.jsx`**

- Headline "The Coach", serif
- Philosophy in large pulled quote, gold accent border-left
- "Who I help" — 4 cards (icon + label)
- Signature offer — single large card: `name`, `format` badge, `duration`, `includes[]` checklist, `price` (or "On request" if empty)
- Testimonials carousel (or simple row of quote cards) — only renders if `testimonials.length > 0`
- Bottom: large gold `<BookCallCTA variant="primary" />` linking to `#connect`

- [ ] **Step 3: Mount** in `App.jsx` after Story (per spec §4 order).

- [ ] **Step 4: Verify** — section renders with all populated fields, missing testimonials don't break layout.

- [ ] **Step 5: Commit**

```bash
git add src/content/coaching.js content/raw/06-coach.md content/raw/_progress.json src/components/rooms/Coach.jsx src/App.jsx
git commit -m "feat(coach): capture coaching content and render Coach room"
```

---

## Task 10: Freedom Architects Tribe room

**Files:**
- Modify (via skill): `src/content/tribe.js`, `content/raw/07-tribe.md`
- Create: `src/components/rooms/Tribe.jsx`

**Interfaces:**
- Consumes: `tribe` from `src/content/tribe.js`
- Produces: light section anchored at `#tribe`

- [ ] **Step 1: Run interview** — mission, memberBenefits, events, joinUrl.

- [ ] **Step 2: Implement `Tribe.jsx`**

- Big serif headline "Freedom Architects Tribe"
- Mission rendered as large statement
- `memberBenefits` — 3-4 card grid
- `events` — vertical list of upcoming/recent (name · date · summary · link)
- Bottom: "Join the Tribe →" button linking to `tribe.joinUrl` (renders only if `joinUrl !== ""`)

- [ ] **Step 3: Mount** in `App.jsx` after Coach.

- [ ] **Step 4: Verify** + **Step 5: Commit**.

```bash
git commit -m "feat(tribe): capture and render Freedom Architects Tribe room"
```

---

## Task 11: eyediaWorks room

**Files:**
- Modify (via skill): `src/content/eyediaWorks.js`, `content/raw/08-eyediaworks.md`
- Create: `src/components/rooms/EyediaWorks.jsx`

**Interfaces:**
- Consumes: `eyediaWorks` from `src/content/eyediaWorks.js`
- Produces: light section anchored at `#eyediaworks`

- [ ] **Step 1: Run interview**.

- [ ] **Step 2: Implement `EyediaWorks.jsx`** — tagline serif, description paragraph, services card grid (icon + title + description), clients row (logos or names if no logo), caseStudies cards (title + summary + link), bottom "Work with eyediaWorks →" link.

- [ ] **Step 3: Mount** after Tribe.

- [ ] **Step 4: Verify** + **Step 5: Commit**.

```bash
git commit -m "feat(eyediaworks): capture and render eyediaWorks room"
```

---

## Task 12: Nandhavanam Farm room

**Files:**
- Modify (via skill): `src/content/farm.js`, `content/raw/09-farm.md`
- Create: `src/components/rooms/Farm.jsx`

**Interfaces:**
- Consumes: `farm` from `src/content/farm.js`, `Gallery`
- Produces: light section anchored at `#farm` with forest green accent

- [ ] **Step 1: Run interview**. User drops gallery images at `public/images/farm/`.

- [ ] **Step 2: Implement `Farm.jsx`** — story paragraphs left, gallery right (2-col, stacks on mobile), `philosophy` bullets below, `whatWeGrow` chips, location + link at bottom.

- [ ] **Step 3: Mount** after eyediaWorks, before Human.

- [ ] **Step 4: Verify** + **Step 5: Commit**.

```bash
git commit -m "feat(farm): capture and render Nandhavanam Farm room"
```

---

## Task 13: Certifications & Learning room

**Files:**
- Modify (via skill): `src/content/certifications.js`, `content/raw/10-certifications.md`
- Create: `src/components/rooms/Certifications.jsx`

**Interfaces:**
- Consumes: `certifications` + `currentlyLearning` from `src/content/certifications.js`
- Produces: light section anchored at `#certifications`

- [ ] **Step 1: Run interview** — list every certification with name/issuer/year/category/credentialUrl/logo. Group by category.

- [ ] **Step 2: Implement `Certifications.jsx`**

- Group `certifications` by `category` (tech / marketing / coaching / other) — render one subsection per non-empty category
- Card grid per group: logo (or initial circle) + name + issuer + year + optional credential link
- "Currently learning" section at the bottom — list of strings as pill chips
- If both arrays empty, section renders nothing

- [ ] **Step 3: Mount** after Career.

- [ ] **Step 4: Verify** + **Step 5: Commit**.

```bash
git commit -m "feat(certifications): capture and render Certifications & Learning room"
```

---

## Task 14: Dividers — capture + wire between rooms

**Files:**
- Modify (via skill): `src/content/dividers.js`, `content/raw/11-dividers.md`
- Modify: `src/App.jsx` — interleave `<RoomDivider />` instances between rooms

**Interfaces:**
- Consumes: `dividers` array of strings
- Produces: ≤ 1 divider between every pair of rooms (10 max since there are 11 rooms)

- [ ] **Step 1: Run interview** — capture 8–10 short spiritual one-liners.

- [ ] **Step 2: Wire dividers in `App.jsx`**

```jsx
import { dividers } from "./content/dividers";

const ROOM_ORDER = [Hero, Story, Coach, Tribe, EyediaWorks, Farm, Human, Career, Certifications, Seeker, Connect];

return (
  <>
    <Nav />
    {ROOM_ORDER.map((Room, i) => (
      <Fragment key={i}>
        <Room />
        {i < ROOM_ORDER.length - 1 && dividers[i] && <RoomDivider line={dividers[i]} />}
      </Fragment>
    ))}
    <FloatingCTA />
  </>
);
```

If `dividers[i]` is undefined or empty, no divider renders between that pair.

- [ ] **Step 3: Verify** — dividers visible as thin dark bands with serif italic gold lines.

- [ ] **Step 4: Commit**.

```bash
git commit -m "feat(dividers): capture spiritual one-liners and wire between rooms"
```

---

## Task 15: Connect room — EmailJS form + Calendly embed

**Files:**
- Create: `src/components/rooms/Connect.jsx`
- Modify: `src/App.jsx` — replace Connect placeholder with `<Connect />`
- Create: `.env` (user, locally — populate with EmailJS keys)

**Interfaces:**
- Consumes: `profile` (email, calendly, social) from `src/constants/profile.js`, `@emailjs/browser`, `SocialLinks`
- Produces: dark closing section anchored at `#connect` with form (left) + Calendly (right) + footer

- [ ] **Step 1: User creates EmailJS template**

User goes to EmailJS dashboard, creates Service + Template. Template must accept variables: `from_name`, `from_email`, `from_phone`, `about_self`, `met_before`, `met_where`, `message`, `sent_at`, `source`. Recipient: `nandhu.myworld@gmail.com`. User copies Service ID, Template ID, Public Key into `.env`:

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

- [ ] **Step 2: Implement `Connect.jsx`**

```jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../../constants/profile";
import SocialLinks from "../shared/SocialLinks";

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Connect() {
  const [form, setForm] = useState({
    from_name: "", from_email: "", from_phone: "",
    about_self: "", met_before: "", met_where: "",
    message: "", website: "", // honeypot
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

  async function onSubmit(e) {
    e.preventDefault();
    if (form.website) return; // honeypot triggered → silently drop
    if (!form.from_name || !validEmail(form.from_email) || !form.about_self || form.message.length < 10) {
      setStatus("error"); return;
    }
    setStatus("submitting");
    try {
      await emailjs.send(SERVICE, TEMPLATE, {
        ...form,
        sent_at: new Date().toISOString(),
        source: "Portfolio Connect Form",
      }, { publicKey: KEY });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  // ... renders the form per spec §6 (name, email, phone, about_self, met_before radio,
  // conditional met_where, message textarea, honeypot hidden, submit button).
  // Calendly inline embed on the right, loading the official script lazily on mount.
  // Footer with profile.social + email mailto + copyright.
}
```

Calendly inline embed (added inside `Connect.jsx` `useEffect`):
```js
useEffect(() => {
  if (document.getElementById("calendly-script")) return;
  const s = document.createElement("script");
  s.id = "calendly-script";
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  document.body.appendChild(s);
}, []);
```

Then in JSX:
```jsx
<div className="calendly-inline-widget" data-url={profile.calendly}
     style={{ minWidth: 320, height: 700 }} />
<a href={profile.calendly} target="_blank" rel="noreferrer" className="text-accent-gold underline mt-2 block">
  Or open Calendly in a new tab →
</a>
```

Success message: if `met_before === "Yes"` → "Good to reconnect. I'll write back personally within 48 hours. — Nandhu", else "Thanks for reaching out. I'll write back personally within 48 hours. — Nandhu".

Error message: "Couldn't send. Email me directly at nandhu.myworld@gmail.com" with `mailto:` link.

- [ ] **Step 3: Mount** as the last room in `App.jsx`.

- [ ] **Step 4: Verify form end-to-end**

1. `npm run dev`
2. Fill all required fields with real test values
3. Submit
4. Check `nandhu.myworld@gmail.com` inbox for the email with all 9 template variables populated
5. Try submitting with empty required → see error state
6. Try entering bad email → see error
7. Calendly widget loads inline and shows the 30min event
8. Fallback link opens Calendly in new tab

- [ ] **Step 5: Commit**

```bash
git add src/components/rooms/Connect.jsx src/App.jsx
git commit -m "feat(connect): EmailJS form with about-self/met-before fields + Calendly embed"
```

---

## Task 16: Polish — recolor hero 3D, mobile pass, lighthouse

**Files:**
- Modify: existing 3D scene files under `src/components/` (whichever the original template uses)
- Modify: `src/components/rooms/Hero.jsx` if needed
- Modify: any rooms with mobile layout issues

**Interfaces:**
- No new interfaces; visual polish only

- [ ] **Step 1: Audit existing 3D template files**

Find files with purple/cold colors in the hero 3D scene (likely in `src/components/canvas/` or similar). Replace purple star/particle colors with earthy palette: forest green (`#3a6b3a`), warm gold (`#c9a227`), indigo accents (`#5b3aa0`). Keep the particle/scene behavior identical.

- [ ] **Step 2: Mobile pass**

Run dev. In Chrome DevTools mobile emulator (iPhone 13, Pixel 7), walk every room top to bottom. Fix any:
- Text overflow / clipping
- Sections that don't fill width or have wrong padding
- Nav hamburger transitions
- Floating CTA position on mobile (should not block important content; consider sticky bottom bar variant)

- [ ] **Step 3: Lighthouse check**

Run Lighthouse on the built site (`npm run build && npm run preview`). Targets:
- Performance ≥ 80 on desktop
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 90

Common fixes:
- Add `loading="lazy"` to non-hero images
- Verify all `<img>` have `alt`
- Compress oversized images (warn user if any > 500KB)
- Add `prefers-reduced-motion` guard around role rotator and floating CTA animations

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: hero recolor, mobile responsive pass, lighthouse fixes"
```

---

## Task 17: Production build, deploy prep, README

**Files:**
- Modify: `README.md` — replace template README with project-specific instructions
- Create: `DEPLOY.md` (or extend README) — deploy instructions for Vercel/Netlify/Cloudflare Pages

**Interfaces:**
- Produces: production-ready static bundle in `dist/`

- [ ] **Step 1: Update README**

Replace existing README content with:
- One-line project description
- Local dev: `npm install`, `cp .env.example .env`, fill EmailJS keys, `npm run dev`
- Build: `npm run build`
- Deploy: instructions for Vercel + Netlify + Cloudflare Pages, including env-var setup in each dashboard

- [ ] **Step 2: Final production build verification**

```bash
npm run build
npm run preview
```

Walk through every room in the preview build. Verify:
- All 11 rooms render
- Form submits (test once more on production build)
- Calendly loads
- No console errors
- All images load
- Anchor navigation works for every room

- [ ] **Step 3: Verify Success Criteria (spec §10)**

Tick each: 11 rooms with real content, Hero rotating roles + manifesto + working social, timeline ≥ 20 milestones across ≥ 5 categories including `spiritual`, Coach/Tribe/eW/Farm/Seeker each ≥ 1 paragraph + assets, Human ≥ 6 photos + 1 music + 1 art + 1 event, Career Guidewire arc + ≥ 3 projects, all certs listed, 8–10 dividers, Connect form sends with all 9 variables, Calendly works, mobile responsive, Lighthouse Perf ≥ 80.

- [ ] **Step 4: Commit + tag v1**

```bash
git add README.md
git commit -m "docs: README with dev, build, and deploy instructions"
git tag v1.0.0
```

- [ ] **Step 5: Deploy** — push to chosen host (user action).

---

## Self-Review (post-write)

**1. Spec coverage:**
- Spec §3 Architecture → Task 2 (scaffolding) + Task 3 (shared components)
- Spec §4 all 11 rooms → Tasks 4–15 (one room per task)
- Spec §5 data shapes → Task 2 scaffolds the empty modules, each room task fills its own
- Spec §6 booking → Task 15 (Connect)
- Spec §7 interview skill → Task 1
- Spec §8 component conventions → followed throughout (one file per room, Tailwind only, FM where it earns attention)
- Spec §9 build/deploy → Task 17
- Spec §10 success criteria → explicitly checked in Task 17 Step 3
- Spec §11 open items: EmailJS account setup → Task 15 Step 1; Calendly assumed; hero 3D recolor → Task 16

**2. Placeholder scan:** No "TBD"/"TODO" remains. Where code is multi-line, full code is shown (Hero, Story, Connect). Where code is straightforward (e.g., Tribe layout), the rendering rules are exact enough that a fresh engineer can write it. The deferred "RoleRotator full code" inside Task 4 says explicitly what it must do (cycles roles every 2.2s via `AnimatePresence` fade) — acceptable as it's a 15-line pattern, not an architectural choice.

**3. Type consistency:** Field names across tasks match spec §5 exactly. `categoryColors` is created in `theme.js` (Task 2) and re-exported from `timeline.js` (Task 2); Task 6 imports it from `timeline.js` — consistent. `profile.calendly` referenced in Tasks 4, 15 — same shape. Form field names (`from_name`, `about_self`, `met_before`, `met_where`, etc.) match spec §6 exactly.

Plan complete.
