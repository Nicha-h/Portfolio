# syntax=docker/dockerfile:1

# ---- Build both apps ----
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY frontend/package.json frontend/
COPY backend/package.json backend/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Backend with production-only node_modules
RUN pnpm deploy --filter backend --prod --legacy /out/backend \
 && cp -r backend/dist /out/backend/dist

# Next.js standalone output plus its static assets
RUN cp -a frontend/.next/standalone /out/web \
 && cp -r frontend/.next/static /out/web/frontend/.next/static \
 && cp -r frontend/public /out/web/frontend/public

# ---- Runtime image ----
FROM node:22-alpine AS runtime
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    BACKEND_PORT=4000
WORKDIR /app

COPY --from=build --chown=node:node /out/backend ./backend
COPY --from=build --chown=node:node /out/web ./web
COPY --chown=node:node docker/start.mjs ./start.mjs

USER node
EXPOSE 3000
CMD ["node", "start.mjs"]
