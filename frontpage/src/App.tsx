import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import ServicesPage from './pages/ServicesPage'
import InsightsPage from './pages/InsightsPage'
import Contact from './pages/Contact'

// Service Detail Pages
import WebApplications from './pages/services/WebApplications'
import MobileApps from './pages/services/MobileApps'
import AiAutomation from './pages/services/AiAutomation'
import ProductEngineering from './pages/services/ProductEngineering'
import SaasDevelopment from './pages/services/SaasDevelopment'
import UiUxDesign from './pages/services/UiUxDesign'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const SELECTOR = 'main .cf-bar, main .cf-head, main .cf-hero-split, main .cf-cell, main .cf-marquee'
    const io = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement
          el.classList.add('in')
          io.unobserve(el)
          window.setTimeout(() => {
            el.classList.remove('cf-reveal', 'in')
            el.style.removeProperty('--i')
          }, 1500)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    const prep = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach(el => {
        if (el.classList.contains('cf-reveal') || el.closest('.cf-hero') || el.style.opacity !== '') return
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
        el.style.setProperty('--i', String(Math.min(siblings.indexOf(el), 6)))
        el.classList.add('cf-reveal')
        io.observe(el)
      })
    }

    prep(document)
    const mo = new MutationObserver(muts =>
      muts.forEach(m => m.addedNodes.forEach(n => n instanceof HTMLElement && prep(n)))
    )
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
      document.querySelectorAll<HTMLElement>('.cf-reveal').forEach(el => {
        el.classList.remove('cf-reveal', 'in')
        el.style.removeProperty('--i')
      })
    }
  }, [])

  return (
    <Router>
      <div style={{ background: '#111113', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/web-applications" element={<WebApplications />} />
            <Route path="/services/mobile-apps" element={<MobileApps />} />
            <Route path="/services/ai-automation" element={<AiAutomation />} />
            <Route path="/services/product-engineering" element={<ProductEngineering />} />
            <Route path="/services/saas-development" element={<SaasDevelopment />} />
            <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
