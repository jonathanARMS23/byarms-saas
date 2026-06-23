import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { COOKIE_NAME, verifyToken } from '@/lib/auth'

const VALID = ['NOUVEAU', 'EN_COURS', 'REPONDU', 'ARCHIVE'] as const
type S = typeof VALID[number]

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { id: idStr } = await params
  const id = parseInt(idStr, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'ID invalide' }, { status: 400 })

  const { status } = await req.json()
  if (!VALID.includes(status as S)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
  }

  try {
    const demande = await prisma.demande.update({
      where: { id },
      data: { status: status as S },
      select: { id: true, status: true },
    })
    return NextResponse.json({ ok: true, status: demande.status })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
