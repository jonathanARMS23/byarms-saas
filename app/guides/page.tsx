import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Guides : coût d’un MVP SaaS, AI Engineering OS',
  description: 'Guides ByARMS pour décider avant d’engager un budget : combien coûte un MVP SaaS, ce qu’est un AI Engineering OS et quelles questions poser à un prestataire qui utilise l’IA.',
  alternates: { canonical: '/guides' },
  openGraph: { url: '/guides', images: '/opengraph-image', title: 'Guides ByARMS' },
}

const GUIDES: Array<{ href: string; name: string; description: string }> = [
  { href: '/guides/combien-coute-un-mvp-saas', name: 'Combien coûte un MVP SaaS ?', description: 'Fourchettes par approche, ce qui fait varier le prix et ce qu’il faut exiger dans un devis, avec les forfaits ByARMS comme point de référence.' },
  { href: '/guides/ai-engineering-os', name: 'Qu’est-ce qu’un AI Engineering OS ?', description: 'Définition, différence avec un copilote de code, composants, et questions à poser à un prestataire qui développe avec l’IA.' },
]

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Guides', path: '/guides' }])} />
    <Intro eyebrow="Guides" title="Décider avant d’engager un budget." text="Des réponses directes aux questions que nous recevons le plus souvent avant un projet, écrites pour les dirigeants et les responsables techniques." />
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-offers">
        {GUIDES.map(g => <Link key={g.href} href={g.href} className="m-offer"><div className="m-offer-top"><span>GUIDE</span></div><h3>{g.name}</h3><p>{g.description}</p><div className="m-offer-bottom"><span>Lire le guide</span><span aria-hidden="true">→</span></div></Link>)}
      </div>
      <p className="m-note">Ces guides reflètent notre pratique et nos prix publics. Ils ne remplacent pas un cadrage de votre projet : <Link href="/diagnostic">évaluer mon projet</Link>.</p>
    </section>
    <BottomCTA />
  </Shell>
}
