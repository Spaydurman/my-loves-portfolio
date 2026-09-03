import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import CampaignEventCard from './ui/CampaignEventCard'

const portfolioItems = [
  ...Array.from({ length: 14 }, (_, index) => ({
    id: `campaign-${index + 1}`,
    title: `Campaign ${String(index + 1).padStart(2, '0')}`,
  })),
  ...Array.from({ length: 13 }, (_, index) => ({
    id: `event-${index + 1}`,
    title: `Event ${String(index + 1).padStart(2, '0')}`,
  })),
]

export default function CampaignEvents() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const resumeAfter = useRef(0)
  const dragOrigin = useRef(0)
  const rawProgress = useMotionValue(0)
  const springProgress = useSpring(rawProgress, { stiffness: 170, damping: 26, mass: 0.75 })
  const prefersReducedMotion = useReducedMotion()
  const progress = prefersReducedMotion ? rawProgress : springProgress
  const isInView = useInView(sectionRef, { amount: 0.12 })
  const [viewportWidth, setViewportWidth] = useState(1200)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const measure = () => setViewportWidth(viewport.getBoundingClientRect().width)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)

    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    const shouldMove =
      isInView &&
      !prefersReducedMotion &&
      !isPaused &&
      !isHovered &&
      !isFocusWithin &&
      !isDragging &&
      Date.now() >= resumeAfter.current

    if (!shouldMove) return
    rawProgress.set(rawProgress.get() + delta * 0.000045)
  })

  const nudge = (direction: -1 | 1) => {
    resumeAfter.current = Date.now() + 1800
    rawProgress.set(rawProgress.get() + direction)
  }

  const cardWidth = Math.min(272, Math.max(176, viewportWidth * (viewportWidth < 640 ? 0.46 : 0.19)))
  const spacing = cardWidth + Math.min(42, Math.max(20, viewportWidth * 0.022))
  const visibleSlots = viewportWidth / spacing / 2 + 0.5

  return (
    <section
      ref={sectionRef}
      id="campaigns-events"
      className="campaign-events"
      aria-labelledby="campaign-events-title"
    >
      <div className="campaign-events__header">
        <p className="campaign-events__eyebrow">Campaign &amp; event marketing</p>
        <h2 id="campaign-events-title" className="campaign-events__title about-title">
          <span>14</span> Campaigns <i>&amp;</i> <span>13</span> Events
        </h2>
        <div className="campaign-events__meta">
          <p>Drag to explore the work</p>
          <div className="campaign-events__controls" aria-label="Carousel controls">
            <button type="button" onClick={() => nudge(1)} aria-label="View previous projects">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m14.5 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="campaign-events__pause"
              onClick={() => setIsPaused((current) => !current)}
              aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 7 8 5-8 5V7Z" /></svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 7v10M15 7v10" /></svg>
              )}
            </button>
            <button type="button" onClick={() => nudge(-1)} aria-label="View next projects">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="m9.5 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="campaign-events__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Campaign and event portfolio placeholders"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocusWithin(false)
        }}
      >
        <div className="campaign-events__arc" aria-live="off">
          {portfolioItems.map((item, index) => (
            <CampaignEventCard
              key={item.id}
              cardWidth={cardWidth}
              index={index}
              progress={progress}
              spacing={spacing}
              title={item.title}
              total={portfolioItems.length}
              visibleSlots={visibleSlots}
            />
          ))}
        </div>
        <motion.div
          className="campaign-events__drag-layer"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            dragOrigin.current = rawProgress.get()
            setIsDragging(true)
          }}
          onDrag={(_, info) => {
            rawProgress.set(dragOrigin.current - info.offset.x / spacing)
          }}
          onDragEnd={() => {
            resumeAfter.current = Date.now() + 1800
            setIsDragging(false)
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
