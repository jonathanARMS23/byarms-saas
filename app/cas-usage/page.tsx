import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, CTA, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'
import { USE_CASES } from '@/lib/content/use-cases'

export const metadata: Metadata = {
  title: 'Cas d’usage AI Operations : processus automatisables',
  description: 'Factures fournisseurs, emails clients, reporting : trois processus que l’offre AI Operations automatise, ce qui reste validé par un humain et comment mesurer le gain.',
  alternates: { canonical: '/cas-usage' },
  openGraph: { url: '/cas-usage', images: '/opengraph-image', title: 'Cas d’usage AI Operations' },
}

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Cas d’usage', path: '/cas-usage' }])} />
    <Intro eyebrow="AI Operations / Cas d’usage" title="Quels processus se prêtent à l’automatisation par IA ?" text="Trois exemples de processus répétitifs que nous rencontrons dans les PME, décrits sans promesse de résultat : ce qui est automatisable, ce qui reste humain et ce qu’il faut mesurer." />
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> Un processus se prête à l’automatisation par IA quand il est répétitif, régulier en volume, fondé sur des règles explicites et quand ses exceptions peuvent être identifiées et confiées à une personne. L’offre <Link href="/ai-operations">AI Operations</Link> de ByARMS livre un tel système en 8 semaines, pour 29 900 € HT, après un cadrage qui mesure la situation de départ.</p></section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Trois processus</p><h2>Les cas d’usage détaillés</h2></div><p>Chaque fiche décrit le processus manuel, la part automatisable, les validations humaines et les indicateurs à suivre.</p></div>
      <div className="m-offers">
        {USE_CASES.map(u => (
          <Link key={u.slug} href={`/cas-usage/${u.slug}`} className="m-offer">
            <div className="m-offer-top"><span>AI OPERATIONS</span></div>
            <h3>{u.name}</h3>
            <p>{u.description}</p>
            <div className="m-offer-bottom"><span>Lire la fiche</span><span aria-hidden="true">→</span></div>
          </Link>
        ))}
      </div>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-panel">
        <p className="m-eyebrow">Avant de choisir un processus</p>
        <h2>Comment nous vérifions qu’un processus vaut la peine d’être automatisé</h2>
        <ul className="m-list">
          <li>Volume et fréquence : un traitement quotidien ou hebdomadaire, pas une tâche occasionnelle.</li>
          <li>Règles explicites : les opérateurs peuvent expliquer comment ils décident, même si la règle a des exceptions.</li>
          <li>Données accessibles : les informations nécessaires existent dans un outil connectable, pas uniquement dans des têtes.</li>
          <li>Exceptions identifiables : on sait reconnaître les cas qui doivent remonter à une personne.</li>
          <li>Mesure possible : temps, délai ou taux d’erreurs peuvent être relevés avant et après.</li>
        </ul>
        <p className="m-note">L’AI Opportunity Blueprint, 10 jours pour 4 900 € HT, applique cette grille à votre processus et se conclut par une décision go/no-go : poursuivre, réorienter ou arrêter.</p>
        <CTA href="/diagnostic?offre=ai" />
      </div>
    </section>
    <BottomCTA />
  </Shell>
}
