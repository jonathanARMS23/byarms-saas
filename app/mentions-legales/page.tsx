import type { Metadata } from 'next'
import { Shell, Intro } from '@/components/Marketing'
import { JsonLd } from '@/components/JsonLd'
import { pageGraph } from '@/lib/schema'
export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de ByARMS, marque d’ARMS INTERNATIONAL LTD : éditeur, contact, hébergement.',
  alternates: { canonical: '/mentions-legales' },
}
export default function Page(){return <Shell><JsonLd data={pageGraph([{ name: 'Mentions légales', path: '/mentions-legales' }])} /><Intro eyebrow="ByARMS" title="Informations légales" text="Identité de la société qui porte la marque ByARMS."/><div className="m-legal"><h2>Éditeur</h2><p>ARMS INTERNATIONAL LTD<br/>Company number 17382099<br/>Marque commerciale : ByARMS.<br/>Directeur de la publication : Jonathan ARMS.</p><h2>Contact</h2><p><a href="mailto:armsjonathan878@gmail.com">armsjonathan878@gmail.com</a></p><h2>Offres et informations</h2><p>Les prix sont indiqués hors taxes. Les périmètres, délais, droits et engagements applicables sont confirmés dans la proposition et le contrat propres à chaque projet.</p><h2>Contenus</h2><p>Les exemples illustratifs expliquent notre méthode. Ils ne constituent pas des études de cas client ni des garanties de performance.</p></div></Shell>}
