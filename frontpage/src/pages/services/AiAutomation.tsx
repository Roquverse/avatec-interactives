import Process from '../../components/Process'
import FinalCTA from '../../components/FinalCTA'

export default function AiAutomation() {
  return (
    <div>
      <section style={{ paddingTop: 160, paddingBottom: 120, maxWidth: 1280, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Services</div>
        <h1 className="display-heading" style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: 'white', marginBottom: 24, maxWidth: 900 }}>
          AI & Automation.
        </h1>
        <p style={{ fontSize: 22, color: '#a3a3a3', lineHeight: 1.6, maxWidth: 720, fontFamily: 'Inter', marginBottom: 40 }}>
          Stop doing manual work. We build intelligent automation systems, integrate GPT-powered workflows, and train custom AI models that turn your proprietary data into a massive competitive advantage.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32, marginTop: 80 }}>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>LLM Integration</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Embed OpenAI, Anthropic, or open-source models directly into your product to create magical user experiences.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Workflow Automation</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Connect APIs, databases, and third-party tools to eliminate data entry and human error entirely.</p>
          </div>
          <div style={{ background: '#101010', padding: 32, borderRadius: 16, border: '1px solid #232323' }}>
            <h3 style={{ color: 'white', fontFamily: 'Outfit', fontSize: 24, marginBottom: 12 }}>Custom Agents</h3>
            <p style={{ color: '#a3a3a3', fontFamily: 'Inter', lineHeight: 1.6 }}>Deploy autonomous AI agents capable of reasoning, searching the web, and executing complex tasks on your behalf.</p>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </div>
  )
}
