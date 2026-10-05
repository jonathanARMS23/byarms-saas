import Link from 'next/link'
import { Shell, Intro, CTA, Method, BottomCTA } from './Marketing'
import { ValueCalculator } from './ValueCalculator'
import { OffersTable } from './OffersTable'
import { offerFaq } from '@/lib/content/faq'

export function OfferPage({ ai = false }: { ai?: boolean }) {
  const title = ai ? 'AI Operations' : 'Product Launch'
  const diagnostic = `/diagnostic?offre=${ai ? 'ai' : 'product'}`
  const included = ai
    ? ['Un processus et un département', 'Jusqu’à trois systèmes connectés', 'Un agent principal avec validation humaine', 'Jeu d’évaluation et gestion des exceptions', 'Monitoring, plafond de coûts et formation', 'Documentation et rapport avant / après']
    : ['Un parcours principal, jusqu’à trois rôles', 'UX/UI, frontend, backend et authentification', 'Un espace administrateur et deux intégrations', 'Tests prioritaires et déploiement', 'Analytics produit et accompagnement au lancement', 'Code, documentation et transfert au client']
  const brief = ai
    ? 'AI Operations est l’offre au forfait de ByARMS pour automatiser un processus métier coûteux : 29 900 € HT, 8 semaines, un système IA relié à vos outils, évalué sur une métrique convenue, avec validation humaine des exceptions, puis transféré avec sa documentation.'
    : 'Product Launch est l’offre au forfait de ByARMS pour transformer un projet numérique en produit utilisable : 34 900 € HT, 10 semaines, un parcours prioritaire conçu, développé, testé et mis en production, puis transféré avec son code et sa documentation.'
  const faq = offerFaq(ai)

  return <Shell>
    <Intro eyebrow={`Nos offres / ${title}`} title={ai ? 'Moins de tâches manuelles. Plus de capacité pour vos équipes.' : 'Lancez le produit utile. Pas une liste de fonctionnalités.'} text={ai ? 'Nous concevons un système IA relié à vos outils et évalué sur une métrique opérationnelle convenue. Le temps gagné se mesure, les exceptions restent sous contrôle.' : 'Vous avez un produit à lancer ou un outil métier à moderniser. Nous cadrons le parcours prioritaire, puis concevons et livrons une application utilisable, testée et prête à être exploitée.'}/>
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> {brief}</p></section>
    <section className="m-section m-detail-grid">
      <div>
        <p className="m-eyebrow">Le résultat à viser</p>
        <h2>{ai ? 'Le résultat visé : du temps libéré sur un processus mesuré' : 'Le résultat visé : un parcours prioritaire en usage réel'}</h2>
        <p>{ai ? 'Nous partons des volumes, du temps de traitement et des erreurs actuelles. Le cadrage détermine ce qui peut être automatisé et ce qui doit rester validé par vos équipes.' : 'Nous concentrons la première version sur le parcours qui permet à vos utilisateurs d’accomplir leur tâche essentielle. Les fonctionnalités secondaires ne doivent pas retarder cette validation.'}</p>
        <h3 style={{marginTop:28}}>Comment valider la réussite ?</h3>
        <p>{ai ? 'Un jeu de cas représentatifs, une mesure de départ (la baseline : volumes, temps de traitement, taux d’erreurs avant automatisation) et des seuils convenus : temps de traitement, qualité des résultats et gestion des exceptions. Le potentiel économique reste à confirmer sur votre situation.' : 'Un parcours prioritaire fonctionnel, des critères d’acceptation convenus et une mise en production accompagnée. La livraison ne garantit pas à elle seule l’adoption ni le succès commercial.'}</p>
        <h3 style={{marginTop:28}}>Les conditions pour avancer</h3>
        <p>{ai ? 'Un responsable du processus impliqué, des données accessibles et des opérateurs disponibles pour évaluer les résultats.' : 'Un décideur impliqué, des utilisateurs accessibles et une priorité de lancement clairement identifiée.'}</p>
        <p className="m-eyebrow" style={{marginTop:36}}>Le périmètre de réalisation</p>
        <h2>{ai ? 'Ce que comprend le forfait AI Operations' : 'Ce que comprend le forfait Product Launch'}</h2>
        <ul className="m-list">{included.map(item=><li key={item}>{item}</li>)}</ul>
        <p className="m-note">{ai ? 'Objectif : viser une réduction du temps de traitement, après validation de la baseline. Le Blueprint confirme la pertinence de l’IA et le potentiel économique.' : 'Idéal pour une organisation disposant d’un sponsor, d’utilisateurs accessibles et d’un objectif de lancement ou de modernisation explicite.'}</p>
        <h3 style={{marginTop:28}}>Un besoin plus étendu ?</h3>
        <p className="m-note">{ai ? 'Multi-workflows, plusieurs équipes ou architecture privée : Transformation de 49 900 à 89 900 € HT, sur 12 à 20 semaines.' : 'Web + mobile, marketplace ou intégrations complexes : Advanced de 49 900 à 79 900 € HT, sur 12 à 16 semaines.'}</p>
        <p className="m-note">Tout ce qui est livré vous appartient : <Link href="/confiance">nos engagements sur le code, les données et la responsabilité</Link>. L’ingénierie s’appuie sur <Link href="/ada">ADA, notre AI Engineering OS</Link>, sous supervision humaine.</p>
      </div>
      <aside className="m-panel">
        <p className="m-eyebrow">{title} / AU FORFAIT</p>
        <p className="m-price">{ai ? '29 900' : '34 900'} € <small>HT</small></p>
        <p>{ai ? '8' : '10'} semaines à partir du démarrage convenu.</p>
        <CTA href={diagnostic}>Évaluer mon projet</CTA>
        <ul className="m-list"><li>Interlocuteur francophone</li><li>Démonstration hebdomadaire</li><li>Validation à chaque jalon</li><li>{ai ? '60 jours de stabilisation' : '60 jours de garantie corrective'}</li></ul>
        <p className="m-note">Prix et calendrier confirmés après cadrage. Services tiers et changements de périmètre exclus.</p>
      </aside>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-panel">
        <p className="m-eyebrow">Commencer par la clarté</p>
        <h2>{ai ? 'AI Opportunity Blueprint : 10 jours pour décider' : 'Product Blueprint : 10 jours de cadrage avant la réalisation'}</h2>
        <p style={{marginTop:20}}>10 jours · 4 900 € HT. {ai ? 'Cartographie du processus, baseline (la mesure de départ), potentiel de valeur, prototype, risques et décision go/no-go (poursuivre ou arrêter).' : 'Ateliers, parcours utilisateurs, prototype, architecture, roadmap et budget.'}</p>
        <p>Le Blueprint est la phase de cadrage qui précède la réalisation. Avant d’engager le budget, déterminez ce qui mérite d’être construit. Vous repartez avec un périmètre prioritaire, les risques et les éléments de budget pour décider de poursuivre, réorienter ou arrêter.</p>
        <CTA href={diagnostic}>Évaluer mon projet</CTA>
      </div>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Toutes les formules</p><h2>Comparer les formules ByARMS</h2></div><p>Du cadrage de 10 jours aux programmes de 20 semaines.</p></div>
      <OffersTable />
    </section>
    {ai && <section className="m-section"><ValueCalculator/></section>}
    <Method/>
    <section className="m-section" style={{paddingTop:0}}>
      <h2>Questions fréquentes sur {title}</h2>
      <div className="m-faq">
        {faq.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p>{item.link && <p><Link className="m-text-link" href={item.link.href}>{item.link.label} ↗</Link></p>}</details>)}
      </div>
    </section>
    <BottomCTA/>
  </Shell>
}
