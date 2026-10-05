import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Nos engagements : code, données, responsabilité | ByARMS' },
  description: 'Propriété du code, traçabilité des décisions, traitement des données et responsabilité humaine : le cadre de chaque projet ByARMS.',
  alternates: { canonical: '/confiance' },
  openGraph: { url: '/confiance', images: '/opengraph-image', title: 'Nos engagements : code, données, responsabilité' },
}

const COMMITMENTS: Array<[string, string]> = [
  ['Votre code, votre continuité', 'Le transfert du code, de la documentation et des dépendances fait partie du périmètre de livraison. Les droits et conditions sont précisés au contrat.'],
  ['Des décisions traçables', 'Les choix structurants, risques et demandes de changement sont documentés et partagés. Chaque validation a un responsable.'],
  ['Des données traitées avec discernement', 'Nous définissons avec vous les accès, régions d’hébergement et fournisseurs autorisés. Les documents sensibles ne sont pas transmis par défaut à un modèle tiers.'],
  ['Une responsabilité humaine', 'ADA soutient l’ingénierie. L’équipe ByARMS examine les choix et les livrables, et vous accompagne dans les arbitrages métier.'],
]

const STEPS: Array<[string, string, string]> = [
  ['01', 'Cadrage', 'Un Blueprint de 10 jours ou un cadrage intégré au forfait fixe le périmètre prioritaire, les critères d’acceptation, les risques et le budget. Rien n’est engagé avant cette étape.'],
  ['02', 'Réalisation et démonstration hebdomadaire', 'Chaque semaine, vous voyez le travail réalisé sur un environnement de démonstration. Les écarts se corrigent tôt, pas à la livraison.'],
  ['03', 'Validation à chaque jalon', 'Un jalon n’est clos qu’après votre validation écrite sur les critères convenus. Les demandes de changement sont chiffrées avant d’être réalisées.'],
  ['04', 'Mise en production et transfert', 'Déploiement accompagné, remise du code, de la documentation et des accès, puis période de garantie corrective ou de stabilisation de 60 jours.'],
]

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Notre engagement', path: '/confiance' }])} />
    <Intro eyebrow="Notre engagement" title="La confiance se construit dans les détails." text="Un périmètre explicite, une responsabilité humaine et une progression visible : le cadre de chaque collaboration ByARMS."/>
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> Sur chaque projet ByARMS, le code et la documentation vous sont transférés, les décisions sont tracées, l’usage de l’IA est encadré par des règles d’accès convenues avec vous, et un humain reste responsable de chaque livrable. Cette page détaille ce que cela signifie concrètement, du premier échange à la mise en production.</p></section>
    <section className="m-section">
      <div className="m-section-head"><div><p className="m-eyebrow">Quatre engagements</p><h2>Ce que nous garantissons sur chaque projet</h2></div><p>Les mêmes règles pour <Link href="/product-launch">Product Launch</Link> et <Link href="/ai-operations">AI Operations</Link>.</p></div>
      <div className="m-offers">{COMMITMENTS.map(([t,d])=><article className="m-panel" key={t}><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Le déroulement</p><h2>Comment se déroule un projet, du cadrage au transfert</h2></div><p>Quatre étapes, chacune close par une validation de votre part.</p></div>
      <div className="m-steps">{STEPS.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>
    <section className="m-section m-detail-grid" style={{paddingTop:0}}>
      <div>
        <p className="m-eyebrow">À la livraison</p>
        <h2>Ce que vous recevez à la fin du projet</h2>
        <ul className="m-list">
          <li>Le code source complet du système livré, sur un dépôt dont vous êtes propriétaire ou qui vous est transféré.</li>
          <li>La documentation technique : architecture, installation, déploiement, variables de configuration et procédures d’exploitation.</li>
          <li>La liste des dépendances, des services tiers utilisés et de leurs conditions, pour que vous puissiez les reprendre ou les remplacer.</li>
          <li>Les accès et les clés des environnements créés pour le projet, remis à la personne que vous désignez.</li>
          <li>Pour AI Operations : le jeu d’évaluation, les mesures avant et après, et le rapport de fin de projet.</li>
        </ul>
        <p className="m-note">Les suites mensuelles, Product Evolution Partner ou AI Continuous Improvement, sont optionnelles. Sans elles, vous disposez de tout ce qu’il faut pour faire évoluer le système avec une autre équipe.</p>
        <p className="m-eyebrow" style={{marginTop:36}}>Nos outils d’IA et vos données</p>
        <h2>Comment nous utilisons l’IA sur votre projet</h2>
        <p>Notre ingénierie s’appuie sur <Link href="/ada">ADA, notre AI Engineering OS</Link>, qui orchestre deux moteurs : Claude Code, d’Anthropic, et Codex, d’OpenAI. Ces moteurs lisent le code du projet et proposent des modifications. ADA limite ce qu’ils peuvent faire par des permissions, des contrats d’exécution et un suivi des sessions. Notre équipe examine les propositions, exécute les tests et valide chaque livrable.</p>
        <p>Vos données ne sont pas traitées de la même manière que le code. Au cadrage, nous listons avec vous les fournisseurs d’IA autorisés, les régions d’hébergement et les catégories de documents qui peuvent ou non être transmises à un modèle tiers. Par défaut, les documents sensibles, comme les données personnelles de vos clients, les contrats ou les informations financières, ne sont pas envoyés à un modèle externe. Si un cas d’usage l’exige, c’est une décision explicite, écrite et réversible.</p>
        <p>Le système que nous vous livrons n’embarque pas ADA. Il utilise les fournisseurs et les modèles que vous avez autorisés, avec des plafonds de coûts et un monitoring définis dans le périmètre du projet.</p>
        <p className="m-eyebrow" style={{marginTop:36}}>Garanties</p>
        <h2>Garanties, pénalités et limites de notre engagement</h2>
        <ul className="m-list">
          <li>60 jours de garantie corrective après la mise en production d’un produit, ou 60 jours de stabilisation pour un système IA.</li>
          <li>10 % du prix non dus en cas de retard exclusivement imputable à ByARMS, selon les critères et exclusions du contrat.</li>
          <li>Les demandes de changement sont documentées, chiffrées et soumises à votre validation avant réalisation.</li>
          <li>Prix et calendrier sont confirmés après cadrage. Les services tiers et les changements de périmètre sont exclus du forfait.</li>
        </ul>
        <p className="m-note">La livraison d’un produit ne garantit pas à elle seule son adoption ni son succès commercial. L’automatisation d’un processus ne garantit pas un gain avant sa mesure sur vos cas réels. Les dispositions de sécurité, de traitement des données, de support et les engagements contractuels sont définis selon votre projet. Aucune certification réglementaire n’est revendiquée sur cette page.</p>
      </div>
      <aside className="m-panel">
        <p className="m-eyebrow">Qui s’engage</p>
        <p>ByARMS est la marque d’ARMS INTERNATIONAL LTD. Jonathan ARMS, CEO et fondateur, supervise personnellement chaque projet avec une équipe distribuée francophone.</p>
        <ul className="m-list"><li>Interlocuteur francophone</li><li>Démonstration hebdomadaire</li><li>Validation écrite à chaque jalon</li><li>Code et documentation transférés</li></ul>
        <p className="m-note">Questions sur un point précis de cette page ? Posez-la dans votre demande d’<Link href="/diagnostic">évaluation de projet</Link>, nous y répondons avant tout engagement.</p>
      </aside>
    </section>
    <BottomCTA/>
  </Shell>
}
