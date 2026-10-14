import PageHero from '../components/PageHero'
import FinalCTA from '../components/FinalCTA'

const values = [
  {
    title: 'Engineering Excellence',
    desc: 'We refuse to ship mediocre code. Every product we build is architected for speed, security, and limitless scalability.',
    icon: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>
  },
  {
    title: 'Radical Transparency',
    desc: 'No black boxes. We keep you deeply involved in the development process with constant communication and crystal-clear milestones.',
    icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
  },
  {
    title: 'Client Partnership',
    desc: 'We are not just a vendor; we are an extension of your team. Your success is the only metric that truly matters to us.',
    icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>
  }
]

const testimonies = [
  {
    quote: "Avatec didn't just build our app; they fundamentally improved our entire product strategy. Their technical execution is flawless.",
    name: "Sarah Jenkins",
    role: "CTO, DreamMedia",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The SaaS platform they delivered is handling 50k+ concurrent users without breaking a sweat. Worth every single penny.",
    name: "Michael Chen",
    role: "Founder, Ojuse",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Avatec didn't just build our app; they fundamentally improved our entire product strategy. Their technical execution is flawless.",
    name: "Sarah Jenkins",
    role: "CTO, DreamMedia",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The SaaS platform they delivered is handling 50k+ concurrent users without breaking a sweat. Worth every single penny.",
    name: "Michael Chen",
    role: "Founder, Ojuse",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
]

const tech = ['Flutter', 'Vercel', 'Supabase', 'Stripe', 'Postgresql', 'Nextjs', 'Firebase', 'shadcn UI', 'Prisma', 'Redis', 'Paypal', 'AWS', 'Resend', 'Cloudinary', 'Google Maps', 'Medusa.js', 'HTML', 'CSS', 'JavaScript', 'Php', 'MySQL', 'Wordpress', 'Paystack', 'Flutterwave', 'Tailwind', 'Nestjs', 'Clouflare']

const iconBox: React.CSSProperties = {
  width: 44, height: 44, border: '1px solid var(--cf-line-strong)', borderRadius: 2,
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cf-accent)', marginBottom: 28,
}

