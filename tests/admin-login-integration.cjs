const assert = require('node:assert/strict')
const {loadEnvConfig} = require('@next/env')
const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
loadEnvConfig(process.cwd())
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3102'
if (!['localhost','127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local tests only')
const p = new PrismaClient()
async function main() {
  const password = process.env.TEST_ADMIN_PASSWORD
  assert.ok(password, 'TEST_ADMIN_PASSWORD required')
  const email = 'admin@byarms.com'
  const row = await p.adminCredential.findUnique({where:{email}})
  assert.ok(row)
  assert.ok(await bcrypt.compare(password, row.passwordHash))
  async function login(body, origin = base) {
    return fetch(base+'/api/admin/login', {method:'POST', headers:{'Content-Type':'application/json',Origin:origin}, body:JSON.stringify(body)})
  }
  assert.equal((await login({email,password}, 'https://other.invalid')).status,403)
  assert.equal((await login({email,password:'invalid-password'})).status,401)
  assert.equal((await login(null)).status,401)
  const response = await login({email,password})
  assert.equal(response.status,200)
  const cookie = response.headers.get('set-cookie')
  assert.match(cookie,/HttpOnly/i)
  assert.match(cookie,/SameSite=lax/i)
  const admin = await fetch(base+'/admin/onboarding', {headers:{Cookie:cookie.split(';')[0]},redirect:'manual'})
  assert.equal(admin.status,200)
  console.log('PASS: migrated credential, wrong password, invalid input, origin, session and protected admin')
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(()=>p.$disconnect())
