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
