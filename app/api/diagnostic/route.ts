import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { choices, qualify, type Answers } from '@/lib/qualification'

export async function POST(req:NextRequest) {
  try {
    const origin = req.headers.get('origin')
    if (origin && new URL(origin).host !== req.headers.get('host')) return NextResponse.json({error:'Origine invalide'},{status:403})
    const raw=await req.text()
    if(raw.length>12000)return NextResponse.json({error:'Demande trop volumineuse'},{status:413})
    const body=JSON.parse(raw)
    if(!body || typeof body!=='object')throw new Error('invalid')
    if(body.website)return NextResponse.json({ok:true})
    const a=body.answers
    if(!a||typeof a!=='object'||!Object.entries(choices).every(([key,values])=>(values as readonly string[]).includes(a[key])))throw new Error('invalid')
    if(typeof a.problem!=='string'||a.problem.trim().length<20||a.problem.length>3000)throw new Error('invalid')
    for(const [key,max] of [['name',120],['company',160],['email',200]] as const){if(typeof body[key]!=='string'||!body[key].trim()||body[key].length>max)throw new Error('invalid')}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)||body.consent!==true)throw new Error('invalid')
    const answers:Answers={...a,problem:a.problem.trim()};const result=qualify(answers)
    const source=typeof body.source==='string'?body.source.slice(0,100):'direct'
    const message=`DIAGNOSTIC ${result.version}\nEntreprise : ${body.company.trim()}\nOffre : ${answers.offer}\nScore interne : ${result.score}/10\nOrientation : ${result.route}\nSource : ${source}\nConsentement contact : ${new Date().toISOString()}\n\n${JSON.stringify(answers,null,2)}`
    try{const record=await prisma.demande.create({data:{name:body.name.trim(),email:body.email.trim().toLowerCase(),sujet:`Diagnostic / ${answers.offer==='ai'?'AI Operations':answers.offer==='product'?'Product Launch':'Orientation'}`,budget:answers.budget,message}});return NextResponse.json({ok:true,id:record.id},{status:201})}catch{return NextResponse.json({error:'Enregistrement indisponible'},{status:503})}
  }catch{return NextResponse.json({error:'Informations invalides'},{status:400})}
}
