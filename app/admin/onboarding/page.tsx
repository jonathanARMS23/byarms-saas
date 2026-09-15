import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { COOKIE_NAME,verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { OnboardingAdmin } from '@/components/OnboardingAdmin'
import type { RoomData } from '@/components/OnboardingRoom'
export const dynamic='force-dynamic'
export default async function Page(){
  const token=(await cookies()).get(COOKIE_NAME)?.value
  if(!token||(await verifyToken(token))?.role!=='admin')redirect('/admin/login')
  const rows=await prisma.onboarding.findMany({orderBy:{createdAt:'desc'}})
  return <OnboardingAdmin dossiers={rows.map(d=>({id:d.id,company:d.company,title:d.title,email:d.email,offer:d.offer,answers:d.answers as RoomData['answers'],gates:d.gates as RoomData['gates'],revision:d.revision,submitted:!!d.submittedAt}))}/>
}
