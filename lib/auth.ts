import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@byarms.com'
export const COOKIE_NAME = 'byarms_admin'

function secret() {
  const value = process.env.ADMIN_JWT_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_JWT_SECRET must contain at least 32 characters')
  return new TextEncoder().encode(value)
}
export async function signToken(payload:Record<string,string>) {
  return new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setExpirationTime('8h').setIssuedAt().sign(secret())
}
export async function verifyToken(token:string) {
  try { const {payload}=await jwtVerify(token,secret(),{algorithms:['HS256']});return payload.role==='admin'?payload:null } catch {return null}
}
