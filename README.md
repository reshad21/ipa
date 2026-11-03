# IPA — Institute of Public Accountability

IPA is a responsive React website for an independent media research observatory. It presents the institute’s research areas, investigations, methodology, team, contact channels, and public-facing resources in English and Bangla.

## Features

- Hash-based navigation for Home, About, Researches, Investigations, Team, and Contact pages
- English/Bangla language switcher with persisted language preference
- Responsive editorial-style layout built with Tailwind CSS
- Motion-powered page transitions and interactive research cards
- Focus areas, research catalog, investigation detail pages, team directory, FAQ search, and dataset-request modal
- Contact form with client-side validation
- Footer back-to-top control and scroll-progress indicator

## Tech stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4 via `@tailwindcss/vite`
- Motion for React animations
- Lucide React icons

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The app is served at [http://localhost:3000](http://localhost:3000).

### Run checks

```bash
npm run lint       # TypeScript check
npm run build      # Production build
npm run preview    # Preview the production build locally
```

## Project structure

```text
src/
├── components/   Shared UI components
├── context/      Application-wide language state
├── data/         Navigation, research, team, and investigation content
├── pages/        Top-level page views
├── App.tsx       Hash navigation and application shell
├── index.css     Global styles and Tailwind entry point
└── main.tsx      React application entry point
```

Content is primarily maintained in `src/data`. Add or update research areas, team members, investigations, and navigation there rather than embedding large data collections in page components.

## Routing

The site uses browser hash navigation so it can be deployed as a static Vite application without server-side route rewrites. Examples:

```text
/#home
/#about
/#work
/#investigation/media-journalism
/#team
/#contact
```

## Localization

`LanguageContext` provides the `useLanguage` hook and the `t(english, bangla)` helper. The selected language is stored in `localStorage` under `ipa-language`.

Localized content extensions belong in `src/data/translations.ts`. Components fall back to their English source data when a Bangla entry is not available.

## Environment variables

Copy `.env.example` to `.env.local` when environment-specific configuration is needed:

```bash
cp .env.example .env.local
```

The example file contains placeholders for `GEMINI_API_KEY` and `APP_URL`. The current client UI does not require either variable for its core pages.

## Production build

Build the static site with:

```bash
npm run build
```

Vite writes the deployable output to `dist/`. Any static hosting provider that supports SPA entry files can serve the application. Because navigation uses hashes, no route-rewrite configuration is required.
