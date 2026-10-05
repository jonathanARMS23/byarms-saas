# Audit SEO complet — byarms.com

Date : 2026-10-05 · Périmètre : 8 pages publiques (crawl complet) · Stack : Next.js 16 App Router, hébergement Coolify
Type d'activité détecté : studio B2B de services (développement produit logiciel + systèmes IA au forfait), produit maison ADA. Pas d'e-commerce, pas de local.

## 1. Résumé exécutif

**Score SEO global : 42/100**

| Catégorie | Poids | Score | Pondéré |
|---|---|---|---|
| Technical SEO | 22 % | 46 | 10,1 |
| Content Quality | 23 % | 52 | 12,0 |
| On-Page SEO | 20 % | 44 | 8,8 |
| Schema / données structurées | 10 % | 0 | 0,0 |
| Performance (CWV) | 10 % | 62 | 6,2 |
| AI Search Readiness | 10 % | 34 | 3,4 |
| Images | 5 % | 35 | 1,8 |

Le site est sain dans ses fondations (HTML pré-rendu, HTTP/2 et HTTP/3, un seul H1 par page, aucune image sans alt, maillage sans orpheline, accessibilité correcte, prix publiés). Il est en revanche quasiment invisible pour les moteurs et les IA faute d'infrastructure SEO : pas de robots.txt, pas de sitemap, pas de canonical, aucune donnée structurée, description identique sur 6 pages, et une page d'accueil à 12 s de LCP mobile à cause d'un logo de 2 Mo.

### Top 5 problèmes critiques
1. **http://byarms.com sert le site en clair (200) sans redirection HTTPS** et **www.byarms.com ne répond pas**. Contenu dupliqué entre schémas, visiteurs www perdus. Correctif côté hébergeur (Coolify : Force HTTPS + domaine www redirigé vers l'apex).
2. **robots.txt et sitemap.xml en 404.** Aucune politique de crawl, aucune liste d'URL, aucune politique pour les crawlers IA.
3. **Aucune canonical sur les 8 pages**, variantes `/diagnostic?offre=` non canonisées.
4. **Aucune donnée structurée** : pas d'entité Organization, Person, Service, SoftwareApplication, FAQPage. Score schéma 0.
5. **LCP 12,1 s sur l'accueil mobile** : `byarms-logo.png` pèse 2 Mo pour un affichage en 58 px, préchargé en priorité, optimisation d'images Next désactivée (`images.unoptimized: true`). La photo fondateur fait 1,5 Mo avec métadonnées iPhone.

### Top 5 quick wins (≈ 1 journée, gain estimé +20 points)
1. Logo redimensionné à 232 px (< 15 Ko) et photo fondateur en WebP 700 px sans EXIF : accueil de 71 à 95+ en performance.
2. `app/robots.ts` + `app/sitemap.ts` + `metadataBase` + canonical par page.
3. Meta description unique sur les 6 pages qui héritent de celle de l'accueil, titles avec mots-clés de requête.
4. JSON-LD Organization + WebSite + Person dans le layout, Service avec `offers` sur les offres, SoftwareApplication sur /ada, FAQPage sur les offres (FAQ visible existante).
5. En-têtes de sécurité via `headers()` dans `next.config.ts`, `poweredByHeader: false`, `public/llms.txt`.

## 2. Technical SEO — 46/100

**Fonctionne** : HTTPS en HTTP/2 + HTTP/3, pages pré-rendues (cache HIT), gzip actif (55 Ko → 10 Ko), vraies 404, trailing slash normalisé en 308, /admin redirigé vers login, /onboarding en noindex volontaire, favicon et manifest servis.

| Sév. | Finding | Preuve | Correctif |
|---|---|---|---|
| Critical | robots.txt 404 | `curl -I /robots.txt` → 404 | `app/robots.ts` : allow /, disallow /admin /api /onboarding, sitemap |
| Critical | sitemap.xml 404 | 404 | `app/sitemap.ts` : 7 pages indexables, lastModified réel ; soumettre dans GSC et Bing |
| Critical | Aucune canonical | 8/8 pages | `metadataBase` + `alternates.canonical` par page |
| Critical | http sans redirection https | `curl http://byarms.com` → 200, 55 Ko | Coolify : Force HTTPS (Traefik redirectscheme permanent) |
| High | www injoignable | code 000 | DNS www + domaine déclaré dans Coolify + 301 vers apex |
| High | Description dupliquée 6/8 | crawl.json | `description` par page |
| High | En-têtes de sécurité absents | seuls cache-control et x-powered-by | `headers()` : HSTS, nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy ; CSP en Report-Only d'abord |
| Medium | HTML en `s-maxage=31536000` | en-tête | `revalidate` ou `s-maxage` court + purge au déploiement |
| Medium | 404 Next par défaut | page générique | `app/not-found.tsx` avec navigation |
| Medium | /admin/login indexable | pas de noindex | `robots: { index: false }` dans `app/admin/layout.tsx` |
| Medium | Open Graph incomplet | pas d'image, pas de twitter, pas d'URL | `openGraph.images`, `twitter`, `app/opengraph-image.tsx` |
| Low | Brotli absent, x-powered-by exposé, favicon sans cache | | Traefik brotli, `poweredByHeader: false`, headers cache |

