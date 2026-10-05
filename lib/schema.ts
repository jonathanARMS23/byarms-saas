import { ADA_DOCS_URL, SITE_COMPANY_NUMBER, SITE_DESCRIPTION, SITE_LEGAL_NAME, SITE_NAME, SITE_URL, absoluteUrl } from './site'
import { offerFaq as offerFaqItems } from './content/faq'

export type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[]
export interface JsonLdObject {
  [key: string]: JsonLdValue | undefined
}
export interface JsonLdGraph extends JsonLdObject {
  '@context': 'https://schema.org'
  '@graph': JsonLdObject[]
}

const ORG_ID = `${SITE_URL}/#organization`
const PERSON_ID = `${SITE_URL}/#jonathan-arms`
const WEBSITE_ID = `${SITE_URL}/#website`

const organization: JsonLdObject = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  identifier: SITE_COMPANY_NUMBER,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: absoluteUrl('/byarms-logo.png') },
  description: SITE_DESCRIPTION,
  founder: { '@id': PERSON_ID },
  knowsAbout: ['Développement de produits logiciels', 'Automatisation par IA', 'AI engineering', 'Claude Code', 'Codex'],
  brand: { '@type': 'Brand', name: 'ADA', url: `${SITE_URL}/ada` },
}

const founder: JsonLdObject = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Jonathan ARMS',
  jobTitle: 'CEO et fondateur',
  image: absoluteUrl('/jonathan-arms.jpg'),
  worksFor: { '@id': ORG_ID },
  url: SITE_URL,
  sameAs: ['https://www.linkedin.com/in/jonathan-arms-senior'],
}

const website: JsonLdObject = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORG_ID },
}

/** Graphe commun à toutes les pages (layout racine). */
export const siteGraph: JsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [organization, founder, website],
}

export function breadcrumbGraph(items: Array<{ name: string; path: string }>): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function pageGraph(items: Array<{ name: string; path: string }>): JsonLdGraph {
  return { '@context': 'https://schema.org', '@graph': [breadcrumbGraph(items)] }
}

/** FAQ des pages d'offre, même source que le rendu visible (lib/content/faq.ts). */
function offerFaq(ai: boolean): JsonLdObject {
  return {
    '@type': 'FAQPage',
    mainEntity: offerFaqItems(ai).map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

/** Graphe des pages d'offre (/product-launch, /ai-operations). Prix et durées tels qu'affichés sur la page. */
export function offerGraph(ai: boolean): JsonLdGraph {
  const path = ai ? '/ai-operations' : '/product-launch'
  const name = ai ? 'AI Operations' : 'Product Launch'
  const service: JsonLdObject = {
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType: ai ? 'Automatisation de processus par IA' : 'Développement de produit logiciel',
    description: ai
      ? 'Système IA relié à vos outils, évalué sur une métrique opérationnelle convenue, avec validation humaine. Livré au forfait en 8 semaines.'
      : 'Conception et livraison d’une première version de produit logiciel utilisable, testée et prête à être exploitée. Livrée au forfait en 10 semaines.',
    provider: { '@id': ORG_ID },
    areaServed: 'FR',
    availableLanguage: 'fr',
    url: absoluteUrl(path),
    offers: [
      {
        '@type': 'Offer',
        name: `${name} au forfait`,
        price: ai ? '29900' : '34900',
        priceCurrency: 'EUR',
        description: ai ? '8 semaines à partir du démarrage convenu, hors taxes.' : '10 semaines à partir du démarrage convenu, hors taxes.',
        url: absoluteUrl(path),
      },
      {
        '@type': 'Offer',
        name: ai ? 'AI Opportunity Blueprint' : 'Product Blueprint',
        price: '4900',
        priceCurrency: 'EUR',
        description: '10 jours de cadrage avant la réalisation, hors taxes.',
        url: absoluteUrl(path),
      },
    ],
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [service, offerFaq(ai), breadcrumbGraph([{ name, path }])],
  }
}

/** Graphe de la page /ada. */
export const adaGraph: JsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/ada#software`,
      name: 'ADA',
      alternateName: 'ADA, AI Engineering OS',
      applicationCategory: 'DeveloperApplication',
      description: 'AI Engineering OS multi-engine : orchestration de Claude Code et Codex, mémoire projet, agents spécialisés et contrôle des exécutions sous supervision humaine.',
      url: absoluteUrl('/ada'),
      softwareHelp: { '@type': 'CreativeWork', url: ADA_DOCS_URL },
      publisher: { '@id': ORG_ID },
    },
    breadcrumbGraph([{ name: 'ADA', path: '/ada' }]),
  ],
}
