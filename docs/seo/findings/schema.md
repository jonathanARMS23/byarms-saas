# Audit Schema.org — byarms.com

## Score : 0/100 (aucun JSON-LD). Cible après intégration : ~85/100.

## Findings
1. **Critique** — Aucun JSON-LD sur les 8 pages (Organization, WebSite, Person absents → pas d'entité de marque pour Google/LLM).
2. **Haute** — Incohérence lien ADA : `FounderSection.tsx:73` pointe vers `https://ada.byarms.dev` ; partout ailleurs `https://ada.byarms.com`. À corriger (sameAs/url cohérents).
3. **Moyenne** — Pas de FAQ visible sur le site → FAQPage NON généré (le markup sans contenu visible est interdit).
4. **Moyenne** — Prix : aucun prix affiché confirmé dans OfferPage ; seule mention « prix hors taxes » en mentions légales → Service sans `offers`. À ajouter si un prix public apparaît.
5. **Moyenne** — Adresse postale et téléphone absents du site → omis (« À CONFIRMER »). Seul email : `armsjonathan878@gmail.com` (mentions légales) ; l'envoi utilise `contact@byarms.com` → à confirmer lequel publier (contactPoint ci-dessous utilise contact@byarms.com, À CONFIRMER).
6. **Basse** — Pas de metadataBase / canonical dans layout.tsx (hors périmètre schema, mais utile pour les `@id`).
7. **Basse** — Seul réseau social : LinkedIn du fondateur (pas de page LinkedIn société) → sameAs Organization = vide/À CONFIRMER ; sameAs Person = LinkedIn.
8. Contenu fondateur : « 6+ ans », « basé à Madagascar » → `workLocation` non mis (donnée perso, choix éditorial). `jobTitle` repris du site.
9. `/confiance`, `/diagnostic`, `/mentions-legales`, `/confidentialite` : pas lus en détail ; BreadcrumbList + WebPage simple suffisent.

## JSON-LD par page

### Racine (layout) — Organization + WebSite (toutes les pages)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://byarms.com/#organization",
      "name": "ByARMS",
      "legalName": "ARMS INTERNATIONAL LTD",
      "url": "https://byarms.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://byarms.com/byarms-logo.png"
      },
      "image": "https://byarms.com/byarms-logo.png",
      "description": "ByARMS transforme vos projets numériques et vos opérations en produits logiciels et systèmes IA opérationnels, au forfait, avec ADA, notre AI Engineering OS.",
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "Company number (UK Companies House)",
        "value": "17382099"
      },
      "foundingLocation": { "@type": "Country", "name": "Royaume-Uni" },
      "founder": { "@id": "https://byarms.com/#jonathan-arms" },
      "knowsLanguage": "fr",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contact@byarms.com",
        "availableLanguage": "fr",
        "description": "À CONFIRMER : email public (contact@byarms.com vs armsjonathan878@gmail.com)"
      },
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://byarms.com/#website",
      "url": "https://byarms.com",
      "name": "ByARMS",
      "inLanguage": "fr-FR",
      "publisher": { "@id": "https://byarms.com/#organization" }
    }
  ]
}
```
Notes : retirer `"description"` du contactPoint avant mise en prod (champ de rappel). `sameAs: []` à retirer tant qu'aucun profil société n'existe. Adresse (`address`) et `telephone` : **À CONFIRMER**, volontairement omis.

### Home `/` — Person (fondateur) + WebPage
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://byarms.com/#jonathan-arms",
      "name": "Jonathan ARMS",
      "jobTitle": "CEO & Fondateur, Senior Full-Stack & AI Engineer",
      "image": "https://byarms.com/jonathan-arms.jpg",
      "url": "https://byarms.com/#founder",
      "worksFor": { "@id": "https://byarms.com/#organization" },
      "sameAs": ["https://www.linkedin.com/in/jonathan-arms-senior"]
    },
    {
      "@type": "WebPage",
      "@id": "https://byarms.com/#webpage",
      "url": "https://byarms.com/",
      "name": "ByARMS — Produits logiciels & systèmes IA, powered by ADA",
      "isPartOf": { "@id": "https://byarms.com/#website" },
      "about": { "@id": "https://byarms.com/#organization" },
      "inLanguage": "fr-FR"
    }
  ]
}
```