## 3. Contenu — 52/100 · On-page — 44/100

**Fonctionne** : offres lisibles avec **prix publiés** (34 900 € HT / 10 semaines, 29 900 € HT / 8 semaines, Blueprint 4 900 € HT), ton honnête, H1 uniques, FAQ en `<details>` sur les deux offres, photo et nom du fondateur, CTA constant vers /diagnostic, aucune page orpheline.

| Sév. | Finding | Correctif |
|---|---|---|
| Critical | Description identique sur 6 pages, 157 caractères (troncation) | Tableau de descriptions ci-dessous |
| Critical | Aucune preuve E-E-A-T : pas de cas client, témoignage, chiffre, logo | 2 ou 3 cas (même anonymisés ou projets internes ADA, ImmoVision) avec contexte, périmètre, délai, résultat ; page /realisations |
| High | Titles sans mots-clés de requête (« Product Launch », « AI Operations ») | Titles ci-dessous, ≤ 60 caractères, nom d'offre conservé |
| High | Mentions légales incomplètes : société UK sans adresse, directeur de publication, hébergeur, TVA ; contact Gmail personnel sur /mentions-legales et /confidentialite | Compléter (LCEN), email contact@byarms.com, base légale RGPD et conservation sur /confidentialite |
| High | Fondateur et équipe sous-documentés | Section « Qui construit » : bio, expérience, LinkedIn, taille d'équipe |
| High | Pages minces : /confiance 249 mots, /diagnostic 151 | /confiance → processus concret, 600+ mots ; /diagnostic → « ce qui se passe après », délai de réponse |
| High | Jargon non défini : AI Engineering OS, Blueprint, baseline, go/no-go, delivery | Définition en clair à la première occurrence |
| Medium | Phrasé « IA-typique » : antithèses, triptyques, H2 poétiques non informatifs | H2 descriptifs (« Ce que comprend le forfait », « Comment se déroulent les 10 semaines ») |
| Medium | Blocs dupliqués : Method et BottomCTA sur 4 pages, offres à 95 % identiques, FAQ identique | Spécifier chaque offre : livrables, cas d'usage, planning semaine par semaine |
| Medium | Ancres génériques (« Évaluer mon projet » ×8 par page), maillage contextuel faible (/ada ↔ offres ↔ /confiance) | Ancres descriptives, liens dans le corps et la FAQ |
| Medium | H1 d'accueil coupé par `<br>` nus (texte collé pour les crawlers) | `<span>` ou espaces |
| Low | Pas de CTA secondaire à faible friction, pas de dates, aucun contenu informationnel (blog, guides) | Appel 15 min, « Mis à jour le », guides |

### Titles et descriptions proposés
| Page | Title (≤ 60) | Description (≤ 150) |
|---|---|---|
| / | ByARMS — Développement logiciel et IA sur mesure au forfait | Studio francophone : produits logiciels et automatisations IA livrés au forfait, dès 29 900 € HT, code transféré. Propulsé par ADA. |
| /product-launch | Product Launch : développement produit au forfait, MVP en 10 semaines | Lancez votre MVP SaaS ou outil métier en 10 semaines pour 34 900 € HT : conception, développement, tests, déploiement, code transféré. |
| /ai-operations | AI Operations : automatisation IA pour PME au forfait, 8 semaines | Automatisez un processus coûteux avec un agent IA relié à vos outils : 8 semaines, 29 900 € HT, validation humaine, gains mesurés. |
| /ada | ADA : AI Engineering OS, notre système d'ingénierie IA | ADA encadre Claude Code et Codex : mémoire projet, agents spécialisés, permissions et supervision humaine. Notre outil de livraison. |
| /confiance | Engagements ByARMS : code transféré, données, responsabilité | Propriété du code, traçabilité des décisions, traitement des données et responsabilité humaine : le cadre de chaque projet ByARMS. |
| /diagnostic | Évaluer mon projet : orientation en 3 minutes | Décrivez votre projet logiciel ou IA en 3 minutes : budget, priorités, échéance. Première orientation, réponse de l'équipe, sans engagement. |
| /mentions-legales | Mentions légales | Mentions légales de ByARMS, marque d'ARMS INTERNATIONAL LTD : éditeur, contact, hébergement. |
| /confidentialite | Politique de confidentialité | Comment ByARMS utilise les données de votre demande de diagnostic : finalités, droits RGPD, services externes. |

