# TalentChain Pro – Frontend

A modern, polished Next.js application for the TalentChain Pro ecosystem. It provides a rich UI for skill verification, sBTC job pools, DAO governance, and user onboarding, paired with a FastAPI backend.

## Features

- Elegant UI built with Next.js App Router and TypeScript
- Responsive layout with a sidebar, header, and modular pages
- Shadcn-style components (Radix UI) and Tailwind CSS v4
- Dashboard, Skills, Job Pools, DAO, and Settings sections
- Theming and animations via `next-themes` and `tailwindcss-animate`
- Ready to integrate with the FastAPI backend

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + Radix UI + lucide-react icons
- State and forms: React Hook Form + Zod
- Charts: Recharts
- Utilities: clsx, tailwind-merge

## Project Structure

- `app/` – App Router pages, layout, and route handlers
- `components/` – Reusable UI components (buttons, cards, layout)
- `hooks/` – Custom hooks
- `lib/` – Utilities (e.g., classnames)
- `public/` – Static assets (e.g., `/logo.png`)
- `styles/` – Global styles

Key UI entries:
- `components/layout/sidebar.tsx` – Left navigation with logo
- `components/layout/header.tsx` – Top bar with actions

## Prerequisites

- Node.js 18+ (Node 22 supported). If using `pnpm`, ensure Corepack is configured correctly; otherwise use `npm`.
- Backend running (FastAPI) if testing end-to-end

Recommended environment variables for frontend-backend integration:

```bash
# .env.local
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

Use via `fetch(`${process.env.NEXT_PUBLIC_API_BASE}/health`)` etc.

## Development

Install dependencies (npm fallback if pnpm/Corepack has issues):

```bash
npm install --legacy-peer-deps
```

Start the dev server:

```bash
npm run dev
```

- Local: http://localhost:3000

## Scripts

- `npm run dev` – Start Next.js dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Lint codebase

## Assets

- Logo placed at `public/logo.png` and rendered in `components/layout/sidebar.tsx`:

```tsx
import Image from "next/image"

<Image src="/logo.png" alt="TalentChain Pro logo" width={32} height={32} />
```

## Backend Pairing

The backend lives in `../backend/` and exposes FastAPI endpoints such as:
- `GET /health` – quick health check
- `POST /register`, `POST /evaluate`, `POST /job-pools`, `GET /stats`, DAO endpoints, etc.

When running locally:
- Frontend: http://localhost:3000
- Backend: http://127.0.0.1:8000

## Deployment

- Build: `npm run build`
- Serve: `npm start`
- For platforms like Vercel/Netlify, set `NEXT_PUBLIC_API_BASE` in the dashboard.

## Troubleshooting

- pnpm/Corepack signature errors on Node 22: use `npm install --legacy-peer-deps`
- Peer dependency conflicts (React 19 vs libs): `--legacy-peer-deps` resolves most issues
- Next.js image issues: ensure `next/image` `src` points to `/public` assets or configure `next.config.mjs`

## License

Proprietary – © TalentChain Pro. All rights reserved.
