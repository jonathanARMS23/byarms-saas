# Audit GEO / Agent readiness — byarms.com (2026-10-05)

## Score AI Search Readiness : 34/100
| Axe | /100 pondéré | Note |
|---|---|---|
| Accès crawlers IA | 10/25 | 200 pour GPTBot/ClaudeBot (aucun WAF), mais robots.txt 404 = aucune politique |
| Citabilité des passages | 8/25 | Contenu clair mais peu de définitions auto-suffisantes, pas de FAQ/listes/chiffres sourcés |
| Entités / marque | 6/20 | JSON-LD 0, sameAs 0, nom éclaté ByARMS / ARMS INTERNATIONAL LTD / ADA |
| Structure technique | 6/15 | Landmarks OK, mais pas de canonical, meta description identique sur 6/8 pages, pas de sitemap |
| Agent readiness | 4/15 | Bon a11y, aucun fichier de découverte (llms.txt, agent-card, Markdown) |

## Ce qui fonctionne
- Crawlers IA non bloqués : `GPTBot`, `ClaudeBot` → HTTP 200 sur `/` et `/diagnostic` (pas de WAF).
- HTML statique pré-rendu (x-nextjs-prerender, cache HIT) : contenu lisible sans JS par les crawlers IA.
- A11y solide (Marketing.tsx) : `<html lang="fr">`, skip-link `#main`, `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`, liens de marque avec `aria-label`, images décoratives `alt=""`, 0 image sans alt (crawl).
- H1 uniques et titres de page distincts ; ADA défini dans le H1 de /ada (« Un AI Engineering OS. Deux moteurs. Une direction humaine. »).
- /diagnostic : aucun `<form>` dans le code (CTA seulement) → pas de problème de labels.
- Documentation externe `ada.byarms.com` (bonne source de citation à lier).
- Mentions légales avec n° société (17382099) : signal de confiance exploitable en `Organization`.

## Findings

### Critical
1. **robots.txt absent (404)** — `curl /robots.txt` → 404 HTML. Aucune politique pour GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot ; pas de `Sitemap:`. Correctif : `app/robots.ts` (ci-dessous).
2. **Aucun JSON-LD** (0 sur 8 pages) : aucune entité Organization / Person / SoftwareApplication / Service lisible par machine. Correctif : bloc `Organization` + `WebSite` dans `app/layout.tsx`, `SoftwareApplication` sur /ada, `Service` sur /product-launch et /ai-operations, `Person` (Jonathan ARMS, `public/jonathan-arms.jpg` existe).

### High
3. **sitemap.xml 404** — `app/sitemap.ts` avec les 8 URLs (déclaré dans robots.ts).
4. **Pas de canonical** sur 8 pages — `metadata.alternates.canonical` par page + `metadataBase: new URL('https://byarms.com')`.
5. **Meta description dupliquée** sur 6/8 pages (« ByARMS transforme vos projets… » identique sur /product-launch, /ai-operations, /confiance, /diagnostic, /mentions-legales, /confidentialite) → les snippets IA/SERP sont indifférenciés. Écrire une description propre par page (120–155 car.).
6. **Pas de page pilier / FAQ** pour les requêtes IA (« qu'est-ce qu'un AI Engineering OS », « combien coûte un MVP au forfait », « studio logiciel IA forfait »). Créer `/ada/ai-engineering-os` (ou section dans /ada) + FAQ avec `FAQPage` JSON-LD (rendu visible obligatoire).
7. **Entité fragmentée** : « ByARMS » (site, H1), « ARMS INTERNATIONAL LTD » (footer seulement), « ADA » (produit), « Jonathan ARMS » sans lien. Aucun `sameAs`/LinkedIn. Unifier : phrase d'entité unique répétée (« ByARMS est la marque d'ARMS INTERNATIONAL LTD ») + `sameAs` [LinkedIn société, LinkedIn fondateur, GitHub ADA, ada.byarms.com].

### Medium
8. **llms.txt absent** (404), llms-full.txt (404) — optionnel (ignoré par Google Search) mais coût nul et utile aux agents/Copilot-like tools. Contenu proposé plus bas.
9. **Pas de Markdown** : `Accept: text/markdown` → 200 text/html. Optionnel ; à défaut, llms.txt suffit.
10. **Passages peu citables** : pas de définition auto-suffisante de « AI Engineering OS », « Product Launch », « AI Operations » (formulation marketing). Chiffres/preuves non sourcés. Voir passages ci-dessous.
11. **Fichiers de découverte agents** : `/.well-known/agent-card.json`, `ai-plugin.json`, `ai-catalog.json` → tous 404. Non prioritaire pour une vitrine sans API ; ne pas inventer d'agent.
12. **Pas de Content-Signal** (aucun robots.txt) — à ajouter dans robots.txt (`Content-Signal: search=yes, ai-input=yes, ai-train=no`) ; Next `robots.ts` ne supporte pas ce champ nativement → servir via `app/robots.txt/route.ts`.

### Low
13. Page /diagnostic courte (151 mots) sans formulaire ni description propre : renforcer la description, ajouter un `ContactPage`/`Action` si pertinent.
14. Pas de dates (`datePublished/dateModified`) ni d'auteur visible → faiblit E-E-A-T pour la citation ; ajouter « Mis à jour le … » sur piliers.
15. Pas d'og:image/Twitter card vérifié (hors périmètre GEO, à confirmer par l'audit technique).

