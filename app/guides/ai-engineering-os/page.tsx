import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, CTA, BottomCTA } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Qu’est-ce qu’un AI Engineering OS ? Définition et critères',
  description: 'Un AI Engineering OS organise le travail des assistants de code IA : moteurs, mémoire projet, agents, permissions, supervision. Définition, différence avec un copilote et questions à poser à un prestataire.',
  alternates: { canonical: '/guides/ai-engineering-os' },
  openGraph: { url: '/guides/ai-engineering-os', images: '/opengraph-image', title: 'Qu’est-ce qu’un AI Engineering OS ?' },
}

const COMPONENTS: Array<[string, string, string]> = [
  ['01', 'Les moteurs', 'Les assistants de code qui lisent et écrivent le logiciel. Chez ByARMS : Claude Code, d’Anthropic, et Codex, d’OpenAI. Un AI Engineering OS peut en utiliser plusieurs et choisir le plus adapté à chaque tâche.'],
  ['02', 'La mémoire projet', 'Les conventions, décisions et contextes utiles, conservés d’une session à l’autre pour que les moteurs ne repartent pas de zéro et respectent ce qui a été décidé.'],
  ['03', 'Les agents spécialisés', 'Des rôles définis, comme revue de code, tests, base de données ou sécurité, avec leurs propres instructions, mobilisés selon la tâche plutôt qu’un assistant généraliste.'],
  ['04', 'Les permissions et les contrats d’exécution', 'Ce qu’un moteur a le droit de lire, d’écrire ou d’exécuter, et les règles qui bloquent une commande ou une modification hors cadre.'],
  ['05', 'Le suivi et la supervision', 'La trace de chaque session et de chaque exécution, les budgets, et la revue humaine qui valide ou refuse le résultat avant livraison.'],
]

export default function Page() {
  return <Shell>
    <JsonLd data={pageGraph([{ name: 'Guides', path: '/guides' }, { name: 'Qu’est-ce qu’un AI Engineering OS ?', path: '/guides/ai-engineering-os' }])} />
    <Intro eyebrow="Guides / AI engineering" title="Qu’est-ce qu’un AI Engineering OS ?" text="Les assistants de code IA écrivent vite. La question, pour une entreprise qui confie un projet, est de savoir qui organise ce travail, qui le limite et qui le valide. C’est le rôle d’un AI Engineering OS." />
    <section className="m-section" style={{paddingTop:0}}><p className="m-brief"><strong>Définition.</strong> Un AI Engineering OS est un système d’ingénierie logicielle qui organise le travail d’un ou plusieurs assistants de code IA : il leur fournit le contexte du projet, répartit les tâches entre des agents spécialisés, limite ce qu’ils peuvent faire par des permissions, et garde la trace de chaque exécution pour qu’une personne valide le résultat. ADA, l’AI Engineering OS de ByARMS, en est un exemple.</p></section>
    <section className="m-section m-detail-grid" style={{paddingTop:0}}>
      <div>
        <p className="m-eyebrow">La différence</p>
        <h2>AI Engineering OS et copilote de code : ce qui change</h2>
        <p>Un copilote de code, comme un assistant intégré à l’éditeur, propose des lignes ou des fonctions à un développeur qui les accepte ou non. Il agit dans une session, sans mémoire du projet et sans règle d’intervention au-delà de ce que le développeur fait lui-même.</p>
        <p>Un AI Engineering OS se place au-dessus : il peut faire travailler plusieurs moteurs, leur donner des rôles, les faire enchaîner des étapes, par exemple écrire les tests avant le code, puis vérifier que le résultat respecte les règles du projet avant qu’une personne le relise. Il transforme une aide à la frappe en une chaîne de production encadrée.</p>
        <ul className="m-list">
          <li>Copilote : une suggestion à la fois, dans un fichier, pour un développeur.</li>
          <li>AI Engineering OS : des tâches réparties entre agents, avec contexte, limites et traçabilité, pour une équipe.</li>
          <li>Dans les deux cas, la responsabilité du résultat reste humaine. L’OS rend cette responsabilité tenable à l’échelle d’un projet.</li>
        </ul>
        <p className="m-eyebrow" style={{marginTop:36}}>Ce que cela signifie pour un client</p>
        <h2>Pourquoi cela compte quand vous confiez un projet</h2>
        <p>Pour un client, l’enjeu n’est pas l’outil mais ses conséquences : un code cohérent avec le reste du projet, des modifications limitées à ce qui a été demandé, des données qui ne partent pas chez un fournisseur non autorisé, et une revue humaine avant chaque livraison. Un prestataire qui développe avec l’IA sans ce cadre livre plus vite, mais vous fait porter le risque.</p>
        <p>ByARMS applique ce cadre sur ses deux offres, <Link href="/product-launch">Product Launch</Link> et <Link href="/ai-operations">AI Operations</Link>, et le décrit dans <Link href="/confiance">ses engagements sur le code, les données et la responsabilité</Link>.</p>
      </div>
      <aside className="m-panel">
        <p className="m-eyebrow">Questions à poser à un prestataire</p>
        <ul className="m-list">
          <li>Quels assistants de code utilisez-vous, et pour quelles tâches ?</li>
          <li>Qu’est-ce qui empêche l’IA de modifier un fichier ou d’exécuter une commande hors périmètre ?</li>
          <li>Quelles données de mon projet sont transmises à un modèle tiers, et lesquelles ne le sont jamais ?</li>
          <li>Qui relit le code produit avec l’IA, et comment cette revue est-elle tracée ?</li>
          <li>Les tests sont-ils écrits avant le code, et exécutés avant chaque livraison ?</li>
          <li>Le code et la documentation livrés sont-ils exploitables sans vos outils d’IA ?</li>
        </ul>
        <p className="m-note">Les réponses de ByARMS à ces questions sont sur la page <Link href="/ada">ADA</Link> et dans la <a href="https://ada.byarms.com" target="_blank" rel="noopener noreferrer">documentation ADA</a>.</p>
      </aside>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-section-head"><div><p className="m-eyebrow">Les composants</p><h2>Les cinq composants d’un AI Engineering OS</h2></div><p>Un système complet réunit ces cinq couches. Un outil qui n’en couvre qu’une est un copilote ou un script, pas un OS.</p></div>
      <div className="m-steps" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'}}>{COMPONENTS.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>
    <section className="m-section" style={{paddingTop:0}}>
      <div className="m-panel">
        <p className="m-eyebrow">Exemple</p>
        <h2>ADA, l’AI Engineering OS de ByARMS</h2>
        <p>ADA orchestre Claude Code et Codex, conserve la mémoire de chaque projet, répartit le travail entre des agents spécialisés, applique des permissions et des hooks de sécurité, et trace chaque exécution. ByARMS l’utilise pour livrer ses projets clients ; ce n’est pas un logiciel installé chez le client, sauf si le projet le prévoit.</p>
        <div className="m-actions"><Link className="m-text-link" href="/ada">Comprendre ADA, notre AI Engineering OS ↗</Link><Link className="m-text-link" href="/realisations">Voir nos réalisations ↗</Link></div>
        <CTA />
      </div>
    </section>
    <BottomCTA />
  </Shell>
}
