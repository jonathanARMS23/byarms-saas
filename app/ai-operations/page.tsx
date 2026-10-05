import type { Metadata } from 'next'
import { OfferPage } from '@/components/OfferPage'
import { JsonLd } from '@/components/JsonLd'
import { offerGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'AI Operations : automatisation IA au forfait | ByARMS' },
  description: 'Automatisez un processus coûteux avec un agent IA relié à vos outils : 8 semaines, 29 900 € HT, validation humaine, gains mesurés.',
  alternates: { canonical: '/ai-operations' },
  openGraph: { url: '/ai-operations', images: '/opengraph-image', title: 'AI Operations : automatisation IA au forfait', description: 'Un système IA relié à vos outils, évalué sur une métrique convenue, livré en 8 semaines pour 29 900 € HT.' },
}
export default function Page() { return <><JsonLd data={offerGraph(true)} /><OfferPage ai/></> }