### SXO (expérience de recherche)
| Requête | Page attendue par Google | Ce que propose le site | Écart |
|---|---|---|---|
| développement produit logiciel au forfait | page service avec prix, comparatif, cas clients | /product-launch (prix OK, title jargon) | Moyen |
| automatisation IA PME | guide de cas d'usage + page service | /ai-operations (calculateur de valeur, atout) | Moyen |
| agence IA sur mesure | pages agence, portfolio, avis | Accueil « studio d'ingénierie » | Fort |
| AI engineering | article ou glossaire | /ada (pitch produit) | Fort |
| MVP SaaS forfait | page tarifs / offre MVP | /product-launch (« MVP » absent) | Moyen |

Adéquation personas : dirigeant non technique 5,5/10 (jargon, pas de références sectorielles) ; CTO 4,5/10 (pas de stack, d'architecture, de politique de revue ni de détails sur la confidentialité des modèles IA).

## 4. Données structurées — 0/100

Aucun JSON-LD. Jeu recommandé (blocs complets dans `findings/schema.md`, à corriger sur deux points : les prix sont bien affichés donc `offers` est légitime, et une FAQ visible existe sur les offres donc `FAQPage` est autorisé) :
- Layout : `Organization` (legalName ARMS INTERNATIONAL LTD, identifier 17382099, logo, founder, sameAs LinkedIn à confirmer, contactPoint contact@byarms.com à confirmer) + `WebSite`.
- Accueil : `Person` Jonathan ARMS + `WebPage`.
- /product-launch, /ai-operations : `Service` avec `offers` (34 900 et 29 900 € HT) + `FAQPage` + `BreadcrumbList`.
- /ada : `SoftwareApplication` (publisher org) + `BreadcrumbList`.
- Autres pages : `BreadcrumbList`.
- Intégration : composant `JsonLd` avec échappement `<` → `<`, objets typés dans `lib/schema.ts`.
Point relevé : `components/FounderSection.tsx` pointe vers `ada.byarms.dev` mais ce composant n'est importé nulle part (code mort, comme Footer, Nav et ContactSection, qui contiennent aussi l'ancien Gmail). À supprimer pour éviter une réintroduction.

## 5. Performance — 62/100

Lighthouse mobile local (PageSpeed Insights saturé sans clé API, pas de données CrUX) :

| Page | Perf | LCP | CLS | TBT |
|---|---|---|---|---|
| / | 71 | 12,1 s | 0 | 30 ms |
| /product-launch | 95 | 2,6 s | 0 | 10 ms |
| /ai-operations | 97 | 2,1 s | 0 | 30 ms |
| /ada | 99 | 1,8 s | 0 | 20 ms |

CLS nul et TBT négligeable partout : seul le poids des images pèse. Cause unique du LCP de l'accueil : `byarms-logo.png` (2 089 242 octets) affiché en 58 px avec `priority`, servi brut car `images.unoptimized: true`. `jonathan-arms.jpg` : 1 560 211 octets, 3024×4032, EXIF iPhone. Icône PWA 512 px à 220 Ko. Contraste insuffisant sur un texte de / et /ada (accessibilité 96).

## 6. Images — 35/100
Alt présent partout. Mais : aucun format moderne (WebP/AVIF), aucun redimensionnement, 3,6 Mo d'images pour l'accueil, métadonnées EXIF personnelles non retirées, optimisation Next désactivée.

## 7. AI Search Readiness — 34/100
Crawlers IA non bloqués (GPTBot, ClaudeBot → 200) mais sans politique faute de robots.txt. Aucun llms.txt, aucun fichier de découverte, pas de Markdown. Entité fragmentée entre ByARMS, ARMS INTERNATIONAL LTD, ADA et Jonathan ARMS, sans sameAs. Passages peu citables : pas de définition auto-suffisante d'« AI Engineering OS », « Product Launch », « AI Operations ». Propositions prêtes à coller (définitions de 40 à 60 mots, llms.txt, politique robots par user-agent) dans `findings/geo-agentic.md`. Décision à prendre : autoriser ou non les crawlers d'entraînement (GPTBot, ClaudeBot, Google-Extended, CCBot). Recommandation pour une vitrine qui cherche la notoriété : autoriser.

## 8. Limites de l'audit
Pas de données Search Console, GA4 ni CrUX (aucune clé configurée). Volumes de recherche non mesurés (hypothèses d'intention). Notoriété externe non vérifiée. Lighthouse en laboratoire sur 4 pages. Open Graph non testé en rendu social.

Fiches détaillées : `findings/technical.md`, `findings/content.md`, `findings/schema.md`, `findings/performance.md`, `findings/geo-agentic.md`.
