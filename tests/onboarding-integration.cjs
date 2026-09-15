// Run against the local application only: node tests/onboarding-integration.cjs
const assert=require('node:assert/strict')
const {loadEnvConfig}=require('@next/env')
const {PrismaClient}=require('@prisma/client')
const crypto=require('node:crypto')
loadEnvConfig(process.cwd())
const base='http://127.0.0.1:3102'
const prisma=new PrismaClient()
async function main(){
  const {SignJWT}=await import('jose')
  const jwt=await new SignJWT({role:'admin',email:process.env.ADMIN_EMAIL}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('5m').sign(new TextEncoder().encode(process.env.ADMIN_JWT_SECRET))
  const admin=`byarms_admin=${jwt}`
  async function call(path,body,cookie='',method='POST',origin=base){return fetch(base+path,{method,headers:{'Content-Type':'application/json',Origin:origin,Cookie:cookie},body:JSON.stringify(body)})}
  let r=await call('/api/admin/onboarding',{});assert.equal(r.status,401)
  r=await call('/api/admin/onboarding',{},admin,'POST','https://other.invalid');assert.equal(r.status,403)
  r=await call('/api/admin/onboarding',{company:'TEST Onboarding local',title:'TEST Intégration',email:'onboarding-test@example.invalid',offer:'ai'},admin);assert.equal(r.status,200)
  const {path}=await r.json();const token=new URLSearchParams(path.split('#')[1]).get('invitation')
  const row=await prisma.onboardingAccess.findUnique({where:{tokenHash:crypto.createHash('sha256').update(token).digest('hex')}})
  const id=row.onboardingId
  r=await call('/api/onboarding/access',{token});assert.equal(r.status,200)
  const cookie=r.headers.get('set-cookie').split(';')[0]
  r=await call('/api/onboarding/access',{token});assert.equal(r.status,401)
  console.log('PASS: admin authorization, origin, invitation creation and single use')
  const answers={sponsor:{value:'Décideur de test',status:'CONFIRME',owner:'',due:''}}
  r=await call('/api/onboarding',{answers,revision:0,submit:false},cookie,'PATCH');assert.equal(r.status,200)
  r=await call('/api/onboarding',{answers,revision:0,submit:false},cookie,'PATCH');assert.equal(r.status,409)
  r=await call('/api/onboarding',{answers,revision:1,submit:true},cookie,'PATCH');assert.equal(r.status,400)
  r=await call('/api/admin/onboarding',{id,gate:'G1',approved:true,note:'Test',revision:1},admin,'PATCH');assert.equal(r.status,400)
  const stored=await prisma.onboarding.findUnique({where:{id}});assert.equal(stored.answers.sponsor.value,'Décideur de test')
  console.log('PASS: persistence, revision conflict, incomplete submission and gate rejection')
  r=await call('/api/admin/onboarding',{action:'invite',id},admin);assert.equal(r.status,200)
  r=await call('/api/onboarding',{answers,revision:1,submit:false},cookie,'PATCH');assert.equal(r.status,401)
  await prisma.onboardingAccess.updateMany({where:{onboardingId:id},data:{revokedAt:new Date()}})
  console.log('PASS: renewal revokes old session; test accesses revoked')
}
main().catch(e=>{console.error(e.message);process.exitCode=1}).finally(()=>prisma.$disconnect())
