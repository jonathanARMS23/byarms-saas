import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { makeToken, hashToken, clientCookie, sameOrigin } from '@/lib/onboarding-access'
export async function POST(req:NextRequest){
  if(!sameOrigin(req))return NextResponse.json({error:'Origine invalide'},{status:403})
  try{
    const {token}=await req.json()
    if(typeof token!=='string'||token.length!==43)return NextResponse.json({error:'Invitation invalide ou expirée'},{status:401})
    const session=makeToken();const now=new Date()
    const ok=await prisma.$transaction(async tx=>{
      const invitation=await tx.onboardingAccess.findUnique({where:{tokenHash:hashToken(token)}})
      if(!invitation||invitation.kind!=='invitation')return false
      const claimed=await tx.onboardingAccess.updateMany({where:{id:invitation.id,usedAt:null,revokedAt:null,expiresAt:{gt:now}},data:{usedAt:now}})
      if(!claimed.count)return false
      await tx.onboardingAccess.create({data:{onboardingId:invitation.onboardingId,tokenHash:hashToken(session),kind:'session',expiresAt:new Date(Date.now()+7*86400000)}})
      return true
    })
    if(!ok)return NextResponse.json({error:'Invitation invalide, déjà utilisée ou expirée. Demandez un nouvel accès à ByARMS.'},{status:401})
    const response=NextResponse.json({ok:true})
    response.headers.set('Cache-Control','no-store')
    response.cookies.set(clientCookie,session,{httpOnly:true,sameSite:'strict',secure:(req.headers.get('x-forwarded-proto')||req.nextUrl.protocol.replace(':',''))==='https',path:'/',maxAge:7*86400})
    return response
  }catch{return NextResponse.json({error:'Connexion indisponible. Réessayez.'},{status:503})}
}
