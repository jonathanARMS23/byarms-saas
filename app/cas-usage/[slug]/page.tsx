import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shell, Intro, CTA, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'
import { USE_CASES, findUseCase } from '@/lib/content/use-cases'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return USE_CASES.map(u => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const u = findUseCase(slug)
  if (!u) return {}
  return {
    title: u.title,
    description: u.description,
    alternates: { canonical: `/cas-usage/${u.slug}` },
    openGraph: { url: `/cas-usage/${u.slug}`, images: '/opengraph-image', title: u.title },
  }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const u = findUseCase(slug)
  if (!u) notFound()
  const others = USE_CASES.filter(o => o.slug !== u.slug)
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Cas d’usage', path: '/cas-usage' }, { name: u.name, path: `/cas-usage/${u.slug}` }])} />
    <Intro eyebrow="AI Operations / Cas d’usage" title={u.title} text={u.description} />
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> {u.brief}</p></section>
    <section className="m-section m-detail-grid" style={{paddingTop:0}}>
      <div>
        <p className="m-eyebrow">Aujourd’hui</p>
        <h2>Le processus manuel typique</h2>
        <ul className="m-list">{u.manual.map(s => <li key={s}>{s}</li>)}</ul>
        <p className="m-eyebrow" style={{marginTop:36}}>Avec un système IA</p>
        <h2>Ce que le système automatise</h2>
        <ul className="m-list">{u.automated.map(s => <li key={s}>{s}</li>)}</ul>
        <p className="m-eyebrow" style={{marginTop:36}}>Validation humaine</p>
        <h2>Ce qui reste décidé par une personne</h2>
        <ul className="m-list">{u.human.map(s => <li key={s}>{s}</li>)}</ul>
        <p className="m-note">Le système présente les cas à trancher avec les informations utiles et enregistre la décision. Il ne remplace pas la responsabilité de l’opérateur, il lui évite les tâches sans valeur de décision.</p>
        <p className="m-eyebrow" style={{marginTop:36}}>Mesure</p>
        <h2>Comment mesurer le gain, avant et après</h2>
        <p>Avant la réalisation, nous relevons la baseline, c’est-à-dire la situation de départ, sur un échantillon représentatif. Après la mise en production, les mêmes indicateurs sont comparés sur le même type de cas. Aucun gain n’est annoncé avant cette mesure.</p>
        <ul className="m-list">{u.metrics.map(s => <li key={s}>{s}</li>)}</ul>
      </div>
      <aside className="m-panel">
        <p className="m-eyebrow">Systèmes connectés typiques</p>
        <ul className="m-list">{u.systems.map(s => <li key={s}>{s}</li>)}</ul>
        <p className="m-eyebrow" style={{marginTop:28}}>Conditions de réussite</p>
        <ul className="m-list">{u.conditions.map(s => <li key={s}>{s}</li>)}</ul>
        <p className="m-note">Périmètre de l’offre <Link href="/ai-operations">AI Operations</Link> : un processus, jusqu’à trois systèmes connectés, un agent principal avec validation humaine, 8 semaines, 29 900 € HT. Le Blueprint de 10 jours, 4 900 € HT, confirme la pertinence avant d’engager la réalisation.</p>
        <CTA href="/diagnostic?offre=ai" />
      </aside>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Autres cas d’usage</p><h2>Deux autres processus détaillés</h2></div><p><Link className="m-text-link" href="/cas-usage">Tous les cas d’usage ↗</Link></p></div>
      <div className="m-offers">
        {others.map(o => <Link key={o.slug} href={`/cas-usage/${o.slug}`} className="m-offer"><div className="m-offer-top"><span>AI OPERATIONS</span></div><h3>{o.name}</h3><p>{o.description}</p><div className="m-offer-bottom"><span>Lire la fiche</span><span aria-hidden="true">→</span></div></Link>)}
      </div>
    </section>
    <BottomCTA />
  </Shell>
}
