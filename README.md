# Portfolio

pnpm monorepo:

- `frontend/`: Next.js (App Router), React, Tailwind CSS
- `backend/`: Express, Drizzle ORM, and Neon serverless Postgres

Both use an MVC layout.

## Setup

```bash
pnpm install
cp backend/.env.example backend/.env          # set DATABASE_URL to your Neon connection string
cp frontend/.env.example frontend/.env.local
pnpm db:push                                  # create tables in Neon
pnpm dev                                      # frontend :3000, backend :4000
```

## Structure

```
backend/src
  config/       env config
  db/           Drizzle + Neon client
  models/       Drizzle table schemas (M)
  controllers/  request handlers (C)
  routes/       Express routers -> controllers
  middleware/   error handling
  app.ts, server.ts

frontend/src
  models/       TypeScript types (M)
  controllers/  API client calls to the backend (C)
  views/        page views + components (V)
  app/          Next.js routes rendering views
```

## Docker / Northflank

The root `Dockerfile` builds both apps into one image. In the container:

- Next.js (standalone build) listens on `PORT` (default `3000`), the only port to expose.
- Express listens internally on `4000`. Next.js proxies `/api/*` to it (see `frontend/next.config.ts`).
- `docker/start.mjs` starts both processes. If either one exits, it stops the other so the container restarts.

Build and run locally:

```bash
docker build --build-arg SITE_URL=https://your-domain.com -t portfolio .
docker run -p 3000:3000 -e DATABASE_URL="postgresql://..." portfolio
```

Northflank setup (Combined or Deployment service, build from repo):

1. Build type: **Dockerfile**, build context `/`, Dockerfile path `/Dockerfile`.
2. Networking: add port **3000**, protocol HTTP, **public**.
3. Build argument: `SITE_URL` set to the public URL. It is used for canonical/Open Graph URLs, `robots.txt` and the sitemap.
4. Runtime variables: `DATABASE_URL` set to your Neon connection string (store it as a secret).
5. Run `pnpm db:push` from your machine against the same database to create the tables.

## Resume PDF

The resume window links to `/CV_Nicha.pdf`. Put the public version at `frontend/public/CV_Nicha.pdf`.
