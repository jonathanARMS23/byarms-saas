export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://byarms.com'
export const SITE_NAME = 'ByARMS'
export const SITE_LEGAL_NAME = 'ARMS INTERNATIONAL LTD'
export const SITE_COMPANY_NUMBER = '17382099'
export const SITE_TITLE = 'ByARMS — Développement logiciel et IA sur mesure au forfait'
export const SITE_DESCRIPTION =
  'Studio francophone : produits logiciels et automatisations IA livrés au forfait, dès 29 900 € HT, code transféré. Propulsé par ADA.'
export const ADA_DOCS_URL = 'https://ada.byarms.com'

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
