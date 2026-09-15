import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { makeToken, hashToken, sameOrigin } from '@/lib/onboarding-access'
import { sections, type Dossier } from '@/lib/onboarding-fields'
async function admin(){const token=(await cookies()).get(COOKIE_NAME)?.value;return token&&(await verifyToken(token))?.role==='admin'}
export async function POST(req:NextRequest){
  if(!await admin())return NextResponse.json({error:'Non autorisé'},{status:401})
  if(!sameOrigin(req))return NextResponse.json({error:'Origine invalide'},{status:403})
  try{
    const body=await req.json();const token=makeToken()
    if(body.action==='invite'){
      if(typeof body.id!=='string')return NextResponse.json({error:'Dossier invalide'},{status:400})
      await prisma.$transaction(async tx=>{await tx.onboardingAccess.updateMany({where:{onboardingId:body.id,revokedAt:null},data:{revokedAt:new Date()}});await tx.onboardingAccess.create({data:{onboardingId:body.id,kind:'invitation',tokenHash:hashToken(token),expiresAt:new Date(Date.now()+72*3600000)}})})
    }else{
      if(!['product','ai'].includes(body.offer)||!['company','email','title'].every(k=>typeof body[k]==='string'&&body[k].trim()&&body[k].length<=200)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))return NextResponse.json({error:'Informations invalides'},{status:400})
      await prisma.onboarding.create({data:{company:body.company.trim(),email:body.email.trim().toLowerCase(),title:body.title.trim(),offer:body.offer,tokens:{create:{kind:'invitation',tokenHash:hashToken(token),expiresAt:new Date(Date.now()+72*3600000)}}}})
    }
    return NextResponse.json({path:`/onboarding#invitation=${token}`},{headers:{'Cache-Control':'no-store'}})
  }catch{return NextResponse.json({error:'Création indisponible'},{status:503})}
}
export async function PATCH(req:NextRequest){
  if(!await admin())return NextResponse.json({error:'Non autorisé'},{status:401})
  if(!sameOrigin(req))return NextResponse.json({error:'Origine invalide'},{status:403})
  try{
    const {id,gate,approved,note,revision}=await req.json()
    if(typeof id!=='string'||!sections.some(s=>s.id===gate)||typeof approved!=='boolean'||typeof note!=='string'||note.length>1000||!Number.isInteger(revision))return NextResponse.json({error:'Décision invalide'},{status:400})
    const dossier=await prisma.onboarding.findUnique({where:{id}});if(!dossier)return NextResponse.json({error:'Dossier introuvable'},{status:404})
    const answers=dossier.answers as Dossier
    if(approved){
      const fields=sections.find(s=>s.id===gate)!.fields.filter(f=>!('ai'in f)||dossier.offer==='ai')
      const ready=fields.every(f=>{const a=answers[f.id];return a?.value.trim()&&(a.status==='CONFIRME'||a.status==='HORS_PERIMETRE'||(a.owner.trim()&&a.due))})
      if(!ready||!note.trim())return NextResponse.json({error:'Renseignez les réponses, attribuez et datez les inconnues, puis motivez la validation.'},{status:400})
    }
    const gates={...(dossier.gates as Record<string,object>),[gate]:{approved,note,at:new Date().toISOString()}}
    const result=await prisma.onboarding.updateMany({where:{id,revision},data:{gates,revision:{increment:1}}})
    if(!result.count)return NextResponse.json({error:'Le dossier a changé. Rechargez avant de valider.'},{status:409})
    return NextResponse.json({ok:true})
  }catch{return NextResponse.json({error:'Validation indisponible'},{status:503})}
}
