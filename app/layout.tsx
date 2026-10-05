import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { siteGraph } from '@/lib/schema'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'
import './globals.css'
import './marketing.css'
import './motion.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | ByARMS' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: SITE_NAME,
    title: 'ByARMS — Lancez votre produit. Transformez vos opérations.',
    description: 'Product Launch et AI Operations : produits logiciels et systèmes IA livrés au forfait, appuyés par ADA, notre AI Engineering OS multi-engine.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body><JsonLd data={siteGraph} />{children}</body></html>
}
