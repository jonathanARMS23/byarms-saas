import { SignJWT, jwtVerify } from 'jose'

const ADMIN_EMAIL    = 'admin@byarms.com'
const ADMIN_HASH     = '$2b$12$n8KobVPa.36dZ5X8nFJcUusuRrkzvCY/bNaQlWsiVqV5jq/ZUCkHe'
const JWT_SECRET_RAW = 'byarms-admin-secret-2026-xK9mPqR7nWjL'
const JWT_SECRET     = new TextEncoder().encode(JWT_SECRET_RAW)
const COOKIE_NAME    = 'byarms_admin'

export { ADMIN_EMAIL, ADMIN_HASH, JWT_SECRET, COOKIE_NAME }

export async function signToken(payload: Record<string, string>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .setIssuedAt()
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}
