# Performance (Core Web Vitals) — byarms.com

Source : Lighthouse 2026-10-05, mobile simulé (throttling simulate), Chrome système. PageSpeed Insights indisponible (quota API sans clé). Pas de données terrain CrUX (site trop récent / pas de clé).

## Score Performance : 62/100

| Page | Perf | LCP | CLS | TBT | FCP | Speed Index |
|---|---|---|---|---|---|---|
| / | 71 | **12,1 s** | 0 | 30 ms | 1,2 s | 5,2 s |
| /product-launch | 95 | 2,6 s | 0 | 10 ms | 1,7 s | 3,6 s |
| /ai-operations | 97 | 2,1 s | 0 | 30 ms | 1,6 s | 3,3 s |
| /ada | 99 | 1,8 s | 0 | 20 ms | 1,6 s | 2,9 s |

Seuils Google : LCP ≤ 2,5 s · CLS ≤ 0,1 · INP ≤ 200 ms (TBT faible = bon proxy INP).

## Ce qui fonctionne
- CLS = 0 partout, aucun décalage de mise en page.
- TBT ≤ 30 ms : très peu de JavaScript bloquant, INP sera bon.
- SEO Lighthouse 100, Best Practices 100 sur les 4 pages.
- Pages intérieures sous le seuil LCP.

## Findings

### Critical — LCP 12,1 s sur la page d'accueil
**Preuve** : `public/byarms-logo.png` pèse 2 089 242 octets (2 Mo) et est affiché en 58 px dans le header (`components/Marketing.tsx`, `<Image … sizes="58px" priority />`). Lighthouse : « Properly size images » économie 2 025 Kio, « next-gen formats » économie 1 777 Kio. Le `priority` ajoute un `<link rel="preload">` sur ce fichier de 2 Mo, qui passe devant tout le reste.
**Cause racine** : `next.config.ts` → `images: { unoptimized: true }`. `next/image` ne redimensionne ni ne convertit rien : le PNG original est servi tel quel sur toutes les pages (header + footer + admin).
**Correctif** :
1. Remplacer `public/byarms-logo.png` par une version 232×232 px (4× la taille d'affichage pour le retina) exportée en PNG optimisé ou WebP, cible < 15 Ko. Garder le fichier HD hors de `public/`.
2. Idéalement retirer `unoptimized: true` et ajouter `sharp` au Dockerfile (standalone) pour réactiver l'optimisation Next (AVIF/WebP, srcset). À défaut, servir des assets pré-redimensionnés.
**Gain attendu** : LCP home de 12 s à ~1,5 s, Perf 71 → 95+.

### High — Photo fondateur 1,5 Mo non redimensionnée
**Preuve** : `public/jonathan-arms.jpg` = 1 560 211 octets, 3024×4032 px, EXIF iPhone complet (date, modèle). Affichée au max 350 px (`sizes="(max-width: 680px) 80vw, 350px"`). Hors viewport initial donc pas sur le LCP, mais 1,5 Mo téléchargés sur mobile pour chaque visite de la home.
**Correctif** : exporter en 700×933 px WebP qualité 80 (cible ~60 Ko), supprimer les métadonnées EXIF (vie privée + poids).

### Medium — Time to Interactive 8 s sur toutes les pages
**Preuve** : TTI 8,0–8,1 s sur /product-launch, /ai-operations, /ada alors que TBT ≤ 30 ms. Indique un chargement réseau long (chunks JS en `async`, hydratation tardive) plutôt qu'un blocage CPU. Peu d'impact utilisateur réel vu le TBT, mais à surveiller.
**Correctif** : vérifier le poids des chunks Next (`next build` → analyse), limiter les animations JS (`motion.css` / `MarketingMotion`) au strict nécessaire.

### Medium — Icônes PWA surdimensionnées
**Preuve** : `android-chrome-512x512.png` = 220 Ko (attendu < 30 Ko pour une icône plate).
**Correctif** : ré-exporter en PNG-8 / optimisation (oxipng, squoosh).

### Low — JavaScript inutilisé ~29 Kio
Preuve Lighthouse `unused-javascript` sur / et /product-launch. Marginal, à traiter après les images.

### Low — Contraste de couleurs (accessibilité 96)
Lighthouse `color-contrast` sur / et /ada : un ou plusieurs textes sous le ratio 4.5:1 (probablement les mentions `m-eyebrow` / `small` en gris clair). À corriger dans `marketing.css`.

## Quick wins
1. Logo 2 Mo → < 15 Ko (une commande sips/squoosh, zéro code). Résout à lui seul le Critical.
2. Photo fondateur → WebP 700 px sans EXIF.
3. Réactiver l'optimisation d'images Next (retirer `unoptimized`, ajouter `sharp`).
