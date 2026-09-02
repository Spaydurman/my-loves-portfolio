import { motion, useReducedMotion } from 'motion/react'

import arrowImage from '../assets/social-media-manager/arrow.png'
import IPhoneDevice from './ui/IPhoneDevice'
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
          <img src={arrowImage} alt="" aria-hidden="true" className="social-arrow social-arrow--engagement" />
          <p>
            Increased Facebook engagement by <strong>154.4%</strong> in one year, generating{' '}
            <strong>459,158</strong> total engagements.
          </p>
        </div>

        <div className="social-stat social-stat--visits">
          <img src={arrowImage} alt="" aria-hidden="true" className="social-arrow social-arrow--visits" />
          <p>
            Drove <strong>972,585</strong> Facebook page visits, representing a <strong>74.04%</strong>{' '}
            increase from the previous year.
          </p>
        </div>

        <div
          className="social-phone-stage"
          role="region"
          aria-label="Swipe horizontally to view five social media project placeholders"
          tabIndex={0}
        >
          <div className="social-phone-track">
            {phones.map((phone, index) => (
              <div key={phone.label} className={phone.className}>
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.75, delay: 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <IPhoneDevice label={phone.label} className="h-full max-w-none">
                    <SocialSkeletonScreen variant={index} />
                  </IPhoneDevice>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="social-stat social-stat--followers">
          <p>
            Gained <strong>2,118</strong> new followers
            <br />
            within one year.
          </p>
          <img src={arrowImage} alt="" aria-hidden="true" className="social-arrow social-arrow--followers" />
        </div>

        <h2 id="social-media-title" className="social-manager-title about-title">
          Social Media Manager
        </h2>
      </motion.div>
    </section>
  )
}
