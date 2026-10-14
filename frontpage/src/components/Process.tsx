import { useState } from 'react'

const stages = [
  { name: 'Discover', icon: '◎', desc: 'Deep-dive into your business, users, and technical landscape. We define success before writing a line of code.' },
  { name: 'Design',   icon: '✦', desc: 'Wireframes, user flows, and a full design system that communicates clearly and converts users.' },
  { name: 'Build',    icon: '⬡', desc: 'Agile sprints, weekly demos, and continuous deployment. You see progress every step of the way.' },
  { name: 'Launch',   icon: '◈', desc: 'Production deployment with CI/CD pipelines, monitoring, and a smooth launch playbook.' },
  { name: 'Scale',    icon: '⊕', desc: 'Performance optimization, feature expansion, and long-term technical partnership as your product grows.' },
]

export default function Process() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="cf-section">
      <div className="cf-shell">
        <div className="cf-bar">
          <span><span className="cf-dot" />03 — Our Process</span>
          <span>{String(stages.length).padStart(2, '0')} Stages</span>
        </div>

        <div className="cf-head">
          <h2 className="cf-h2">How we <em>deliver.</em></h2>
        </div>

        <div className="cf-grid c5">
          {stages.map((stage, i) => (
            <div
              key={i}
              className="cf-cell ticks hoverable cf-cell-pad"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'default', minHeight: 240 }}
            >
              <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: active === i ? 'var(--cf-accent)' : 'var(--cf-dim)', marginBottom: 32, transition: 'color 0.25s' }}>
                STEP {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 24, color: active === i ? 'var(--cf-accent)' : 'var(--cf-muted)', marginBottom: 14, transition: 'color 0.25s' }}>
                {stage.icon}
              </div>
              <div style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.03em', color: '#fff', marginBottom: 12 }}>
                {stage.name}
              </div>
              <div
                className="process-desc-mobile"
                style={{
                  fontSize: 13, color: 'var(--cf-muted)', lineHeight: 1.65, fontFamily: 'Inter',
                  maxHeight: active === i ? 160 : 0, opacity: active === i ? 1 : 0,
                  overflow: 'hidden', transition: 'all 0.4s ease',
                }}
              >
                {stage.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
