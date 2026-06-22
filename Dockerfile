# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — byarms-web (Next.js 16, Prisma, Node 22)
# Ports: 3000
# ─────────────────────────────────────────────────────────────────────────────

FROM node:22-alpine AS deps
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /build
COPY --from=deps /build/node_modules ./node_modules
COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
RUN apk add --no-cache curl
RUN addgroup -g 1001 -S byarms && adduser -u 1001 -S byarms -G byarms

WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0

COPY --from=builder --chown=byarms:byarms /build/.next/standalone ./
COPY --from=builder --chown=byarms:byarms /build/.next/static ./.next/static
COPY --from=builder --chown=byarms:byarms /build/public ./public
# Prisma schema + migrations for runtime migration
COPY --from=builder --chown=byarms:byarms /build/prisma ./prisma
COPY --from=builder --chown=byarms:byarms /build/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=byarms:byarms /build/node_modules/@prisma ./node_modules/@prisma

USER byarms
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=20s \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["node", "server.js"]
