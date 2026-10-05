# Audit SEO technique — byarms.com (2026-10-05)

**Score Technical SEO : 46/100**

## Ce qui fonctionne
- HTTPS 200 en HTTP/2 + HTTP/3 (alt-svc h3), pages prérendues (`x-nextjs-prerender`, cache HIT) → HTML complet côté serveur (h1/title présents dans le crawl, pas de dépendance JS).
- Compression gzip active (55 627 o → 10 339 o). Brotli absent (mineur).
- 404 réelle : `/page-inexistante` et `/api/health` → vrai statut 404 (pas de soft-404), `no-store`.
- Trailing slash : `/contact/` → 308 `/contact` (propre, une seule URL).
- `/admin` → 307 `/admin/login` (privé, OK ; ajouter noindex sur login). `/onboarding` noindex voulu.
- favicon.ico (200, image/x-icon) et `site.webmanifest` (200, application/manifest+json) servis.
- hreflang : inutile (site FR seul) — ne rien ajouter.

## Critical
1. **robots.txt 404** — `curl -I /robots.txt` → 404. Pas de directive ni de lien sitemap.
   Correctif `app/robots.ts` :
   ```ts
   import type { MetadataRoute } from 'next'
   export default function robots(): MetadataRoute.Robots {
     return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/onboarding'] }],
              sitemap: 'https://byarms.com/sitemap.xml', host: 'https://byarms.com' }
   }
   ```
   (Ne pas bloquer /onboarding en robots si on veut que noindex soit lu ; préférer le laisser crawlable + noindex.)
2. **sitemap.xml 404.** Correctif `app/sitemap.ts` listant les 7 pages publiques indexables (hors /onboarding, /admin), `lastModified` réelle, `https://byarms.com/...`. Soumettre ensuite dans GSC + Bing.
3. **Aucune canonical** (8/8 pages) alors que http:// et https:// servent le même contenu → risque de duplication. Correctif : dans `app/layout.tsx` `metadata = { metadataBase: new URL('https://byarms.com'), alternates: { canonical: './' } }` et surcharge par page (`alternates: { canonical: '/contact' }`).
4. **http://byarms.com sert la page en 200 sans redirection HTTPS.** Correctif hébergeur (Coolify/Traefik) : activer « Force HTTPS » / middleware redirectscheme (`traefik.http.middlewares.https-redirect.redirectscheme.scheme=https`, permanent=true) sur le routeur `web` (entrypoint 80).

## High
5. **www.byarms.com injoignable (code 000, DNS/TLS).** Ajouter enregistrement DNS `www` CNAME/A, déclarer le domaine `www.byarms.com` dans Coolify (certificat Let's Encrypt) et rediriger 301 vers l'apex (Coolify gère « redirect www → non-www », ou Traefik `redirectregex`). Évite perte de liens/partages en www.
6. **Meta description identique sur les 8 pages** → duplication, snippets génériques. Correctif : `export const metadata = { title, description }` unique (140–155 car.) par `page.tsx`, avec `title.template` dans le layout.
7. **Aucun JSON-LD.** Ajouter dans layout `Organization` (name, url, logo, sameAs, contactPoint) + `WebSite`; `ProfessionalService`/`Service` sur les pages offres ; `BreadcrumbList` sur sous-pages. Injection : `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g,'\\u003c')}} />`.
8. **En-têtes de sécurité absents** (seuls cache-control et x-powered-by). Correctif `next.config.ts` :
   ```ts
   poweredByHeader: false,
   async headers() { return [{ source: '/(.*)', headers: [
     { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
     { key: 'X-Content-Type-Options', value: 'nosniff' },
     { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
     { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
     { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
   ]}] }
   ```
   CSP : démarrer en `Content-Security-Policy-Report-Only` (nonce via middleware) avant d'appliquer. HSTS seulement après redirection HTTPS + www fonctionnels.

## Medium
9. **Cache-Control `s-maxage=31536000` sur le HTML** (1 an en CDN/proxy) : un contenu mis à jour peut rester périmé derrière un proxy. Préférer revalidation (`export const revalidate = 3600`) ou `s-maxage=3600, stale-while-revalidate`; vérifier que le redeploy purge le cache.
10. **Page 404 par défaut Next** (10 Ko, statut correct) : créer `app/not-found.tsx` avec nav + liens vers pages clés, `robots: noindex`.
11. **/admin/login indexable potentiellement** : ajouter `metadata.robots = { index: false, follow: false }` dans `app/admin/layout.tsx` (+ Disallow /admin dans robots.ts).
12. **Open Graph / Twitter cards** : à vérifier (hors périmètre crawl) ; ajouter `openGraph`, `twitter`, image 1200×630 via `metadataBase`.

## Low
13. Brotli non servi : activer au niveau Traefik/Caddy (gain ~15 % vs gzip).
14. `x-powered-by: Next.js` exposé → `poweredByHeader: false`.
15. favicon/manifest en `max-age=0` : ajouter cache long avec nom hashé ou `max-age=86400` via headers().
16. Doublons d'en-tête `x-nextjs-prerender` (cosmétique, ignorer).

## Quick wins (≈1 h)
1. `app/robots.ts` + `app/sitemap.ts` (15 min).
2. `metadataBase` + canonical + descriptions uniques (30 min).
3. `headers()` + `poweredByHeader:false` dans next.config.ts (10 min).
4. Coolify : Force HTTPS + domaine www avec redirection vers apex (10 min).
5. JSON-LD Organization/WebSite dans le layout.

## Limites
Vérification du texte brut (nombre de mots visibles) non exécutée (commande bloquée par hook sécurité) ; rendu SSR déduit de crawl.json (h1/title extraits du HTML). OG/Twitter non audités.
