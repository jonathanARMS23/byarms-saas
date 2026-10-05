# Audit contenu & on-page — byarms.com

## Scores
- **Content Quality : 52/100** — offre claire et prix publiés, mais zéro preuve (cas clients, chiffres, fondateur détaillé), pages minces, jargon.
- **On-Page : 44/100** — 6 pages sur 8 sans meta description propre (héritée), titles sans mots-clés de requête, pas de canonical/JSON-LD, ancres génériques.

## Ce qui fonctionne
- Offre lisible et **prix publiés** (34 900 € HT/10 sem. ; 29 900 € HT/8 sem. ; Blueprint 4 900 €) : rare, très différenciant pour dirigeants.
- Honnêteté de ton (« ne garantit pas l'adoption », « aucune certification revendiquée ») : bon signal de confiance.
- H1 uniques, un seul H1 par page ; FAQ `<details>` sur les 2 pages d'offre ; photo + nom du fondateur en home ; alt présents (0 manquant).
- Maillage complet : aucune page orpheline (nav + footer), CTA constant « Évaluer mon projet » vers /diagnostic?offre=.
- Descriptions de /ada et de l'accueil correctes (157 car., uniques).

## Findings

### Critical
**C1 — Meta description identique sur 6/8 pages** (/product-launch, /ai-operations, /confiance, /diagnostic, /mentions-legales, /confidentialite = copie de l'accueil, 157 car.). Preuve : crawl.json ; `metadata` des pages sans `description`. Correctif : ajouter `description` par page (tableau ci-dessous). Noter aussi 157 car. > 150-155 : risque de troncation.

**C2 — Aucune preuve (E-E-A-T « Experience/Trust »)**. Aucun cas client, témoignage, logo, chiffre, étude ; mentions-legales dit même « exemples illustratifs… pas des études de cas ». Pour une offre à 30-35 k€, c'est le frein n°1. Correctif : 2-3 études de cas (même anonymisées : contexte, périmètre, délai, prix, résultat mesuré) + page /realisations ; à défaut, projets internes (ADA, ImmoVision…) présentés comme démos réelles avec captures.

### High
**H1 — Titles sans mot-clé de requête.** « Product Launch » / « AI Operations » / « Évaluer mon projet » = jargon anglais interne, aucun terme cherché (« développement logiciel », « automatisation IA », « au forfait »). /product-launch 63 car. (tronqué), accueil 61. Correctif : tableau ci-dessous.

**H2 — Mentions légales incomplètes / E-E-A-T légal.** Société UK (LTD) ciblant la France : pas d'adresse du siège, pas de directeur de publication, pas d'hébergeur (obligation LCEN), pas de n° TVA, contact = Gmail personnel (`armsjonathan878@gmail.com`) → signal non pro. Correctif : adresse, directeur de publication (Jonathan ARMS), hébergeur (ex. Vercel Inc.), email `contact@byarms.com`, juridiction ; idem sur /confidentialite (email, DPO/contact, durée de conservation, base légale RGPD, droit de réclamation CNIL).

**H3 — Fondateur/équipe sous-documentés.** Une photo + une ligne. « Équipe distribuée » sans noms, parcours, localisation. Correctif : section « Qui construit » : bio 4 lignes (années d'expérience, stacks, produits livrés), lien LinkedIn/GitHub, taille réelle d'équipe, pays. Ajouter schema `Organization` + `Person`.

**H4 — Pages minces.** /diagnostic 151 mots (page formulaire : acceptable mais sans réassurance), /confiance 249 mots (4 paragraphes génériques, sans preuve). Correctif /confiance : ajouter processus concret (exemple de jalon, extrait de contrat de transfert de code, liste des sous-traitants IA, politique de données) → viser 600+ mots. /diagnostic : ajouter 3 lignes « Ce qui se passe après l'envoi (délai de réponse 48 h, qui répond) », mini-FAQ, prix repères.

**H5 — Jargon et anglicismes non définis** : « AI Engineering OS multi-engine », « Blueprint », « baseline », « go/no-go », « delivery », « Product Evolution Partner ». Le dirigeant non technique décroche. Correctif : phrase de définition en clair à chaque 1re occurrence (« ADA : notre outil interne qui encadre le travail des assistants de code IA… »).

### Medium
**M1 — Phrasé « IA-typique »** : antithèses répétitives (« La puissance des moteurs. Le cadre pour les piloter. » ; « Des outils puissants. Des humains engagés. » ; « Pas une liste de fonctionnalités. »), phrases-slogans courtes en cascade, « Du contexte. Du contrôle. De la visibilité. », triptyques partout, `<br/>` de rythme, « mérite », « sous contrôle ». H2 majoritairement poétiques, non informatifs. Correctif : H2 descriptifs (ex. « Ce que comprend le forfait Product Launch », « Comment se déroulent les 10 semaines »), avec chiffres.

**M2 — Doublons de blocs** : `Method` (4 étapes) + `BottomCTA` répétés sur home, 2 offres, ADA (4 pages) ; FAQ « Quelle place pour ADA ? » duplique /ada ; offres 95 % structurellement identiques (même template OfferPage, mêmes phrases « Commencer par la clarté », FAQ identique). Risque de similarité interne. Correctif : spécifier par offre (exemples de livrables, cas d'usage, durée détaillée par semaine).

**M3 — Ancres génériques/répétées** : « Évaluer mon projet » ×~8 par page vers la même URL ; « Découvrir notre différence », « Comprendre notre ingénierie », « Découvrir nos engagements ». Correctif : ancres descriptives pour liens de contenu (« voir l'offre Product Launch à 34 900 € HT », « notre engagement sur le transfert du code »).

**M4 — Maillage contextuel faible** : /ada ne renvoie pas vers les offres en contenu ; /confiance sans lien vers offres ; offres ne renvoient pas vers /confiance ni /ada dans le corps (FAQ ADA sans lien). Les pages légales ne sont liées que du footer (acceptable). Correctif : liens contextuels dans FAQ (« Quelle place pour ADA ? → /ada »), /confiance ↔ offres.

**M5 — Pas de canonical, pas de JSON-LD, `?offre=` crée des variantes de /diagnostic.** Correctif : `alternates.canonical` par page ; canonical /diagnostic sans paramètre ; JSON-LD Organization, Service (×2 avec `offers`), FAQPage.

**M6 — Hiérarchie H2/H3** : sections « eyebrow » en `<p>` plutôt que titres, h3 utilisés en `style` inline dans OfferPage (« Comment valider la réussite ? » = bon, mais h3 sans h2 propre au sujet). Home : H1 de 3 phrases coupées par `<br>` (lecture crawler : « Lancez votre produit.Transformez vos opérations.Gardez la maîtrise. » sans espaces → vérifier rendu texte). Correctif : espaces/`<span>` plutôt que `<br>` nus ; H1 contenant le mot-clé (voir quick wins).

### Low
- L1 — CTA tout en « Évaluer mon projet » : bien, mais pas de CTA secondaire à faible friction (télécharger exemple de Blueprint, appel 15 min).
- L2 — Date/auteur/mise à jour absents (aucune fraîcheur).
- L3 — Pas de page à fort volume de requêtes (blog/guides) → aucun contenu informationnel.
- L4 — « Equipe francophone »/« Code à vous » en puces courtes non développées en home.

## Citabilité IA (GEO)
Points forts : faits quantifiés (prix, durées, 60 jours de garantie, 10 % de pénalité) = passages citables. Faiblesses :
- Aucune définition autonome (« Qu'est-ce qu'un AI Engineering OS ? ») ; phrases dépendantes du contexte (« Ce que cela change pour votre projet »).
- Listes présentes mais pas de tableau comparatif Product Launch / AI Operations / Advanced / Transformation (prix, durée, périmètre) → à ajouter, très citable.
- FAQ limitée à 4 questions identiques sur 2 pages, sans balisage FAQPage ; absente de home, /ada, /confiance.
- Pas d'entité claire en tête de page (« ByARMS est un studio… basé à… fondé en… »).
- Pas de sources, dates ni auteurs.
Correctif : bloc « En bref » de 2 phrases sous H1 sur chaque offre, ex. : « **Product Launch** est une offre au forfait de 34 900 € HT : ByARMS conçoit, développe et met en production la première version d'un produit logiciel en 10 semaines, code et documentation transférés au client. » + FAQ 8-10 questions balisées.

## Titles / descriptions proposés
| Page | Title proposé (≤60) | Meta description (≤150) |
|---|---|---|
| / | ByARMS — Développement logiciel et IA sur mesure au forfait (57) | Studio français : produits logiciels et automatisations IA livrés au forfait, de 29 900 € HT, code transféré. Propulsé par ADA. (≈128) |
| /product-launch | Développement produit logiciel au forfait · MVP 10 semaines (58) | Lancez votre MVP SaaS ou outil métier en 10 semaines pour 34 900 € HT : conception, développement, tests, déploiement, code transféré. (≈137) |
| /ai-operations | Automatisation IA pour PME au forfait · 8 semaines (50) | Automatisez un processus coûteux avec un agent IA relié à vos outils : 8 semaines, 29 900 € HT, validation humaine, gains mesurés. (≈131) |
| /ada | ADA : AI engineering, notre OS d'ingénierie IA \| ByARMS (54) | ADA encadre Claude Code et Codex : mémoire projet, agents spécialisés, permissions et supervision humaine. Notre outil de livraison. (≈133) |
| /confiance | Engagements ByARMS : code transféré, données, responsabilité (58) | Propriété du code, traçabilité des décisions, traitement des données et responsabilité humaine : le cadre de chaque projet ByARMS. (≈131) |
| /diagnostic | Évaluer mon projet : orientation en 3 minutes \| ByARMS (52) | Décrivez votre projet logiciel ou IA en 3 minutes : budget, priorités, échéance. Première orientation, réponse de l'équipe, sans engagement. (≈141) |
| /mentions-legales | Mentions légales \| ByARMS (24) | Mentions légales de ByARMS, marque d'ARMS INTERNATIONAL LTD : éditeur, contact, hébergement. (≈92) + `noindex` optionnel |
| /confidentialite | Politique de confidentialité \| ByARMS (36) | Comment ByARMS utilise les données de votre demande de diagnostic : finalités, droits RGPD, services externes. (≈108) |

## SXO
Requêtes cibles (hypothèses plausibles, non mesurées en volume ; type de page attendu par Google = jugement d'après la nature de l'intention, à vérifier par SERP) :

| Requête | Intention | Page attendue | Ce que propose le site | Écart |
|---|---|---|---|---|
| développement produit logiciel au forfait | commerciale | page service + prix, comparatif d'agences, cas clients | /product-launch (prix OK, mais title « Product Launch ») | Moyen : mots-clés absents, preuves absentes |
| automatisation IA PME | info + commerciale | guide/cas d'usage + page service | /ai-operations (calculateur de valeur = atout) | Moyen : pas de cas d'usage par métier, pas d'exemples chiffrés |
| agence IA sur mesure | commerciale locale/annuaire | pages agence, portfolios, avis, listings | Home (« studio d'ingénierie ») | Fort : « agence/studio » non aligné, pas de références, pas d'avis |
| AI engineering | informationnelle/définition | article/glossaire, guide | /ada (pitch produit interne) | Fort : pas de contenu éducatif ; intention de recherche ≠ promo |
| MVP SaaS forfait | commerciale | page tarifs/offre MVP, guides prix | /product-launch (mentionne « première version », pas « MVP ») | Moyen : terme MVP/SaaS absent des titres/H1 |

Personas :
- **Dirigeant non technique PME** — score d'adéquation **5,5/10** : prix, périmètre et honnêteté rassurent ; bloqués par jargon (« OS multi-engine », « baseline », « go/no-go »), absence de références sectorielles, absence de cas d'usage concrets (« facturation fournisseurs », « tri d'emails »).
- **CTO / responsable technique** — **4,5/10** : manque de stack, architecture, exemples de code/dépôt, politique de revue, SLA, détails de sécurité IA (hébergement, modèles), niveaux de qualité réels ; ADA renvoie à une doc externe sans résumé technique suffisant ; « Claude Code + Codex » peut inquiéter sur la confidentialité sans détail.

Recommandations SXO : page « Tarifs et formules » (tableau comparatif) ; pages cas d'usage IA (3 métiers) ; guide « Combien coûte un MVP SaaS en 2026 ? » et glossaire « AI engineering » ; page /equipe ; page /realisations.

## Quick wins (≤ 1 jour)
1. Ajouter `description` unique à chaque `metadata` (tableau) — 6 pages.
2. Réécrire les titles avec mot-clé (table) ; garder ≤ 60 car.
3. Remplacer le Gmail par contact@byarms.com ; compléter mentions légales (adresse, directeur de publication, hébergeur).
4. Définir « ADA » et « Blueprint » en une phrase claire à la 1re occurrence.
5. Ajouter `alternates.canonical` + JSON-LD Organization/Service/FAQPage.
6. Insérer un bloc « En bref » citable sous chaque H1 d'offre + tableau comparatif des 4 formules.
7. Lien contextuel de la FAQ « Quelle place pour ADA ? » vers /ada et de /confiance vers les offres.
8. Remplacer 4-5 H2 poétiques par des H2 descriptifs ; raccourcir les antithèses.
9. Publier 1 premier cas (même projet interne) avec chiffres.
