import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, nom, email, company, service, message } = body

    if (!prenom || !nom || !email || !message) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    const name = `${prenom.trim()} ${nom.trim()}`
    const sujet = service || 'Demande de contact'
    const fullMessage = company
      ? `Entreprise : ${company}\n\n${message}`
      : message

    const demande = await prisma.demande.create({
      data: { name, email: email.trim(), sujet, message: fullMessage },
    })

    // Notification email via Resend (optionnel — nécessite RESEND_API_KEY dans .env)
    const resendKey = process.env.RESEND_API_KEY
    const notifEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'jonathan@overlord.fund'
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'ByARMS <contact@byarms.com>',
          to: [notifEmail],
          subject: `🚀 Nouvelle demande ByARMS — ${sujet}`,
          html: `
            <h2>Nouvelle demande reçue</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${sujet}</p>
            <hr/>
            <p style="white-space:pre-wrap">${fullMessage}</p>
          `,
        }),
      }).catch(() => {
        // Email failure ne doit pas faire échouer la sauvegarde
      })
    }

    return NextResponse.json({ ok: true, id: demande.id }, { status: 201 })
  } catch (err) {
    console.error('[/api/contact] error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
