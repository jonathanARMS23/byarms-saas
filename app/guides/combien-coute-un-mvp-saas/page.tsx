import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, CTA, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Combien coûte un MVP SaaS ? Fourchettes et critères',
  description: 'Freelance, agence, studio au forfait ou équipe interne : fourchettes de coût d’un MVP SaaS, ce qui fait varier le prix et ce qu’il faut exiger dans un devis.',
  alternates: { canonical: '/guides/combien-coute-un-mvp-saas' },
  openGraph: { url: '/guides/combien-coute-un-mvp-saas', images: '/opengraph-image', title: 'Combien coûte un MVP SaaS ?' },
}

const ROWS: Array<[string, string, string, string]> = [
  ['Freelance seul', 'Variable, souvent au temps passé', 'Prix d’entrée bas, relation directe', 'Dépend d’une personne ; UX, tests, déploiement et documentation souvent hors périmètre'],
  ['Agence au temps passé', 'Devis sur estimation, facturation à la journée', 'Équipe complète, méthodologie', 'Le risque de dépassement est porté par le client ; périmètre mouvant'],
  ['Studio au forfait, comme ByARMS', 'Product Launch : 34 900 € HT, 10 semaines ; Advanced : 49 900 à 79 900 € HT', 'Périmètre, prix et calendrier fixés après cadrage ; code transféré', 'Exige un cadrage sérieux ; les changements de périmètre sont chiffrés à part'],
  ['Équipe interne', 'Salaires chargés de 2 à 3 personnes sur plusieurs mois, plus le recrutement', 'Connaissance métier conservée, continuité', 'Délai de recrutement, coût fixe avant le premier euro de revenu'],
]

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Guides', path: '/guides' }, { name: 'Combien coûte un MVP SaaS ?', path: '/guides/combien-coute-un-mvp-saas' }])} />
    <Intro eyebrow="Guides / Budget" title="Combien coûte un MVP SaaS ?" text="Le prix d’un MVP dépend moins de la technologie que du périmètre, du niveau de finition exigé et de qui porte le risque de dépassement. Ce guide donne des repères et une grille de lecture pour comparer des devis." />
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> Un MVP, ou produit minimum viable, est la première version d’un logiciel qui permet à ses utilisateurs d’accomplir une tâche essentielle en conditions réelles. Son coût varie selon l’approche choisie : un freelance, une agence au temps passé, un studio au forfait ou une équipe interne. Chez ByARMS, un MVP au forfait coûte 34 900 € HT pour 10 semaines, code transféré, après un cadrage de 10 jours à 4 900 € HT.</p></section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Repères</p><h2>Les fourchettes de coût selon l’approche</h2></div><p>Repères issus de notre pratique. Les prix de tiers varient selon le pays, l’expérience et le périmètre.</p></div>
      <div className="m-table-wrap">
        <table className="m-table">
          <caption>Comparaison des approches pour réaliser un MVP SaaS</caption>
          <thead><tr><th scope="col">Approche</th><th scope="col">Coût et mode de facturation</th><th scope="col">Points forts</th><th scope="col">Points de vigilance</th></tr></thead>
          <tbody>{ROWS.map(([a,b,c,d]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td><td>{d}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <section className="m-section m-detail-grid" style={{paddingTop:0}}>
      <div>
        <p className="m-eyebrow">Les variables</p>
        <h2>Ce qui fait varier le prix d’un MVP</h2>
        <ul className="m-list">
          <li>Le nombre de parcours et de rôles utilisateurs. Un parcours principal et trois rôles coûtent moins qu’un back-office complet.</li>
          <li>Les intégrations : paiement, facturation, messagerie, outils métier. Chaque intégration ajoute du cadrage, du développement et des tests.</li>
          <li>Le niveau de finition : conception UX/UI dédiée, accessibilité, performance, versus écrans fonctionnels.</li>
          <li>Les exigences de sécurité et de conformité : authentification, gestion des rôles, données personnelles, hébergement.</li>
          <li>Le mobile : une application web responsive coûte moins qu’une application web plus une application mobile native.</li>
          <li>Qui porte le risque : au forfait, le prestataire ; au temps passé, le client.</li>
        </ul>
        <p className="m-eyebrow" style={{marginTop:36}}>Comparer des devis</p>
        <h2>Ce qu’il faut exiger dans un devis de MVP</h2>
        <ul className="m-list">
          <li>Un périmètre écrit : parcours, rôles, intégrations, ce qui est exclu.</li>
          <li>Des critères d’acceptation : comment on saura que c’est livré.</li>
          <li>Le traitement des changements de périmètre : chiffrés avant réalisation ou absorbés.</li>
          <li>La propriété du code, de la documentation et des comptes créés.</li>
          <li>Les tests et le déploiement inclus, pas en option.</li>
          <li>Une garantie corrective après mise en production, avec sa durée.</li>
          <li>Le rythme de démonstration et les jalons de validation.</li>
          <li>L’usage de l’IA dans le développement : quels outils, quelles règles de revue, quelles données transmises à des modèles tiers. Voir <Link href="/guides/ai-engineering-os">qu’est-ce qu’un AI Engineering OS</Link>.</li>
        </ul>
      </div>
      <aside className="m-panel">
        <p className="m-eyebrow">Le repère ByARMS</p>
        <p><strong>Product Blueprint</strong> : 10 jours, 4 900 € HT. Ateliers, parcours, prototype, architecture, roadmap et budget avant d’engager la réalisation.</p>
        <p><strong>Product Launch</strong> : 10 semaines, 34 900 € HT. Un parcours principal jusqu’à trois rôles, UX/UI, frontend, backend, authentification, espace administrateur, deux intégrations, tests, déploiement, code et documentation transférés, 60 jours de garantie corrective.</p>
        <p><strong>Advanced</strong> : 12 à 16 semaines, 49 900 à 79 900 € HT, pour le web et le mobile, une marketplace ou des intégrations complexes.</p>
        <p className="m-note">Prix publics, hors taxes, confirmés après cadrage. Services tiers et changements de périmètre exclus. Détails sur <Link href="/product-launch">la page Product Launch</Link>.</p>
        <CTA href="/diagnostic?offre=product" />
      </aside>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <h2>Questions fréquentes sur le coût d’un MVP</h2>
      <div className="m-faq">
        <details><summary>Peut-on faire un MVP pour moins de 10 000 € ?</summary><p>Un prototype ou une maquette interactive, oui. Un produit utilisable en conditions réelles, avec authentification, tests et déploiement, rarement. Le Blueprint à 4 900 € HT sert justement à décider ce qui mérite d’être construit avant d’engager un budget plus important.</p></details>
        <details><summary>Le forfait couvre-t-il l’hébergement et les licences ?</summary><p>Non. Les services tiers, comme l’hébergement, les licences ou les frais de paiement, restent à la charge du client. Le forfait couvre la conception, le développement, les tests, le déploiement et le transfert.</p></details>
        <details><summary>Que se passe-t-il après le MVP ?</summary><p>Vous disposez du code et de la documentation pour continuer avec votre équipe ou un autre prestataire. ByARMS propose une suite mensuelle optionnelle, Product Evolution Partner, à partir de 5 900 € HT par mois.</p></details>
        <details><summary>Le développement avec l’IA rend-il le MVP moins cher ?</summary><p>Il accélère certaines étapes et permet de tenir un forfait plus serré, à condition que le cadre de revue et de test soit solide. C’est le rôle d’<Link href="/ada">ADA, notre AI Engineering OS</Link>. Le prix dépend toujours du périmètre et du niveau de finition.</p></details>
      </div>
    </section>
    <BottomCTA />
  </Shell>
}
