# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — byarms-web (Next.js, Prisma, Node 22)
# Port: 3000
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: deps ─────────────────────────────────────────────────────────────
# OpenSSL requis pour le binaire Prisma (musl Alpine)
FROM node:22-alpine AS deps
RUN apk add --no-cache openssl
WORKDIR /build
COPY package.json package-lock.json ./
# Le schema doit être présent AVANT npm ci pour que le postinstall prisma fonctionne
COPY prisma ./prisma
RUN npm ci

# ── Stage 2: builder ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /build
COPY --from=deps /build/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: runner ───────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
RUN apk add --no-cache curl openssl
RUN addgroup -g 1001 -S byarms && adduser -u 1001 -S byarms -G byarms

WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0

# node_modules depuis deps (binaires Alpine corrects)
COPY --from=deps    --chown=byarms:byarms /build/node_modules ./node_modules
# Build Next.js
COPY --from=builder --chown=byarms:byarms /build/.next        ./.next
COPY --from=builder --chown=byarms:byarms /build/public       ./public
COPY --from=builder --chown=byarms:byarms /build/package.json ./package.json
COPY --from=builder --chown=byarms:byarms /build/next.config.ts ./next.config.ts
# Prisma schema + migrations pour migrate deploy au démarrage
COPY --from=builder --chown=byarms:byarms /build/prisma       ./prisma

USER byarms
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=30s \
  CMD curl -f http://localhost:3000 || exit 1

# Migrations appliquées automatiquement avant le démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
