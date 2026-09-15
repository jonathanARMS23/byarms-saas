import { Shell, Intro } from '@/components/Marketing'
import { OnboardingAccess } from '@/components/OnboardingAccess'
import { OnboardingRoom, type RoomData } from '@/components/OnboardingRoom'
import { clientDossier } from '@/lib/onboarding-access'
import './onboarding.css'
export const dynamic='force-dynamic'
export const metadata={title:'Votre onboarding',robots:{index:false,follow:false},referrer:'no-referrer' as const}
export default async function Page(){const dossier=await clientDossier();return <Shell><Intro eyebrow="ADA Project Room / Onboarding" title="Un projet clair commence ici." text="Centralisez votre contexte, vos hypothèses et vos décisions pour préparer le démarrage avec ByARMS."/>{dossier?<OnboardingRoom initial={{id:dossier.id,company:dossier.company,title:dossier.title,offer:dossier.offer,answers:dossier.answers as RoomData['answers'],gates:dossier.gates as RoomData['gates'],revision:dossier.revision,submitted:!!dossier.submittedAt}}/>:<section className="m-section" style={{paddingTop:25}}><OnboardingAccess/></section>}</Shell>}
