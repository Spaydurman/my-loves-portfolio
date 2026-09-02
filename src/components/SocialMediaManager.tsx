import { motion, useReducedMotion } from 'motion/react'

import IPhoneDevice from './ui/IPhoneDevice'
import SketchArrow from './ui/SketchArrow'
import SocialSkeletonScreen from './ui/SocialSkeletonScreen'

const phones = [
  { className: 'social-phone social-phone--far-left', label: 'Social media project placeholder one' },
  { className: 'social-phone social-phone--left', label: 'Social media project placeholder two' },
  { className: 'social-phone social-phone--center', label: 'Social media project placeholder three' },
  { className: 'social-phone social-phone--right', label: 'Social media project placeholder four' },
  { className: 'social-phone social-phone--far-right', label: 'Social media project placeholder five' },
]

export default function SocialMediaManager() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="social-media"
      className="social-manager relative isolate min-h-svh overflow-hidden bg-[#19351f] px-5 py-10 text-[#f8d643] sm:px-8 lg:px-12"
      aria-labelledby="social-media-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(63,102,65,0.2),transparent_45%)]" />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="social-manager-canvas relative mx-auto max-w-[88rem]"
      >
        <div className="social-stat social-stat--engagement">
          <SketchArrow className="social-arrow social-arrow--engagement text-white/90" />
          <p>
            Increased Facebook engagement by <strong>154.4%</strong> in one year, generating{' '}
            <strong>459,158</strong> total engagements.
          </p>
        </div>

        <div className="social-stat social-stat--visits">
          <SketchArrow variant="down" className="social-arrow social-arrow--visits text-white/90" />
          <p>
            Drove <strong>972,585</strong> Facebook page visits, representing a <strong>74.04%</strong>{' '}
            increase from the previous year.
          </p>
        </div>

        <div className="social-phone-stage" aria-label="Five social media project placeholders">
          {phones.map((phone, index) => (
            <div key={phone.label} className={phone.className}>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <IPhoneDevice label={phone.label} className="max-w-none">
                  <SocialSkeletonScreen variant={index} />
                </IPhoneDevice>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="social-stat social-stat--followers">
          <p>
            Gained <strong>2,118</strong> new followers
            <br />
            within one year.
          </p>
          <SketchArrow variant="up" className="social-arrow social-arrow--followers text-white/90" />
        </div>

        <h2 id="social-media-title" className="social-manager-title about-title">
          Social Media Manager
        </h2>
      </motion.div>
    </section>
  )
}
