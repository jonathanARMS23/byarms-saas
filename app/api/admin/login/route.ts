import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { ADMIN_EMAIL, ADMIN_HASH, COOKIE_NAME, signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, ADMIN_HASH)
  if (!valid) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  const token = await signToken({ email, role: 'admin' })

  // Secure flag basé sur le protocole réel (x-forwarded-proto si derrière un proxy)
  // NODE_ENV=production + HTTP (ex: Coolify sans SSL) → secure:true bloquerait le cookie
  const proto = req.headers.get('x-forwarded-proto') ?? req.nextUrl.protocol.replace(':', '')
  const isHttps = proto === 'https'

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return res
}
