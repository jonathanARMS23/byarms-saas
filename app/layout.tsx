import type { Metadata } from 'next'
import './globals.css'
import './marketing.css'
import './motion.css'

export const metadata: Metadata = {
  title: { default: 'ByARMS — Produits logiciels & systèmes IA, powered by ADA', template: '%s | ByARMS' },
  description: 'ByARMS transforme vos projets numériques et vos opérations en produits logiciels et systèmes IA opérationnels. Au forfait, avec ADA, notre AI Engineering OS.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: { title: 'ByARMS — Lancez votre produit. Transformez vos opérations.', description: 'Product Launch et AI Operations. Une équipe responsable de la livraison, appuyée par ADA, notre AI Engineering OS multi-engine.', locale: 'fr_FR', type: 'website' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="fr"><body>{children}</body></html> }
