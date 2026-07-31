import { Link } from 'react-router-dom'
import { Icon } from './shared'

const serviceIcons: Record<string, string> = {
  'Web Applications':    'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  'Mobile Apps':         'M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z',
  'AI & Automation':     'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'Product Engineering': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'SaaS Development':    'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  'UI/UX Design':        'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
}

const serviceDescs: Record<string, string> = {
  'Web Applications':    'Full-stack web apps built for scale — from MVPs to enterprise platforms using React, Next.js, and modern backend stacks.',
  'Mobile Apps':         'Cross-platform mobile apps with Flutter and React Native that feel native on iOS and Android from day one.',
  'AI & Automation':     'Intelligent automation systems, GPT-powered workflows, and custom AI models that turn data into business value.',
  'Product Engineering': 'End-to-end product ownership — architecture, development, QA, deployment, and ongoing iteration.',
  'SaaS Development':    'Multi-tenant SaaS platforms with subscription billing, team management, and the infrastructure to grow to 100K users.',
  'UI/UX Design':        'Design systems, user research, and pixel-perfect interfaces that convert visitors into loyal customers.',
}

const layout = [
  { cols: 2, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 1 },
]

export default function Services() {
  const services = Object.keys(serviceIcons)

  return (
    <section style={{ background: 'linear-gradient(160deg, #08071a 0%, #0d0b22 40%, #0b0918 75%, #06050f 100%)', borderTop: '1px solid #232323', borderBottom: '1px solid #232323' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white' }}>
              What we build.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: '#a3a3a3', maxWidth: 360, lineHeight: 1.7, fontFamily: 'Inter' }}>
            From early-stage startups to scaling enterprises — we cover the full product stack.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '280px', gap: 16 }}>
          {services.map((svc, i) => {
            const l = layout[i]
            return (
              <Link
                key={svc}
                to={`/services/${svc.toLowerCase().replace(/ & /g, '-').replace(/[\s\/]+/g, '-')}`}
                className="service-card"
                style={{
                  gridColumn: `span ${l.cols}`,
                  gridRow: `span ${l.rows}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
              >
                <div>
                  <div
                    style={{
                      width: 44, height: 44,
                      background: 'rgba(171, 9, 36,0.12)',
                      border: '1px solid rgba(171, 9, 36,0.2)',
                      borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 20,
                    }}
                  >
                    <Icon d={serviceIcons[svc]} size={20} stroke="#e184a6" />
                  </div>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 10, letterSpacing: '-0.02em' }}>
                    {svc}
                  </h3>
                  <p style={{ fontSize: 14, color: '#a3a3a3', lineHeight: 1.7, fontFamily: 'Inter' }}>
                    {serviceDescs[svc]}
                  </p>
                </div>
                <span 
                  className="btn-ghost" 
                  style={{ fontSize: 13, padding: '8px 16px', marginTop: 20, width: 'fit-content' }}
                >
                  Learn more →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
