import { Braces, Database, ShieldCheck, Smartphone, Workflow, FlaskConical, Server, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'

const agents = [
  { label: 'Backend', detail: 'NestJS', icon: Server, x: 50, y: 7, color: '#4364ce' },
  { label: 'Frontend', detail: 'Next.js', icon: Braces, x: 81, y: 19, color: '#3d748e' },
  { label: 'Données', detail: 'Database', icon: Database, x: 93, y: 50, color: '#8659ba' },
  { label: 'Qualité', detail: 'QA & tests', icon: FlaskConical, x: 81, y: 81, color: '#347a64' },
  { label: 'Sécurité', detail: 'Security', icon: ShieldCheck, x: 50, y: 93, color: '#ba6472' },
  { label: 'DevOps', detail: 'Delivery', icon: Workflow, x: 19, y: 81, color: '#a8783d' },
  { label: 'Mobile', detail: 'React Native', icon: Smartphone, x: 7, y: 50, color: '#3f859c' },
  { label: 'IA appliquée', detail: 'AI / LLM', icon: Sparkles, x: 19, y: 19, color: '#7762b8' },
]

export function EngineeringOS() {
  return <figure className="m-os" aria-label="ADA, AI Engineering OS multi-engine : Claude Code et Codex, reliés à huit expertises spécialisées sous supervision humaine.">
    <div className="m-os-depth">
      <div className="m-os-halo" aria-hidden="true" />
      <div className="m-os-ring m-os-ring-one" aria-hidden="true" />
      <div className="m-os-ring m-os-ring-two" aria-hidden="true" />
      <svg className="m-os-branches" viewBox="0 0 100 100" aria-hidden="true">
        {agents.map((agent, index) => <g key={agent.label} style={{ '--branch-delay': `${-index * 0.6}s` } as CSSProperties}>
          <path className="m-os-track" d={`M50 50 L${agent.x} ${agent.y}`} />
          <path className="m-os-flow" d={`M50 50 L${agent.x} ${agent.y}`} />
        </g>)}
      </svg>
      <div className="m-os-center">
        <span className="m-os-kicker">ADA</span>
        <strong>AI Engineering<br />OS</strong>
        <span className="m-os-multi">MULTI-ENGINE</span>
        <div className="m-os-engines"><span><i aria-hidden="true">✳</i>Claude Code</span><span><i aria-hidden="true">⌘</i>Codex</span></div>
      </div>
      {agents.map(({ label, detail, icon: Icon, x, y, color }, index) => <div key={label} className="m-os-node-position" style={{ left: `${x}%`, top: `${y}%`, '--agent-color': color, '--agent-delay': `${-index * 0.55}s` } as CSSProperties}>
        <div className="m-os-node"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /><strong>{label}</strong><small>{detail}</small></div>
      </div>)}
    </div>
    <figcaption><ShieldCheck size={14} aria-hidden="true" /> Expertises coordonnées. Supervision humaine.</figcaption>
  </figure>
}
