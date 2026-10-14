import PageHero from '../components/PageHero'
import FeaturedWork from '../components/FeaturedWork'
import FinalCTA from '../components/FinalCTA'

export default function Work() {
  return (
    <div>
      <PageHero
        label="Work — Case Studies"
        meta="Selected projects"
        title="Products we've shipped."
        lede="A selection of web apps, mobile apps and SaaS platforms we've designed and engineered for clients around the world."
      />
      <FeaturedWork hideHeader />
      <FinalCTA />
    </div>
  )
}
