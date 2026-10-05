import type { Metadata } from 'next'
import { OfferPage } from '@/components/OfferPage'
import { JsonLd } from '@/components/JsonLd'
import { offerGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Product Launch : développement produit au forfait | ByARMS' },
  description: 'Lancez votre MVP SaaS ou outil métier en 10 semaines pour 34 900 € HT : conception, développement, tests, déploiement, code transféré.',
  alternates: { canonical: '/product-launch' },
  openGraph: { url: '/product-launch', images: '/opengraph-image', title: 'Product Launch : développement produit au forfait', description: 'Une première version utilisable, testée et prête à être exploitée, livrée en 10 semaines pour 34 900 € HT.' },
}
export default function Page() { return <><JsonLd data={offerGraph(false)} /><OfferPage/></> }
