import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  start: boolean
  target: number
}

function CountUp({ start, target }: CountUpProps) {
  const prefersReducedMotion = useReducedMotion()
  const value = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!start || prefersReducedMotion) return

    const unsubscribe = value.on('change', (latest) => setDisplayValue(Math.round(latest)))
    const controls = animate(value, target, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [prefersReducedMotion, start, target, value])

  return (
    <span>
      <span className="sr-only">{target}</span>
      <span aria-hidden="true">{prefersReducedMotion ? target : displayValue}</span>
    </span>
  )
}

export default function CampaignResults() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25, once: true })

  return (
    <section ref={sectionRef} className="campaign-results" aria-labelledby="campaign-results-title">
      <p id="campaign-results-title" className="campaign-results__eyebrow">
        Campaign &amp; event marketing
      </p>

      <div className="campaign-results__grid">
        <article className="campaign-results__stat">
          <p className="campaign-results__number">
            <CountUp start={isInView} target={496} />
          </p>
          <h3>Actual Attendees</h3>
          <p>
            Reached <strong>496</strong> actual attendees
            <br /> across <strong>13 Open House Events</strong>
          </p>
        </article>

        <article className="campaign-results__stat">
          <p className="campaign-results__number">
            <CountUp start={isInView} target={388} />
          </p>
          <h3>New Students</h3>
          <p>
            Gained <strong>388</strong> New Students for
            <br /> S.Y. 2026-2027.
          </p>
        </article>
      </div>

      <p className="campaign-results__services">
        Campaign Planning&nbsp; · &nbsp;Social Media Promotion&nbsp; · &nbsp;Creative Content&nbsp; ·
        &nbsp;Audience Communication&nbsp; · &nbsp;Event Coordination&nbsp; · &nbsp;Performance Tracking
      </p>
    </section>
  )
}
