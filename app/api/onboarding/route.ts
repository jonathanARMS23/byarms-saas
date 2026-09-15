import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { clientDossier, sameOrigin, clientCookie, hashToken } from '@/lib/onboarding-access'
import { validateDossier, completion } from '@/lib/onboarding-fields'
export async function PATCH(req:NextRequest){
  if(!sameOrigin(req))return NextResponse.json({error:'Origine invalide'},{status:403})
  try{
    const dossier=await clientDossier();if(!dossier)return NextResponse.json({error:'Session expirée. Demandez un nouvel accès.'},{status:401})
    const raw=await req.text();if(raw.length>100000)return NextResponse.json({error:'Dossier trop volumineux'},{status:413})
    const body=JSON.parse(raw)
    if(!validateDossier(body.answers,dossier.offer)||!Number.isInteger(body.revision)||typeof body.submit!=='boolean')return NextResponse.json({error:'Réponses invalides'},{status:400})
    const progress=completion(body.answers,dossier.offer)
    if(body.submit&&progress.filled!==progress.total)return NextResponse.json({error:'Complétez les rubriques avant de demander la revue.'},{status:400})
    const updated=await prisma.onboarding.updateMany({where:{id:dossier.id,revision:body.revision},data:{answers:body.answers,revision:{increment:1},gates:{},submittedAt:body.submit?new Date():null}})
    if(!updated.count)return NextResponse.json({error:'Le dossier a été modifié ailleurs. Rechargez la page avant de reprendre.'},{status:409})
    return NextResponse.json({ok:true,revision:body.revision+1,submitted:body.submit})
  }catch{return NextResponse.json({error:'Enregistrement indisponible. Vos réponses restent affichées.'},{status:503})}
}
export async function DELETE(req:NextRequest){
  if(!sameOrigin(req))return NextResponse.json({error:'Origine invalide'},{status:403})
  const token=req.cookies.get(clientCookie)?.value
  if(token)await prisma.onboardingAccess.updateMany({where:{tokenHash:hashToken(token)},data:{revokedAt:new Date()}})
  const response=NextResponse.json({ok:true});response.cookies.delete(clientCookie);return response
}
