export const qualificationVersion = '2026-09-v1'
export const choices = {
  offer: ['product', 'ai', 'unsure'], size: ['small', '20-250', 'large', 'funded'], budget: ['under15', '15-25', '25-50', '50plus', 'unknown'], timing: ['30', '90', 'later'], sponsor: ['yes', 'no'], readiness: ['ready', 'partial', 'unknown'],
} as const
export type Answers = { offer: string; size: string; budget: string; timing: string; sponsor: string; readiness: string; problem: string }
export function qualify(a: Answers) {
  const factors = [a.size==='20-250'||a.size==='funded'||a.size==='large', ['25-50','50plus'].includes(a.budget), a.timing==='30',a.sponsor==='yes',a.readiness==='ready']
  const score=factors.filter(Boolean).length*2
  const readyForMeeting = score >= 8 && a.offer !== 'unsure' && a.sponsor === 'yes' && ['25-50', '50plus'].includes(a.budget)
  const route=a.budget==='under15' ? 'clarify' : readyForMeeting ? 'meeting' : 'blueprint'
  return {score,route,version:qualificationVersion,factors}
}
