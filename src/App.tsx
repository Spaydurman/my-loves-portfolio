import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import type { PointerEvent as ReactPointerEvent } from 'react'

const galleryImages = [
  {
    src: '/hero-images/image (1).png',
    className: 'object-[50%_59%]',
  },
  {
    src: '/hero-images/image (2).png',
    className: 'col-start-2 object-[50%_57%]',
  },
  {
    src: '/hero-images/image (4).png',
    className: 'col-start-4 object-[50%_50%]',
  },
  {
    src: '/hero-images/image (3).png',
    className: 'col-start-5 object-[50%_61%]',
  },
]

const spring = { stiffness: 150, damping: 20, mass: 0.55 }

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, spring)
  const smoothY = useSpring(pointerY, spring)

  const rotateX = useTransform(smoothY, [-1, 1], [6, -6])
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8])
  const titleX = useTransform(smoothX, [-1, 1], [-12, 12])
  const titleY = useTransform(smoothY, [-1, 1], [-7, 7])
  const galleryX = useTransform(smoothX, [-1, 1], [-6, 6])
  const galleryY = useTransform(smoothY, [-1, 1], [-4, 4])
  const portraitX = useTransform(smoothX, [-1, 1], [-24, 24])
  const portraitY = useTransform(smoothY, [-1, 1], [-14, 14])
  const shineX = useTransform(smoothX, [-1, 1], [20, 80])
  const shineY = useTransform(smoothY, [-1, 1], [20, 80])
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgb(255 255 255 / 0.3), transparent 32%)`

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2)
  }

  function resetTilt() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <main
      className="group relative isolate min-h-svh w-full overflow-hidden bg-[#1e321f] [perspective:1200px]"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
      >
        {/* Foreground: hero picture */}
        <div className="absolute bottom-[-0.2%] left-1/2 z-[3] h-[74.8%] w-fit -translate-x-1/2 max-sm:h-[63%] max-sm:max-w-[92vw]">
          <motion.div
            className="relative h-full [transform-style:preserve-3d]"
            style={prefersReducedMotion ? undefined : { x: portraitX, y: portraitY, z: 85 }}
          >
            <img
              className="relative z-[2] block h-full w-auto max-w-[92vw] object-contain object-bottom drop-shadow-[0_1.2rem_1.5rem_rgba(4,17,7,0.28)] select-none"
              src="/hero-images/Hero Picture.png"
              alt="Nikka Ella wearing black sunglasses and a white top"
              draggable="false"
            />
            <motion.span
              className="hero-shine pointer-events-none absolute inset-0 z-[3] opacity-0 mix-blend-soft-light transition-opacity duration-200 group-hover:opacity-100 motion-reduce:hidden"
              style={{ background: shine }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Middle layer: text */}
        <div className="absolute top-[13.8%] left-1/2 z-[2] w-max -translate-x-1/2 max-sm:top-[12%]">
          <motion.h1
            id="hero-title"
            className="m-0 whitespace-nowrap text-[clamp(7rem,21.1vw,22rem)] leading-[0.78] font-normal tracking-[0] text-[#f4f4f4] [font-family:Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] max-sm:text-[22vw] max-sm:leading-[0.84]"
            style={prefersReducedMotion ? undefined : { x: titleX, y: titleY, z: 25 }}
          >
            NIKKA ELLA
          </motion.h1>
        </div>

        {/* Background: four pictures */}
        <motion.div
          className="absolute top-[40.7%] left-0 z-[1] grid h-[54%] w-full grid-cols-5 gap-[clamp(0.5rem,1.1vw,0.85rem)] p-2 max-sm:top-[31%] max-sm:h-[34%] max-sm:gap-[0.35rem]"
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { x: galleryX, y: galleryY, z: -35 }}
        >
          {galleryImages.map(({ src, className }) => (
            <img
              className={`h-full min-h-0 w-full min-w-0 rounded-[0.9rem] object-cover max-sm:rounded-[0.55rem] ${className}`}
              src={src}
              alt=""
              key={src}
            />
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}

function App() {
  return <Hero />
}

export default App
