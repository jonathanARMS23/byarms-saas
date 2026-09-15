import { Shell, Intro, AdaPanel, Method, BottomCTA, CTA } from '@/components/Marketing'

export const metadata = { title: 'ADA — AI Engineering OS multi-engine', description: 'Découvrez ADA, le système d’ingénierie ByARMS : Claude Code et Codex, mémoire projet, agents spécialisés et contrôle des exécutions sous supervision humaine.' }

export default function Page() {
  return <Shell>
    <Intro eyebrow="Le système d’ingénierie ByARMS" title="ADA. Un AI Engineering OS. Deux moteurs. Une direction humaine." text="ADA est passé de l’orchestration d’agents à un système complet de pilotage de l’ingénierie logicielle. Claude Code et Codex apportent les moteurs d’exécution. ADA organise leur travail, le contexte projet et les contrôles. ByARMS reste responsable de la livraison." />
    <section className="m-section m-detail-grid">
      <div><p className="m-eyebrow">Au-delà de la génération de code</p><h2>La puissance des moteurs.<br />Le cadre pour les piloter.</h2>
        <ul className="m-list"><li>Claude Code et Codex dans un cadre d’exécution commun</li><li>Mémoire projet et récupération du contexte utile</li><li>Agents spécialisés mobilisés selon les besoins</li><li>Contrats d’exécution, permissions et contrôle des écritures</li><li>Sessions interactives, suivi des exécutions et gouvernance des budgets</li></ul>
        <div className="m-actions"><CTA /><a className="m-text-link" href="https://ada.byarms.com" target="_blank" rel="noopener noreferrer">Consulter la documentation ADA ↗</a></div>
        <p className="m-note">Les capacités mobilisées dépendent du moteur, de sa configuration et du projet. La documentation détaille le fonctionnement d’ADA.</p>
      </div><AdaPanel />
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Ce que cela change pour votre projet</p><h2>Du contexte.<br />Du contrôle. De la visibilité.</h2></div><p>Le nombre d’agents n’est pas une garantie de qualité. Les livrables restent soumis aux tests, aux revues et aux critères convenus.</p></div>
      <div className="m-steps">{[
        ['01','Préserver le contexte','La mémoire projet aide à retrouver les conventions et les décisions utiles au travail en cours.'],
        ['02','Encadrer les interventions','Les permissions et les contrats d’exécution définissent les limites dans lesquelles les moteurs peuvent agir.'],
        ['03','Suivre l’exécution','Le suivi des sessions et des exécutions donne à notre équipe des éléments pour examiner le travail et intervenir.'],
        ['04','Garder une responsabilité claire','ByARMS arbitre les choix techniques et valide les livrables. Vous gardez la main sur les décisions métier.'],
      ].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>
    <section className="m-section" style={{paddingTop:0}}><div className="m-panel"><p className="m-eyebrow">Notre système de production ≠ votre solution métier</p><h2>Construit avec ADA.<br />Conçu pour votre entreprise.</h2><p>ADA soutient notre travail d’ingénierie. Le produit logiciel ou l’automatisation que nous vous livrons répond à votre besoin métier : il ne s’agit pas nécessairement d’une installation d’ADA dans votre entreprise.</p><p>Les intégrations, les fournisseurs autorisés, les conditions d’exploitation et le transfert sont définis dans le périmètre de votre projet.</p></div></section>
    <Method /><BottomCTA />
  </Shell>
}
