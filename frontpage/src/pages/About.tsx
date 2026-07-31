import FinalCTA from '../components/FinalCTA'

export default function About() {
  return (
    <div>
      {/* Hero / Brand Section */}
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Our Story</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          We engineer digital momentum.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter' }}>
          Avatec Interactives is a premium software engineering studio. We don't just write code; we partner with ambitious businesses to build scalable platforms, intuitive SaaS products, and AI-driven solutions that redefine their industries.
        </p>
      </section>

      {/* Mission & Vision Split Section */}
      <section style={{ background: 'linear-gradient(160deg, #08071a 0%, #0d0b22 40%, #0b0918 75%, #06050f 100%)', borderTop: '1px solid #232323', borderBottom: '1px solid #232323' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>

          {/* Mission */}
          <div style={{ padding: '100px 40px', borderRight: '1px solid #232323' }}>
            <div style={{ width: 48, height: 48, background: 'rgba(171, 9, 36, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ab0924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 600, color: 'white', marginBottom: 16 }}>Our Mission</h2>
            <p style={{ fontFamily: 'Inter', fontSize: 18, color: '#a3a3a3', lineHeight: 1.6 }}>
              To democratize elite software engineering by providing startups and enterprises with the world-class technical execution required to turn their boldest ideas into market-leading digital products.
            </p>
          </div>

          {/* Vision */}
          <div style={{ padding: '100px 40px' }}>
            <div style={{ width: 48, height: 48, background: 'rgba(171, 9, 36, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ab0924" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h4l3-9 5 18 3-9h5"></path>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 600, color: 'white', marginBottom: 16 }}>Our Vision</h2>
            <p style={{ fontFamily: 'Inter', fontSize: 18, color: '#a3a3a3', lineHeight: 1.6 }}>
              To be the trusted technical backbone for the next generation of industry disruptors, known universally for our relentless pursuit of engineering excellence and stunning user experiences.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ padding: '140px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label" style={{ marginBottom: 16, display: 'inline-block' }}>Core Values</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'white' }}>What drives us.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {[
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
          ].map((value, i) => (
            <div key={i} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 24, padding: 40, transition: 'transform 0.3s ease, border-color 0.3s ease' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = '#ab0924'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = '#1a1a1a'
              }}
            >
              <div style={{ width: 48, height: 48, background: '#111', border: '1px solid #222', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {value.icon}
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 600, color: 'white', marginBottom: 12 }}>{value.title}</h3>
              <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#a3a3a3', lineHeight: 1.6 }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section style={{ padding: '100px 40px', background: '#080808', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img
              src="/ceo.png"
              alt="Founder"
              style={{ width: '100%', borderRadius: 24, objectFit: 'cover', aspectRatio: '4/5', border: '1px solid #232323' }}
            />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>The Founder</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'white', marginBottom: 24 }}>
              Oluwadamilola Olawale Cole
            </h2>
            <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter', marginBottom: 24 }}>
              "My journey into software engineering didn’t begin in a traditional tech company. I started in the creative industry as a DJ and content creator, where I learned one lesson that still shapes how I build products today: great experiences are designed around people, not technology."
            </p>
            <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter' }}>
              "That perspective has influenced every product we’ve built at Avatec."
            </p>
            <br />
            <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter' }}>
              "Over the years, I’ve worked with startups, businesses, and international clients to design and develop web applications, mobile apps, SaaS platforms, and AI-powered business systems. I’ve learned that the best software isn’t the one with the most features—it’s the one that solves a real business problem and creates measurable growth."
            </p>
            <br />
            <p style={{ fontSize: 18, color: '#a3a3a3', lineHeight: 1.6, fontFamily: 'Inter' }}>
              "At Avatec, we approach every project like a product team. We think about user experience, scalability, automation, performance, and long-term business value from day one. Whether we’re building an MVP for a startup or a custom platform for an established company, our goal is the same: build software that helps businesses move faster and grow smarter."
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
              <a href="#" className="btn-primary" style={{ textDecoration: 'none' }}>Connect on LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '140px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-label" style={{ marginBottom: 16, display: 'inline-block' }}>Client Testimony</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: 'white' }}>Don't just take our word for it.</h2>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', margin: '0 -40px', padding: '0 40px' }}>
          <div className="animate-scroll-logos" style={{ display: 'flex', gap: 32, width: 'max-content' }}>
            {[
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
            ].map((testimony, i) => (
              <div key={i} style={{ width: 400, flexShrink: 0, background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 24, padding: 40 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ab0924" style={{ marginBottom: 24, opacity: 0.5 }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p style={{ fontFamily: 'Inter', fontSize: 20, color: 'white', lineHeight: 1.6, marginBottom: 32 }}>"{testimony.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src={testimony.img} alt={testimony.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 600, color: 'white' }}>{testimony.name}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, color: '#888' }}>{testimony.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: '80px 40px 140px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 40, textAlign: 'center' }}>Technologies We Use</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px 80px', opacity: 0.5 }}>
          {/* Using text for partner logos as placeholder */}
          {['Flutter', 'Vercel', 'Supabase', 'Stripe', 'Postgresql', 'Nextjs', 'Firebase', 'shadcn UI', 'Prisma', 'Redis', 'Paypal', 'AWS', 'Resend', 'Cloudinary', 'Google Maps', 'Medusa.js', 'HTML', 'CSS', 'JavaScript', 'Php', 'MySQL', 'Wordpress', 'Paystack', 'Flutterwave', 'Tailwind', 'Nestjs', 'Clouflare'].map(partner => (
            <div key={partner} style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
              {partner}
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
    </div>
  )
}
