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
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ marginBottom: 64 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Our Process</div>
        <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white' }}>
          How we deliver.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, position: 'relative' }}>
        {/* Connecting line */}
        <div
          style={{
            position: 'absolute', top: 28, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(90deg, transparent, #232323 20%, #232323 80%, transparent)',
            zIndex: 0,
          }}
        />

        {stages.map((stage, i) => (
          <div
            key={i}
            className="process-node"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', padding: '0 12px', cursor: 'default',
              position: 'relative', zIndex: 1,
            }}
          >
            <div
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: active === i ? 'rgba(171, 9, 36,0.2)' : '#161616',
                border: active === i ? '1px solid rgba(171, 9, 36,0.5)' : '1px solid #232323',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: active === i ? '#ab0924' : '#555',
                transition: 'all 0.3s ease',
                boxShadow: active === i ? '0 0 24px rgba(171, 9, 36,0.3)' : 'none',
                marginBottom: 20,
              }}
            >
              {stage.icon}
            </div>

            <div
              style={{
                fontFamily: 'Outfit', fontWeight: 700, fontSize: 16,
                color: active === i ? 'white' : '#a3a3a3',
                marginBottom: 12, transition: 'color 0.3s',
              }}
            >
              {stage.name}
            </div>

            <div
              style={{
                fontSize: 13, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter',
                maxHeight: active === i ? 120 : 0,
                opacity: active === i ? 1 : 0,
                overflow: 'hidden', transition: 'all 0.4s ease',
              }}
            >
              {stage.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
