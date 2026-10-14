import PageHero from '../../components/PageHero'
import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function WebApplications() {
  return (
    <div>
      <PageHero
        label="Services — Web Applications"
        meta="Avatec Interactives"
        title="Web Applications."
        lede="We architect and build full-stack web applications capable of scaling to millions of users. Whether you're launching a minimal viable product (MVP) or an enterprise-grade platform, we use modern technologies like React, Next.js, and highly resilient backend services to ensure flawless performance."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-grid c3" style={{ borderTop: 'none' }}>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>01</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Frontend Excellence</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Lighting-fast interfaces built with React and Next.js, optimized for Core Web Vitals and accessibility.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>02</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Robust Backends</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Scalable APIs and microservices using Node.js, Python, or Go, paired with PostgreSQL or Redis.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>03</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Cloud Native</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Deployed effortlessly on AWS or Vercel using modern DevOps practices for zero-downtime updates.</p>
          </div>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