export default function About() {
  return (
    <div>
      <PageHero
        label="About — Our Story"
        meta="Avatec Interactives"
        title="We engineer digital momentum."
        lede="Avatec Interactives is a premium software engineering studio. We don't just write code; we partner with ambitious businesses to build scalable platforms, intuitive SaaS products, and AI-driven solutions that redefine their industries."
      />

      {/* Mission & Vision */}
      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-bar">
            <span><span className="cf-dot" />01 — Mission &amp; Vision</span>
            <span>02 Principles</span>
          </div>
          <div className="cf-grid c2" style={{ borderTop: 'none' }}>
            <div className="cf-cell ticks cf-cell-pad" style={{ padding: '72px clamp(24px, 4vw, 56px)' }}>
              <div style={iconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h2 style={{ fontFamily: 'var(--cf-sans)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.035em', color: 'white', marginBottom: 16 }}>Our Mission</h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, margin: 0 }}>
                To democratize elite software engineering by providing startups and enterprises with the world-class technical execution required to turn their boldest ideas into market-leading digital products.
              </p>
            </div>

            <div className="cf-cell ticks cf-cell-pad" style={{ padding: '72px clamp(24px, 4vw, 56px)' }}>
              <div style={iconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h4l3-9 5 18 3-9h5"></path>
                </svg>
              </div>
              <h2 style={{ fontFamily: 'var(--cf-sans)', fontSize: 32, fontWeight: 600, letterSpacing: '-0.035em', color: 'white', marginBottom: 16 }}>Our Vision</h2>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, margin: 0 }}>
                To be the trusted technical backbone for the next generation of industry disruptors, known universally for our relentless pursuit of engineering excellence and stunning user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-bar">
            <span><span className="cf-dot" />02 — Core Values</span>
            <span>{String(values.length).padStart(2, '0')} Values</span>
          </div>
          <div className="cf-head">
            <h2 className="cf-h2">What <em>drives us.</em></h2>
          </div>
          <div className="cf-grid c3">
            {values.map((value, i) => (
              <div key={i} className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 280 }}>
                <div style={iconBox}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {value.icon}
                  </svg>
                </div>
                <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 10 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'var(--cf-sans)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>{value.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-bar">
            <span><span className="cf-dot" />03 — The Founder</span>
            <span className="hide-mobile">Avatec Interactives</span>
          </div>
          <div className="cf-grid cf-founder-grid" style={{ borderTop: 'none' }}>
            <div className="cf-cell ticks hoverable" style={{ overflow: 'hidden' }}>
              <img
                src="/ceo.png"
                alt="Founder"
                style={{ width: '100%', height: '100%', minHeight: 420, objectFit: 'cover', display: 'block', aspectRatio: '4/5' }}
              />
            </div>
            <div className="cf-cell" style={{ background: 'transparent', padding: 'clamp(32px, 5vw, 72px)' }}>
              <h2 className="cf-h2" style={{ marginBottom: 28, fontSize: 'clamp(32px, 3.6vw, 52px)' }}>
                Oluwadamilola <em>Olawale Cole</em>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, fontFamily: 'Inter', marginBottom: 20 }}>
                "My journey into software engineering didn’t begin in a traditional tech company. I started in the creative industry as a DJ and content creator, where I learned one lesson that still shapes how I build products today: great experiences are designed around people, not technology."
              </p>
              <p style={{ fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, fontFamily: 'Inter', marginBottom: 20 }}>
                "That perspective has influenced every product we’ve built at Avatec."
              </p>
              <p style={{ fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, fontFamily: 'Inter', marginBottom: 20 }}>
                "Over the years, I’ve worked with startups, businesses, and international clients to design and develop web applications, mobile apps, SaaS platforms, and AI-powered business systems. I’ve learned that the best software isn’t the one with the most features—it’s the one that solves a real business problem and creates measurable growth."
              </p>
              <p style={{ fontSize: 16, color: 'var(--cf-muted)', lineHeight: 1.75, fontFamily: 'Inter', margin: 0 }}>
                "At Avatec, we approach every project like a product team. We think about user experience, scalability, automation, performance, and long-term business value from day one. Whether we’re building an MVP for a startup or a custom platform for an established company, our goal is the same: build software that helps businesses move faster and grow smarter."
              </p>
              <div style={{ marginTop: 40 }}>
                <a href="#" className="cf-btn">Connect on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-bar">
            <span><span className="cf-dot" />04 — Client Testimony</span>
            <span>Reviews</span>
          </div>
          <div className="cf-head">
            <h2 className="cf-h2">Don't just take <em>our word</em> for it.</h2>
          </div>
          <div className="cf-marquee" style={{ borderTop: '1px solid var(--cf-line)' }}>
            <div className="animate-scroll-logos" style={{ display: 'flex', width: 'max-content' }}>
              {[...testimonies, ...testimonies].map((t, i) => (
                <div key={i} className="cf-cell" style={{ width: 420, flexShrink: 0, padding: 36 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--cf-accent)" style={{ marginBottom: 20, opacity: 0.7 }}>
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p style={{ fontFamily: 'Inter', fontSize: 17, color: 'white', lineHeight: 1.6, marginBottom: 28, whiteSpace: 'normal' }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: 2, objectFit: 'cover', filter: 'grayscale(0.3)' }} />
                    <div>
                      <div style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, color: 'white', fontSize: 15 }}>{t.name}</div>
                      <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cf-dim)', marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-bar">
            <span><span className="cf-dot" />05 — Technologies We Use</span>
            <span>{tech.length} Tools</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 'clamp(32px, 5vw, 64px) clamp(24px, 4vw, 64px)' }}>
            {tech.map(partner => (
              <span key={partner} className="cf-tag" style={{ fontSize: 12, padding: '8px 14px', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--cf-accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = '' }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  )
}
