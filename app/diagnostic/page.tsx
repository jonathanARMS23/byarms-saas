import type { Metadata } from 'next'
import { Shell, Intro } from '@/components/Marketing'
import { Diagnostic } from '@/components/Diagnostic'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'
export const metadata: Metadata = {
  title: 'Évaluer mon projet : orientation en 3 minutes',
  description: 'Décrivez votre projet logiciel ou IA en 3 minutes : budget, priorités, échéance. Première orientation, réponse de l’équipe, sans engagement.',
  alternates: { canonical: '/diagnostic' },
  openGraph: { url: '/diagnostic', images: '/opengraph-image', title: 'Évaluer mon projet : orientation en 3 minutes' },
}
export default async function Page({searchParams}:{searchParams:Promise<{offre?:string}>}) { const {offre}=await searchParams;return <Shell><JsonLd data={pageGraph([{ name: 'Évaluer mon projet', path: '/diagnostic' }])} /><Intro eyebrow="Un premier pas concret" title="Votre projet mérite un cadre clair." text="Trois minutes pour présenter votre enjeu, votre budget et vos priorités. Vous obtenez une première orientation, puis notre équipe examine votre demande. Sans engagement."/><section className="m-section" style={{paddingTop:25}}><Diagnostic initialOffer={offre}/></section></Shell> }
