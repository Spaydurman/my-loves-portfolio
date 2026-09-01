import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import GetToKnowMe from './components/GetToKnowMe'
import Hero from './components/Hero'

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

      <div className="relative z-10 mt-[-24svh]">
        <GetToKnowMe />
      </div>
    </main>
  )
}

export default App
