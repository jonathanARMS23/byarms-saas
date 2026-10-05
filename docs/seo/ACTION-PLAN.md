# Plan d'action SEO — byarms.com

Score actuel 42/100. Cible réaliste après phases 1 et 2 : 70+. Après phase 3 : 80+.

## Phase 1 — Correctifs critiques (semaine 1)

### A. Code, livrable en une branche `feature/seo-technical` (≈ 1 jour, automatisable)
1. Images : `byarms-logo.png` → 232×232 px optimisé (< 15 Ko) ; `jonathan-arms.jpg` → WebP 700 px sans EXIF ; icône 512 px optimisée. Ou retirer `images.unoptimized` et ajouter `sharp` au Dockerfile.
2. `app/robots.ts` : allow /, disallow /admin /api /onboarding, politique par user-agent IA, sitemap.
3. `app/sitemap.ts` : 7 pages indexables, lastModified.
4. `app/layout.tsx` : `metadataBase`, canonical, `openGraph` complet avec image, `twitter`, `app/opengraph-image.tsx`.
5. Titles et descriptions uniques sur les 8 pages (tableau du rapport), canonical de /diagnostic sans paramètre, noindex sur /admin.
6. JSON-LD : composant `JsonLd`, `lib/schema.ts` ; Organization + WebSite + Person (layout/accueil), Service avec offers + FAQPage (offres), SoftwareApplication (/ada), BreadcrumbList.
7. `next.config.ts` : `poweredByHeader: false`, `headers()` de sécurité (HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy).
8. `public/llms.txt`, `app/not-found.tsx`.
9. Suppression du code mort : `FounderSection`, `Footer`, `Nav`, `ContactSection` (lien ada.byarms.dev, ancien Gmail).

### B. Hébergement, à faire à la main dans Coolify (≈ 30 min)
10. Force HTTPS : redirection permanente http → https.
11. Domaine www.byarms.com : DNS + certificat + 301 vers l'apex.
12. Après 10 et 11 : vérifier HSTS, puis soumettre le sitemap dans Google Search Console et Bing Webmaster Tools.

### C. Décisions à prendre
13. Email public : remplacer le Gmail personnel par contact@byarms.com sur /mentions-legales et /confidentialite.
14. Crawlers d'entraînement IA : autoriser (recommandé) ou bloquer GPTBot, ClaudeBot, Google-Extended, CCBot.

## Phase 2 — Fort impact (semaines 2 et 3)
15. Mentions légales complètes : adresse du siège, directeur de publication, hébergeur, TVA, juridiction ; /confidentialite : base légale, durée de conservation, contact, CNIL.
16. Définitions en clair en tête de /ada, /product-launch, /ai-operations (passages citables de 40 à 60 mots fournis) ; glossaire des termes ADA, Blueprint, baseline, go/no-go.
17. Section « Qui construit » : bio du fondateur, expérience, LinkedIn, équipe, pays.
18. /confiance étoffée à 600+ mots avec processus concret ; /diagnostic avec « ce qui se passe après l'envoi ».
19. H2 descriptifs à la place des H2 poétiques ; H1 d'accueil sans `<br>` nus ; ancres descriptives ; liens contextuels /ada ↔ offres ↔ /confiance.
20. FAQ enrichie à 8 ou 10 questions par offre, balisée FAQPage.
21. Tableau comparatif des formules (prix, durée, périmètre, livrables).

## Phase 3 — Contenu et autorité (mois 2)
22. Page /realisations : 2 ou 3 cas (projets internes ADA, ImmoVision si autorisés) avec chiffres.
23. Pages cas d'usage AI Operations par métier (3 métiers).
24. Guides informationnels : « Combien coûte un MVP SaaS en 2026 », « Qu'est-ce qu'un AI Engineering OS ».
25. Mentions externes : LinkedIn société, GitHub ADA, annuaires, Product Hunt ; sameAs mis à jour.

## Phase 4 — Suivi (continu)
26. Search Console + Bing : couverture, requêtes, CWV terrain.
27. Baseline de dérive SEO (`seo-drift`) après la mise en prod de la phase 1, puis contrôle à chaque déploiement.
28. Lighthouse à chaque release ; objectif LCP < 2,5 s sur toutes les pages.