## Recommandation robots (choix explicite)
- Autoriser recherche/citation : `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`, `Googlebot`, `Bingbot`.
- Entraînement : décision à prendre. Recommandé pour une vitrine B2B qui cherche la notoriété : **autoriser** (visibilité dans les modèles) ; option prudente : bloquer `GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`. Blocage n'affecte ni AI Overviews ni la recherche.
- Bloquer `/admin`, `/api`, `/onboarding` pour tous.

```ts
// app/robots.ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin', '/api', '/onboarding']
  return {
    rules: [
      { userAgent: ['OAI-SearchBot','ChatGPT-User','PerplexityBot','Perplexity-User','Claude-SearchBot','Claude-User','Googlebot','Bingbot'], allow: '/', disallow },
      // Entraînement : passer en disallow: '/' pour refuser
      { userAgent: ['GPTBot','ClaudeBot','Google-Extended','CCBot','Applebot-Extended'], allow: '/', disallow },
      { userAgent: '*', allow: '/', disallow },
    ],
    sitemap: 'https://byarms.com/sitemap.xml',
    host: 'https://byarms.com',
  }
}
```

## Passages citables proposés (à placer en tête de page, 40–60 mots, auto-suffisants)
- **/ada** : « ADA est l'AI Engineering OS de ByARMS : un système d'ingénierie logicielle qui orchestre Claude Code et Codex via des agents spécialisés, une mémoire projet et un contrôle des exécutions, sous supervision humaine. Il sert à livrer des produits logiciels et des systèmes IA de façon reproductible et traçable. »
- **/product-launch** : « Product Launch est l'offre ByARMS qui transforme un projet numérique en produit commercialisable, au forfait : cadrage, conception, développement et mise en ligne par ADA, avec un périmètre et un prix fixés avant le démarrage. » (ajouter durée type et livrables en liste à puces)
- **/ai-operations** : « AI Operations est l'offre ByARMS qui automatise un processus métier coûteux par un système IA opérationnel (agents, intégrations, contrôle humain), livré au forfait et mesuré sur le temps ou les coûts économisés. » (ajouter 1 exemple chiffré sourcé)
- FAQ (6–8 Q/R) : Qu'est-ce qu'un AI Engineering OS ? Quelle différence avec un copilote de code ? Que couvre le forfait ? Qui détient le code ? Comment l'humain garde-t-il le contrôle ? Où sont hébergées les données ?

## JSON-LD (layout.tsx, à adapter)
```json
{"@context":"https://schema.org","@graph":[
{"@type":"Organization","@id":"https://byarms.com/#org","name":"ByARMS","legalName":"ARMS INTERNATIONAL LTD","url":"https://byarms.com","logo":"https://byarms.com/android-chrome-512x512.png","founder":{"@id":"https://byarms.com/#jonathan"},"sameAs":["<LinkedIn société>","<LinkedIn Jonathan>","<GitHub>","https://ada.byarms.com"]},
{"@type":"Person","@id":"https://byarms.com/#jonathan","name":"Jonathan ARMS","jobTitle":"Fondateur","image":"https://byarms.com/jonathan-arms.jpg","worksFor":{"@id":"https://byarms.com/#org"}},
{"@type":"WebSite","url":"https://byarms.com","name":"ByARMS","inLanguage":"fr"}]}
```
Sur /ada : `SoftwareApplication` (name ADA, applicationCategory DeveloperApplication, publisher @id org).

## llms.txt proposé (public/llms.txt)
```
# ByARMS

> ByARMS (ARMS INTERNATIONAL LTD) est un studio francophone de produits logiciels et de systèmes IA, livrés au forfait avec ADA, son AI Engineering OS. Fondateur : Jonathan ARMS.

## Offres
- [Product Launch](https://byarms.com/product-launch): du projet numérique au produit commercialisable, au forfait.
- [AI Operations](https://byarms.com/ai-operations): automatisation d'un processus coûteux par un système IA, sous contrôle humain.

## ADA
- [ADA, AI Engineering OS](https://byarms.com/ada): orchestration Claude Code et Codex, mémoire projet, agents spécialisés, contrôle des exécutions.
- [Documentation ADA](https://ada.byarms.com): documentation technique.

## Confiance et contact
- [Notre engagement](https://byarms.com/confiance): transparence et responsabilité.
- [Évaluer mon projet](https://byarms.com/diagnostic): premier cadrage.
- [Informations légales](https://byarms.com/mentions-legales)

## Optional
- [Confidentialité](https://byarms.com/confidentialite)
```

## Quick wins (≈ 1 journée)
1. `app/robots.ts` + `app/sitemap.ts` (30 min) → +12 pts.
2. JSON-LD Organization/Person/WebSite dans layout + `metadataBase` + canonical par page (1 h) → +10 pts.
3. Descriptions meta uniques sur 6 pages (30 min).
4. `public/llms.txt` (10 min).
5. Paragraphe de définition en tête de /ada, /product-launch, /ai-operations (1 h) + `sameAs` LinkedIn.
6. Ensuite : FAQ + page pilier « AI Engineering OS » (priorité contenu, +15 pts), mentions externes (LinkedIn, GitHub ADA, annuaires, Product Hunt) pour la reconnaissance d'entité.

Limites : mentions externes/notoriété de marque non vérifiées (pas de WebSearch ici) ; score estimé sans test de requêtes IA réelles.
