# Frontend Redesign Notes

This frontend has been migrated from plain CSS to Tailwind CSS and rebuilt as a
component-based, premium dark-theme AI SaaS UI. **No backend code, API endpoints,
request/response shapes, or auth logic were touched** — only `frontend/` changed.

## Setup

```bash
cd frontend
npm install
npm run dev
```

`npm install` will pick up the three new dev dependencies declared in
`package.json` (`tailwindcss`, `postcss`, `autoprefixer`). The old
`package-lock.json` was removed so npm can regenerate it cleanly with the new
packages — it will be recreated on your first `npm install`.

## What changed

- **Styling**: `src/style.css` → `src/index.css` (Tailwind directives + a small
  `@layer base/components` block for scrollbars, focus rings, glass, gradient
  text, and skeleton shimmer). `tailwind.config.js` defines the full design
  system (colors, fonts, shadows, keyframes).
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (numbers /
  counters) loaded via Google Fonts in `index.html`.
- **Components** (`src/components/`):
  - `ui/` — Button, Input (with password visibility toggle), Textarea (with
    character counter), Card, LoadingSpinner
  - `layout/` — Logo, Navbar (adds a working "Sign out" using the existing
    `GET /auth/logout` route), AuthLayout (split hero/form layout), DashboardLayout
  - `report/` — MatchScoreCard (animated circular progress), QuestionCard
    (accordion), SkillGapCard (severity badge: high/medium/low → red/amber/green),
    PreparationTimeline (connected day-by-day timeline), ReportSkeleton (loading state)
  - `shared/` — SectionTitle
- **Pages** (`src/pages/`): Login, Register, and Dashboard were rewritten to use
  the components above. All existing state variables, the exact axios calls
  (`/auth/login`, `/auth/register`, `/interview/generate`), request bodies, and
  navigation calls (`navigate("/dashboard")`, `navigate("/")`) are unchanged.
  Cosmetic-only additions: a "Remember me" checkbox and a "Forgot password?"
  placeholder on Login, a password-strength meter on Register (all client-side,
  no new API calls), and a step-by-step loading skeleton plus a "Sign out"
  button on Dashboard that calls the existing logout endpoint.

## Design system

- **Palette**: near-black indigo canvas (`#08070d`), glass surfaces, violet
  (`#7e14ff`) → cyan (`#47bfff`) gradient accent — pulled directly from the
  existing app icon.
- **Signature element**: the animated circular match-score ring, echoing the
  orbiting shapes in the logo.
