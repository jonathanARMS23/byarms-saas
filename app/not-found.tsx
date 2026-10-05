import type { Metadata } from 'next'
import Link from 'next/link'
import { Shell, Intro, CTA } from '@/components/Marketing'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Shell>
      <Intro
        eyebrow="Erreur 404"
        title="Cette page n’existe pas ou plus."
        text="L’adresse demandée ne correspond à aucune page du site. Voici les points d’entrée les plus utiles."
      />
      <section className="m-section">
        <ul className="m-list">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/product-launch">Product Launch : développement produit au forfait</Link></li>
          <li><Link href="/ai-operations">AI Operations : automatisation IA au forfait</Link></li>
          <li><Link href="/ada">ADA, notre AI Engineering OS</Link></li>
        </ul>
        <div className="m-actions"><CTA /></div>
      </section>
    </Shell>
  )
}
