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

export default function Services({ hideHeader = false }: { hideHeader?: boolean }) {
  const services = Object.keys(serviceIcons)

  return (
    <section className="cf-section">
      <div className="cf-shell">
        {!hideHeader && (
          <>
            <div className="cf-bar">
              <span><span className="cf-dot" />02 — Services</span>
              <span>{String(services.length).padStart(2, '0')} Disciplines</span>
            </div>

            <div className="cf-head">
              <h2 className="cf-h2">What we <em>build.</em></h2>
              <p className="cf-lede">
                From early-stage startups to scaling enterprises — we cover the full product stack.
              </p>
            </div>
          </>
        )}

        <div className="cf-grid c3" style={hideHeader ? { borderTop: 'none' } : undefined}>
          {services.map((svc, i) => (
            <Link
              key={svc}
              to={`/services/${svc.toLowerCase().replace(/ & /g, '-').replace(/[\s\/]+/g, '-')}`}
              className="cf-cell ticks hoverable cf-cell-pad"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none', minHeight: 280 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <div style={{
                    width: 40, height: 40, border: '1px solid var(--cf-line-strong)', borderRadius: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cf-accent)',
                  }}>
                    <Icon d={serviceIcons[svc]} size={18} stroke="currentColor" />
                  </div>
                  <span style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, color: '#fff', marginBottom: 10, letterSpacing: '-0.03em' }}>
                  {svc}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, fontFamily: 'Inter', margin: 0 }}>
                  {serviceDescs[svc]}
                </p>
              </div>
              <span style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cf-text)', marginTop: 24 }}>
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
