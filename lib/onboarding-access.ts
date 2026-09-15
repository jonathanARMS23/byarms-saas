import { createHash, randomBytes } from 'node:crypto'
import { prisma } from './prisma'
import { cookies } from 'next/headers'
export const clientCookie='byarms_onboarding'
export function hashToken(token:string){return createHash('sha256').update(token).digest('hex')}
export function makeToken(){return randomBytes(32).toString('base64url')}
export async function clientDossier(){
  const token=(await cookies()).get(clientCookie)?.value
  if(!token||token.length!==43)return null
  const access=await prisma.onboardingAccess.findUnique({where:{tokenHash:hashToken(token)},include:{onboarding:true}})
  if(!access||access.kind!=='session'||access.revokedAt||access.expiresAt<new Date())return null
  return access.onboarding
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');try{return !!origin&&new URL(origin).host===req.headers.get('host')}catch{return false}}