### `/product-launch` — Service + BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://byarms.com/product-launch#service",
      "name": "Product Launch",
      "serviceType": "Conception et livraison de produit logiciel",
      "description": "Cadrage du parcours prioritaire, puis conception et livraison d'une application utilisable, testée et prête à être exploitée : UX/UI, frontend, backend, authentification, espace administrateur, deux intégrations, tests prioritaires, déploiement, analytics, code et documentation transférés au client.",
      "provider": { "@id": "https://byarms.com/#organization" },
      "areaServed": "FR",
      "url": "https://byarms.com/product-launch"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://byarms.com/" },
        { "@type": "ListItem", "position": 2, "name": "Product Launch", "item": "https://byarms.com/product-launch" }
      ]
    }
  ]
}
```
Pas d'`offers` : aucun prix affiché confirmé.

### `/ai-operations` — Service + BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://byarms.com/ai-operations#service",
      "name": "AI Operations",
      "serviceType": "Automatisation de processus métier par systèmes IA",
      "description": "Système IA relié à vos outils pour automatiser un processus coûteux : un processus et un département, jusqu'à trois systèmes connectés, un agent principal avec validation humaine, jeu d'évaluation, gestion des exceptions, monitoring, plafond de coûts, formation et rapport avant/après.",
      "provider": { "@id": "https://byarms.com/#organization" },
      "areaServed": "FR",
      "url": "https://byarms.com/ai-operations"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://byarms.com/" },
        { "@type": "ListItem", "position": 2, "name": "AI Operations", "item": "https://byarms.com/ai-operations" }
      ]
    }
  ]
}
```

### `/ada` — SoftwareApplication + BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://byarms.com/ada#software",
      "name": "ADA",
      "alternateName": "ADA — AI Engineering OS",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "À CONFIRMER",
      "description": "Système d'ingénierie ByARMS : Claude Code et Codex dans un cadre d'exécution commun, mémoire projet, agents spécialisés, contrats d'exécution et gouvernance des budgets, sous supervision humaine.",
      "url": "https://ada.byarms.com",
      "softwareHelp": { "@type": "CreativeWork", "url": "https://ada.byarms.com" },
      "creator": { "@id": "https://byarms.com/#organization" },
      "publisher": { "@id": "https://byarms.com/#organization" },
      "inLanguage": "fr"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://byarms.com/" },
        { "@type": "ListItem", "position": 2, "name": "ADA", "item": "https://byarms.com/ada" }
      ]
    }
  ]
}
```
Pas d'`offers` ni `aggregateRating` (non affichés — ne pas inventer). Retirer `operatingSystem` si non confirmé (pas requis hors rich results). ADA n'est pas vendu comme produit installable (cf. page : « pas nécessairement une installation d'ADA chez vous »).

### `/confiance`, `/diagnostic`, `/mentions-legales`, `/confidentialite` — BreadcrumbList (modèle)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://byarms.com/" },
    { "@type": "ListItem", "position": 2, "name": "Informations légales", "item": "https://byarms.com/mentions-legales" }
  ]
}
```
FAQPage : non applicable (aucune FAQ).

## Composant `components/JsonLd.tsx`
```tsx
type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

### Où l'appeler
- `app/layout.tsx` : `<JsonLd data={orgWebsiteGraph} />` dans `<body>` (Organization + WebSite, une fois, toutes pages).
- `app/page.tsx` : graphe Person + WebPage.
- `app/product-launch/page.tsx`, `app/ai-operations/page.tsx`, `app/ada/page.tsx` : graphe Service/SoftwareApplication + BreadcrumbList.
- Pages légales/confiance/diagnostic : BreadcrumbList seul.
- Stocker les objets dans `lib/schema.ts` (constantes typées) ; `@id` communs permettent les références croisées. Vérifier ensuite avec le Rich Results Test / validator.schema.org (Next 16 : lire `node_modules/next/dist/docs/` pour la convention script JSON-LD).
