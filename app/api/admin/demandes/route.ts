import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DemandeStatus } from '@prisma/client'
import { COOKIE_NAME, verifyToken } from '@/lib/auth'

async function auth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  return token ? verifyToken(token) : null
}

export async function GET(req: NextRequest) {
  if (!await auth(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') as DemandeStatus | null

  const demandes = await prisma.demande.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(demandes)
}

export async function POST(req: NextRequest) {
  if (!await auth(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const demande = await prisma.demande.create({ data: body })
  return NextResponse.json(demande, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  if (!await auth(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id, ...data } = await req.json()
  const updated = await prisma.demande.update({ where: { id }, data })
  return NextResponse.json(updated)
}
