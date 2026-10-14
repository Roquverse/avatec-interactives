import PageHero from '../../components/PageHero'
import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function AiAutomation() {
  return (
    <div>
      <PageHero
        label="Services — AI & Automation"
        meta="Avatec Interactives"
        title="AI & Automation."
        lede="Stop doing manual work. We build intelligent automation systems, integrate GPT-powered workflows, and train custom AI models that turn your proprietary data into a massive competitive advantage."
      />

      <section className="cf-section">
        <div className="cf-shell">
          <div className="cf-grid c3" style={{ borderTop: 'none' }}>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>01</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>LLM Integration</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Embed OpenAI, Anthropic, or open-source models directly into your product to create magical user experiences.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>02</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Workflow Automation</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Connect APIs, databases, and third-party tools to eliminate data entry and human error entirely.</p>
          </div>
          <div className="cf-cell ticks hoverable cf-cell-pad" style={{ minHeight: 220 }}>
            <div style={{ fontFamily: 'var(--cf-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--cf-dim)', marginBottom: 24 }}>03</div>
            <h3 style={{ fontFamily: 'var(--cf-sans)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.03em', color: 'white', marginBottom: 12 }}>Custom Agents</h3>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--cf-muted)', lineHeight: 1.7, margin: 0 }}>Deploy autonomous AI agents capable of reasoning, searching the web, and executing complex tasks on your behalf.</p>
          </div>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
