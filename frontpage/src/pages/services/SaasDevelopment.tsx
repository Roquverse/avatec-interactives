import PageHero from '../../components/PageHero'
import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function SaasDevelopment() {
  return (
    <div>
      <PageHero
        label="Services — SaaS Development"
        meta="Avatec Interactives"
        title="SaaS Development."
        lede="We build multi-tenant SaaS platforms equipped with complex role-based access control, secure subscription billing integration, and the infrastructure needed to support 100K+ concurrent users."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-grid c3" style={{ borderTop: 'none' }}>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>01</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Multi-tenancy</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Secure data isolation and scalable architectures designed specifically for B2B and B2C software-as-a-service.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>02</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Billing Integration</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Flawless integration with Stripe or Paddle for subscriptions, usage-based billing, and invoicing.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>03</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Admin Dashboards</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Comprehensive internal tooling so your team can manage users, view analytics, and support customers effectively.</p>
          </div>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
