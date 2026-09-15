const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript'),vm=require('node:vm'),path=require('node:path')
const context={exports:{}}
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(__dirname,'../lib/onboarding-fields.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,context)
const {fieldsFor,completion,validateDossier}=context.exports
test('AI asks for human controls while product does not',()=>{assert(fieldsFor('ai').some(f=>f.id==='human'));assert(!fieldsFor('product').some(f=>f.id==='human'))})
test('blank answers do not count toward completion',()=>assert.equal(completion({sponsor:{value:'  '}},'ai').filled,0))
test('unknown fields and statuses are rejected',()=>{assert.equal(validateDossier({private:{value:'x'}},'ai'),false);assert.equal(validateDossier({sponsor:{value:'x',status:'APPROVED',owner:'',due:''}},'ai'),false)})
test('valid unanswered decision can be saved as a draft',()=>assert.equal(validateDossier({sponsor:{value:'',status:'A_DECIDER',owner:'',due:''}},'product'),true))
test('oversized answers rejected',()=>assert.equal(validateDossier({sponsor:{value:'x'.repeat(5001),status:'CONFIRME',owner:'',due:''}},'product'),false))
