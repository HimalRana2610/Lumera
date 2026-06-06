# LUMÉRA AI — Frontend

The Next.js (App Router) frontend for LUMÉRA AI. See the [root README](../README.md) for the full project overview, architecture, and backend setup.

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- axios (API calls) · react-webcam (camera capture)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command         | Description                     |
|-----------------|---------------------------------|
| `npm run dev`   | Start the dev server            |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

## Configuration

The backend base URL is defined in [src/app/lib/api.ts](src/app/lib/api.ts) (`API_BASE_URL`).
Point it at your local backend (`http://localhost:8000`) during development, or your
deployed backend in production.

## Structure

```
src/app/
├── page.tsx              # Landing page (hero, features, how-it-works, privacy, contact)
├── analysis/page.tsx     # Upload → summary → consent → report flow
├── components/           # UI components (CameraCapture, UploadArea, sections, ...)
└── lib/api.ts            # Backend API client (uploadImageForAnalysis, recordConsent)
```
