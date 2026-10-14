const technologies = [
  'React',
  'Node.js',
  'Next.js',
  'TypeScript',
  'Supabase',
  'Stripe',
  'Nest.js',
  'Firebase',
  'Flutter',
  'Express',
  'PostgreSQL',
  'Prisma',
  'Paystack',
  'Redis',
]

const metrics = [
  ['20+', 'Projects Shipped'],
  ['US, UK & NG', 'Global clients'],
  ['SaaS & AI Products', 'Core expertise'],
  ['8+', 'Years In Operation'],
]

export default function TrustBar() {
  return (
    <section className="cf-section">
      <div className="cf-shell" style={{ display: 'flex', alignItems: 'stretch' }}>
        <div
          className="hide-mobile"
          style={{
            flexShrink: 0, padding: '0 24px', display: 'flex', alignItems: 'center',
            borderRight: '1px solid var(--cf-line)',
            fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--cf-dim)',
          }}
        >
          <span className="cf-dot" style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--cf-accent)', marginRight: 8 }} />
          Our stack
        </div>

        <div className="cf-marquee" style={{ flex: 1, padding: '22px 0' }}>
          <div className="animate-scroll-logos" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--cf-mono)', fontWeight: 500, fontSize: 13,
                  color: 'var(--cf-dim)', letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'color 0.25s', cursor: 'default',
                  display: 'inline-flex', alignItems: 'center', gap: 48,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--cf-dim)')}
              >
                {tech}
                <span style={{ color: 'var(--cf-line-strong)' }}>+</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
