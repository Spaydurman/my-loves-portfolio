import { motion, useReducedMotion } from 'motion/react'

import aboutPortrait from '../assets/get-to-know-about-me/Portfolio.png'

const intro =
  "I'm Nikka Ella Nicolas, you can call me Nikka. A Marketing Associate and Content Creative who thrives at the intersection of storytelling, strategy, and human connection."

const biography =
  'From creating compelling social media content and managing end-to-end events to executing newsletters and SMS campaigns, I bring creativity, organization, and strategic thinking to every project. I believe great marketing begins with understanding people, their needs, emotions, and what inspires them to act. By analyzing campaign performance, audience behavior, and engagement data, I turn insights into purposeful strategies that strengthen audience relationships, improve results, and grow brand presence.'

type TypedTextProps = {
  text: string
  id?: string
  className?: string
  delay?: number
  cursor?: boolean
  as?: 'h2' | 'p'
}

function TypedText({
  text,
  id,
  className = '',
  delay = 0,
  cursor = false,
  as = 'p',
}: TypedTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[as]
  const words = text.split(' ')

  return (
    <Component
      id={id}
      className={className}
      aria-label={text}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: as === 'h2' ? 0.047 : 0.008,
          },
        },
      }}
    >
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            {[...word].map((character, characterIndex) => (
              <motion.span
                className="inline-block"
                key={`${character}-${characterIndex}`}
                variants={{
                  hidden: { opacity: 0, y: as === 'h2' ? 10 : 4 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: as === 'h2' ? 0.18 : 0.1 },
                  },
                }}
              >
                {character}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
        {cursor && !prefersReducedMotion && (
          <motion.span
            className="about-cursor ml-[0.06em] inline-block h-[0.72em] w-[0.035em] bg-current align-[-0.02em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ delay: delay + text.length * 0.047, duration: 1, repeat: 2 }}
          />
        )}
      </span>
    </Component>
  )
}

export default function GetToKnowMe() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      id="about"
      className="about-section relative z-10 min-h-svh overflow-hidden bg-[#f1f0ed] text-[#142f1a]"
      aria-labelledby="about-title"
      initial={prefersReducedMotion ? false : { y: 80, borderRadius: '2rem 2rem 0 0' }}
      whileInView={{ y: 0, borderRadius: '0rem 0rem 0 0' }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ type: 'spring', stiffness: 72, damping: 20, mass: 0.9 }}
    >
      <div className="relative mx-auto grid min-h-svh w-full max-w-[100rem] grid-cols-[minmax(0,0.96fr)_minmax(29rem,1.04fr)] max-lg:grid-cols-1 max-lg:grid-rows-[minmax(32rem,72svh)_auto]">
        <div className="relative z-10 flex items-center px-[clamp(1.5rem,5.7vw,5.7rem)] py-24 max-lg:order-2 max-lg:items-start max-lg:py-16">
          <div className="max-w-[45rem]">
            <TypedText
              as="h2"
              id="about-title"
              text="Get to know Me..."
              cursor
              className="about-title m-0 text-[clamp(4.25rem,6.67vw,6rem)] leading-[0.88] font-medium tracking-[-0.025em]"
            />
            <TypedText
              text={intro}
              delay={0.95}
              className="mt-10 max-w-[42rem] text-[clamp(1rem,1.18vw,1.125rem)] leading-[1.75] font-bold tracking-[0.012em] text-[#102916] max-sm:mt-8"
            />
            <TypedText
              text={biography}
              delay={2.25}
              className="mt-4 max-w-[44rem] text-[clamp(0.95rem,1.05vw,1.05rem)] leading-[1.75] font-normal tracking-[0.005em] text-[#1b2b1e]"
            />
          </div>
        </div>

        <motion.div
          className="relative min-h-[36rem] max-lg:order-1 max-lg:min-h-0 max-lg:overflow-hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 80, scale: 1.04 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(255,255,255,0.82),transparent_47%)]" />
          <img
            src={aboutPortrait}
            alt="Nikka Ella seated in a white blouse"
            className="absolute inset-y-0 right-0 h-full w-auto max-w-none object-contain object-bottom max-lg:left-1/2 max-lg:right-auto max-lg:-translate-x-1/2 max-lg:object-top"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
