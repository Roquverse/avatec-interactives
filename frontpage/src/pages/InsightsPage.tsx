import PageHero from '../components/PageHero'
import Insights from '../components/Insights'
import FinalCTA from '../components/FinalCTA'

export default function InsightsPage() {
  return (
    <div>
      <PageHero
        label="Insights — Journal"
        meta="Notes from the studio"
        title="From the studio."
        lede="Practical thinking on building software, shipping products and scaling businesses."
      />
      <Insights hideHeader />
      <FinalCTA />
    </div>
  )
}
