import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
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
  return (
    <Router>
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
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
