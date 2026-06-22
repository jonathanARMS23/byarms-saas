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

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
  return res
}
