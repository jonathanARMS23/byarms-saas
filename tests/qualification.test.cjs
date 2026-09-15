const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const vm = require('node:vm')
const source = fs.readFileSync(require('node:path').join(__dirname, '../lib/qualification.ts'), 'utf8')
const context = { exports: {} }
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context)
const { qualify } = context.exports
const ready = { offer:'ai', size:'20-250', budget:'25-50', timing:'30', sponsor:'yes', readiness:'ready', problem:'Un processus manuel à automatiser.' }
test('qualified organisation gets a meeting', () => assert.equal(qualify(ready).route, 'meeting'))
test('missing decision maker never gets a direct meeting', () => assert.equal(qualify({...ready,sponsor:'no'}).route, 'blueprint'))
test('insufficient or unknown build budget goes to scoping', () => {
  for(const budget of ['15-25','unknown']) assert.equal(qualify({...ready,budget}).route, 'blueprint')
})
test('small budget receives constructive clarification', () => assert.equal(qualify({...ready,budget:'under15'}).route,'clarify'))
test('uncertain direction requires a blueprint', () => assert.equal(qualify({...ready,offer:'unsure'}).route,'blueprint'))
