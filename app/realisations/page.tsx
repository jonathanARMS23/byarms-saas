import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, CTA, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Réalisations et produits ByARMS',
  description: 'ADA, Odysseus, ImmoVision : les produits construits par ByARMS avec sa propre méthode. Contexte, périmètre, stack et ce qu’ils enseignent sur notre façon de livrer.',
  alternates: { canonical: '/realisations' },
  openGraph: { url: '/realisations', images: '/opengraph-image', title: 'Réalisations et produits ByARMS' },
}

const PRODUCTS: Array<{ name: string; kind: string; status: string; context: string; scope: string[]; stack: string; lesson: string; link?: { href: string; label: string; external?: boolean } }> = [
  {
    name: 'ADA',
    kind: 'AI Engineering OS',
    status: 'En production, utilisé sur chaque projet ByARMS',
    context: 'Les assistants de code comme Claude Code et Codex accélèrent l’écriture du logiciel, mais ne garantissent ni la cohérence avec le projet, ni le respect de limites d’intervention, ni la traçabilité. ADA est né de ce besoin : un système qui organise le travail des moteurs d’IA au lieu de les laisser agir seuls.',
    scope: ['Orchestration de Claude Code et de Codex dans un cadre d’exécution commun', 'Mémoire projet : conventions, décisions et contexte utile retrouvés d’une session à l’autre', 'Catalogue d’agents spécialisés mobilisés selon la tâche', 'Hooks de sécurité : permissions, contrôle des écritures et des commandes', 'Pipelines coordonnés et suivi des exécutions et des budgets', 'Documentation publique et licence commerciale'],
    stack: 'Node.js, hooks et coordinateur en JavaScript, intégration Claude Code et Codex, bundle SEO intégré.',
    lesson: 'La vitesse d’un moteur d’IA ne vaut que si quelqu’un définit le cadre et valide le résultat. ADA matérialise cette règle : l’IA propose, l’équipe décide.',
    link: { href: 'https://ada.byarms.com', label: 'Documentation ADA', external: true },
  },
  {
    name: 'Odysseus',
    kind: 'Espace de travail IA auto-hébergé',
    status: 'Produit interne',
    context: 'Certaines équipes veulent utiliser des agents d’IA sans envoyer leurs données chez un fournisseur externe. Odysseus est un espace de travail qui s’installe sur vos propres serveurs et fait tourner des agents capables d’agir sur le système.',
    scope: ['Interface web de conversation et de pilotage', 'Agents multi-tours avec outils système : fichiers, commandes, recherche', 'Backend asynchrone exposant les agents en temps réel', 'Installation sur infrastructure maîtrisée par l’équipe'],
    stack: 'Python, FastAPI, interface web sans framework lourd, exécution asynchrone.',
    lesson: 'Un agent qui agit sur un système doit être observable et interruptible. Les règles d’Odysseus sur les outils et les permissions ont nourri celles d’ADA.',
  },
  {
    name: 'ImmoVision',
    kind: 'Plateforme PropTech',
    status: 'En développement',
    context: 'Projet de plateforme immobilière qui combine l’analyse par IA et la visualisation 3D des biens, pensée pour les professionnels de l’immobilier et leurs clients.',
    scope: ['Application web Next.js avec rendu 3D des biens', 'API NestJS et base de données Supabase avec règles d’accès par espace de travail', 'Fonctions d’analyse par IA sur les données des biens', 'Identité visuelle et parcours utilisateurs conçus avant le développement'],
    stack: 'Next.js 15, NestJS, Supabase, PostgreSQL.',
    lesson: 'Le même cadrage que nos offres clients : un parcours prioritaire, une architecture explicite, puis des jalons démontrables. C’est le terrain d’essai de la méthode Product Launch.',
  },
]

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Réalisations', path: '/realisations' }])} />
    <Intro eyebrow="Réalisations" title="Ce que nous construisons avec notre propre méthode." text="Trois produits conçus et développés par ByARMS. Ils montrent comment nous cadrons, livrons et encadrons l’IA, avant même de parler de vos projets." />
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>En bref.</strong> ByARMS développe ses propres produits avec la méthode qu’il applique à ses clients : ADA, son AI Engineering OS, Odysseus, un espace de travail IA auto-hébergé, et ImmoVision, une plateforme immobilière en développement. Les cas clients sont publiés uniquement avec l’autorisation des entreprises concernées.</p></section>
    {PRODUCTS.map(p => (
      <section key={p.name} className="m-section m-detail-grid" style={{paddingTop:0}}>
        <div>
          <p className="m-eyebrow">{p.kind}</p>
          <h2>{p.name} : {p.kind.toLowerCase()}</h2>
          <p className="m-lead">{p.context}</p>
          <h3 style={{marginTop:28}}>Périmètre</h3>
          <ul className="m-list">{p.scope.map(s => <li key={s}>{s}</li>)}</ul>
          <h3 style={{marginTop:28}}>Ce que ce produit nous a appris</h3>
          <p>{p.lesson}</p>
        </div>
        <aside className="m-panel">
          <p className="m-eyebrow">Fiche</p>
          <p><strong>Statut :</strong> {p.status}</p>
          <p><strong>Stack :</strong> {p.stack}</p>
          {p.link && (p.link.external
            ? <a className="m-text-link" href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label} ↗</a>
            : <Link className="m-text-link" href={p.link.href}>{p.link.label} ↗</Link>)}
        </aside>
      </section>
    ))}
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-panel">
        <p className="m-eyebrow">Cas clients</p>
        <h2>Les projets clients sont publiés avec l’accord des clients</h2>
        <p>Nous ne publions pas d’étude de cas sans l’autorisation écrite de l’entreprise concernée, et nous ne présentons pas d’exemple illustratif comme un résultat obtenu. Les projets que nous livrons suivent le cadre décrit sur la page <Link href="/confiance">nos engagements</Link> : périmètre cadré, démonstration hebdomadaire, validation par jalon, transfert du code.</p>
        <p>Pour voir comment ces produits se traduisent en offre : <Link href="/product-launch">Product Launch</Link> pour un produit logiciel, <Link href="/ai-operations">AI Operations</Link> pour l’automatisation d’un processus, et <Link href="/cas-usage">les cas d’usage AI Operations</Link> pour des exemples de processus automatisables.</p>
        <CTA />
      </div>
    </section>
    <BottomCTA />
  </Shell>
}
