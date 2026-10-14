const articles = [
  {
    tag: 'Business',
    title: 'What it really costs to build an app in 2025',
    excerpt: 'A transparent breakdown of development costs, timelines, and the hidden factors that blow up budgets.',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=750&fit=crop&auto=format',
  },
  {
    tag: 'AI',
    title: 'How AI is reshaping software development',
    excerpt: 'From Copilot to agent-based coding — the practical reality of building with AI in your workflow.',
    date: 'Jan 8, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=750&fit=crop&auto=format',
  },
  {
    tag: 'Case Study',
    title: 'How we built a SaaS invoicing platform in 10 weeks',
    excerpt: "The full inside story — architecture decisions, trade-offs, and what we'd do differently.",
    date: 'Dec 20, 2024',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop&auto=format',
  },
  {
    tag: 'Engineering',
    title: 'Lessons from shipping 20 products',
    excerpt: 'Hard-won insights on scoping, communication, architecture, and keeping momentum on product builds.',
    date: 'Dec 10, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&h=750&fit=crop&auto=format',
  },
]

export default function Insights({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className="cf-section">
      <div className="cf-shell">
        {!hideHeader && (
          <>
            <div className="cf-bar">
              <span><span className="cf-dot" />05 — Insights</span>
              <span>{String(articles.length).padStart(2, '0')} Articles</span>
            </div>

            <div className="cf-head">
              <h2 className="cf-h2">From the <em>studio.</em></h2>
              <button className="cf-btn ghost">View all articles →</button>
            </div>
          </>
        )}

        <div className="cf-grid c2" style={hideHeader ? { borderTop: 'none' } : undefined}>
          {articles.map((article, i) => (
            <div key={i} className="cf-cell ticks hoverable" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', position: 'relative', borderBottom: '1px solid var(--cf-line)' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) saturate(0.85)', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', top: 14, left: 14 }}>
                  <span className="cf-tag accent" style={{ background: 'rgba(17,17,19,0.85)' }}>{article.tag}</span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cf-dim)', marginBottom: 12 }}>
                  <span>{article.date}</span>
                  <span>/</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: i === 0 ? 24 : 20, color: '#fff', marginBottom: 10, lineHeight: 1.25, letterSpacing: '-0.03em' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.65, fontFamily: 'Inter', margin: 0 }}>
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
