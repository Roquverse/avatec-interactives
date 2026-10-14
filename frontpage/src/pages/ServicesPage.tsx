import PageHero from '../components/PageHero'
import Services from '../components/Services'
import Process from '../components/Process'
import FinalCTA from '../components/FinalCTA'

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        label="Services — What we do"
        meta="Six disciplines"
        title="What we build."
        lede="From early-stage startups to scaling enterprises — we cover the full product stack."
      />
      <Services hideHeader />
      <Process />
      <FinalCTA />
    </div>
  )
}
