# Meridian AI Scout

Meridian AI Scout is a Vite + React + TypeScript app for venture scouting:

- Discover companies with search, filters, sorting, and pagination
- Save/re-run searches
- Manage lists and export list data
- Open company profiles with signals, notes, and enrichment

## Feature Checklist

- App shell with sidebar + global command search (`Cmd/Ctrl + K`)
- `/companies` search + filters + sortable table + pagination
- `/companies/:id` overview + signals + notes + save-to-list + live enrichment
- `/lists` create lists, add/remove companies, export CSV and JSON
- `/saved` save searches and re-run them with saved filters
- Server-side enrichment endpoint at `/api/enrich` (no API keys in browser)

## Security Model (API keys)

- API keys are only read on the server (`api/enrich.ts`) via environment variables
- Frontend never reads `OPENAI_API_KEY`
- Add secrets in Vercel Project Settings -> Environment Variables

Required server env:

- `OPENAI_API_KEY`
- Optional: `OPENAI_MODEL` (default: `gpt-4o-mini`)

See `.env.example` for local variable names.

## Local Development

```sh
npm install
npm run dev
```

Build:

```sh
npm run build
```

## Deployment (Vercel)

1. Import repo into Vercel.
2. Set environment variables (`OPENAI_API_KEY`, optional `OPENAI_MODEL`).
3. Use build settings:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Push to your production branch (`main`) to auto-deploy.

`vercel.json` is configured for SPA routing and `/api/*` endpoints.
