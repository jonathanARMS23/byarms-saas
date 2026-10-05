import type { JsonLdGraph } from '@/lib/schema'

/**
 * Injecte un bloc JSON-LD. Le remplacement de `<` évite toute fermeture
 * prématurée de la balise script si une valeur contient du HTML.
 */
export function JsonLd({ data }: { data: JsonLdGraph }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
