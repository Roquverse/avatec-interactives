const articles = [
  {
    tag: 'Business',
    title: 'What it really costs to build an app in 2025',
    excerpt: 'A transparent breakdown of development costs, timelines, and the hidden factors that blow up budgets.',
    date: 'Jan 15, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
  },
  {
    tag: 'AI',
    title: 'How AI is reshaping software development',
    excerpt: 'From Copilot to agent-based coding — the practical reality of building with AI in your workflow.',
    date: 'Jan 8, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=400&fit=crop&auto=format',
  },
  {
    tag: 'Case Study',
    title: 'How we built a SaaS invoicing platform in 10 weeks',
    excerpt: "The full inside story — architecture decisions, trade-offs, and what we'd do differently.",
    date: 'Dec 20, 2024',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
  },
  {
    tag: 'Engineering',
    title: 'Lessons from shipping 20 products',
    excerpt: 'Hard-won insights on scoping, communication, architecture, and keeping momentum on product builds.',
    date: 'Dec 10, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=400&fit=crop&auto=format',
  },
]

export default function Insights() {
  return (
    <section className="mobile-padded" style={{ background: 'linear-gradient(160deg, #08071a 0%, #0d0b22 40%, #0b0918 75%, #06050f 100%)', borderTop: '1px solid #232323' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
        <div className="stack-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>Insights</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white' }}>From the studio.</h2>
          </div>
          <button className="btn-ghost">View all articles →</button>
        </div>

        <div className="responsive-grid-2">
          {articles.map((article, i) => (
            <div
              key={i}
              className="insight-card"
            >
              <div style={{ height: i === 0 ? 280 : 180, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className="badge" style={{ fontSize: 10, padding: '3px 10px' }}>{article.tag}</span>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: i === 0 ? 22 : 17, color: 'white', marginBottom: 10, lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 14, color: '#a3a3a3', lineHeight: 1.6, marginBottom: 16, fontFamily: 'Inter' }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#555' }}>
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
