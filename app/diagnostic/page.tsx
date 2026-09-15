import { Shell, Intro } from '@/components/Marketing'
import { Diagnostic } from '@/components/Diagnostic'
export const metadata = { title: 'Évaluer mon projet' }
export default async function Page({searchParams}:{searchParams:Promise<{offre?:string}>}) { const {offre}=await searchParams;return <Shell><Intro eyebrow="Un premier pas concret" title="Votre projet mérite un cadre clair." text="Trois minutes pour présenter votre enjeu, votre budget et vos priorités. Vous obtenez une première orientation, puis notre équipe examine votre demande. Sans engagement."/><section className="m-section" style={{paddingTop:25}}><Diagnostic initialOffer={offre}/></section></Shell> }
