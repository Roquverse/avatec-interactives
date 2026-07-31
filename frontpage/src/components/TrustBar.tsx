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
    <section
      style={{
        borderTop: '1px solid #232323',
        borderBottom: '1px solid #232323',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Scrolling tech strip */}
      <div style={{ borderTop: '1px solid #232323', padding: '28px 0', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(90deg, #0a0a0a, transparent)', zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
            background: 'linear-gradient(270deg, #0a0a0a, transparent)', zIndex: 1,
          }}
        />
        <div className="animate-scroll-logos" style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', width: 'max-content', alignItems: 'center' }}>
          {[...technologies, ...technologies].map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Outfit',
                fontWeight: 800,
                fontSize: 24,
                color: '#333',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ab0924')}
              onMouseLeave={e => (e.currentTarget.style.color = '#333')}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
