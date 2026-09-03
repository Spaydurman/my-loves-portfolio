import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import GetToKnowMe from './components/GetToKnowMe'
import Hero from './components/Hero'
import CampaignEvents from './components/CampaignEvents'
import CampaignResults from './components/CampaignResults'
import SocialMediaManager from './components/SocialMediaManager'

function SocialMediaReveal() {
  const revealArea = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  const { scrollYProgress } = useScroll({
    target: revealArea,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const startingSquare = Math.min(128, Math.max(88, Math.min(viewport.width, viewport.height) * 0.12))
  const verticalInset = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [Math.max(0, (viewport.height - startingSquare) / 2), 0, 0],
  )
  const horizontalInset = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [Math.max(0, (viewport.width - startingSquare) / 2), 0, 0],
  )
  const cornerRadius = useTransform(scrollYProgress, [0, 0.7, 0.82], [16, 10, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.82], [1.035, 1])
  const clipPath = useMotionTemplate`inset(${verticalInset}px ${horizontalInset}px round ${cornerRadius}px)`

  if (prefersReducedMotion) {
    return <SocialMediaManager />
  }

  return (
    <div ref={revealArea} className="relative h-[200svh] bg-[#f1f0ed]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="h-full origin-center will-change-transform"
          style={{ clipPath, scale: contentScale }}
        >
          <SocialMediaManager />
        </motion.div>
      </div>
    </div>
  )
}

function App() {
  const heroScrollArea = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroScrollArea,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.965])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0.72])

  return (
    <main className="bg-[#f1f0ed]">
      <div ref={heroScrollArea} className="relative h-[124svh] bg-[#1e321f]">
        <motion.div
          className="sticky top-0 h-svh origin-center overflow-hidden"
          style={prefersReducedMotion ? undefined : { scale: heroScale, opacity: heroOpacity }}
        >
          <Hero />
        </motion.div>
      </div>

      <div className="relative z-10 mt-[-24svh] bg-[#f1f0ed] lg:h-[190svh]">
        <div className="lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden">
          <GetToKnowMe />
        </div>
      </div>

      <SocialMediaReveal />
      <CampaignEvents />
      <CampaignResults />
    </main>
  )
}

export default App
