import { MotionConfig } from 'framer-motion'
import Intro from './components/Intro'
import Hero from './components/Hero'
import { MissionVision, WhoWeAre } from './components/About'
import Journey from './components/Journey'
import Services from './components/Services'
import Work from './components/Work'
import Reels from './components/Reels'
import Testimonials from './components/Testimonials'
import { ReviewCTA, ThanksNote } from './components/ThankYou'
import { CursorGlow, ScrollProgress } from './components/Extras'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <ScrollProgress />
      <CursorGlow />
      <main>
        <Hero />
        <WhoWeAre />
        <MissionVision />
        <Journey />
        <Services />
        <Work />
        <Reels />
        <Testimonials />
        <ThanksNote />
        <ReviewCTA />
      </main>
    </MotionConfig>
  )
}
