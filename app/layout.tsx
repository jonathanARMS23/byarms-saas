import type { Metadata } from 'next'
import { JetBrains_Mono, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ByARMS — L\'agence de développement IA pour startups ambitieuses',
  description: 'ByARMS livre vos applications web et mobile 3× plus vite grâce à ADA, un système d\'agents IA spécialisés. Prototype en 48h · MVP en 4 semaines.',
  openGraph: {
    title: 'ByARMS — Votre équipe dev, dopée à l\'IA',
    description: 'Applications web, mobile et IA livrées 3× plus vite grâce à ADA, notre système multi-agents.',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://assets.calendly.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
