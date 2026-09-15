import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { COOKIE_NAME, signToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sameOrigin } from '@/lib/onboarding-access'

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({error:'Origine invalide'}, {status:403})
  if (!process.env.ADMIN_JWT_SECRET || process.env.ADMIN_JWT_SECRET.length < 32)
    return NextResponse.json({error:'Configuration administrateur manquante'}, {status:503})
  let body: {email?: unknown; password?: unknown}
  try { body = await req.json() } catch {
    return NextResponse.json({error:'Informations invalides'}, {status:400})
  }
  if (!body || typeof body.email !== 'string' || typeof body.password !== 'string' ||
      body.email.length > 200 || body.password.length > 256)
    return NextResponse.json({error:'Identifiants invalides'}, {status:401})
  try {
    const email = body.email.trim().toLowerCase()
    const credential = await prisma.adminCredential.findUnique({where:{email}})
    if (!credential || !await bcrypt.compare(body.password, credential.passwordHash))
      return NextResponse.json({error:'Identifiants invalides'}, {status:401})
    const token = await signToken({email, role:'admin'})
    const response = NextResponse.json({ok:true})
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly:true,
      secure:(req.headers.get('x-forwarded-proto') || req.nextUrl.protocol.replace(':','')) === 'https',
      sameSite:'lax', maxAge:8*3600, path:'/',
    })
    return response
  } catch {
    return NextResponse.json({error:'Connexion indisponible'}, {status:503})
  }
}
