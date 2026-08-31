import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

const galleryImages = [
  {
    src: '/hero-images/image (1).png',
    className: 'object-[50%_59%]',
  },
  {
    src: '/hero-images/image (2).png',
    className: 'col-start-2 object-[50%_57%] max-sm:col-start-auto',
  },
  {
    src: '/hero-images/image (4).png',
    className: 'col-start-4 object-[50%_50%] max-sm:col-start-auto',
  },
  {
    src: '/hero-images/image (3).png',
    className: 'col-start-5 object-[50%_61%] max-sm:col-start-auto',
  },
]

const spring = { stiffness: 150, damping: 20, mass: 0.55 }

type OrientationEventConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

function clamp(value: number, min = -1, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function shortestAngle(from: number, to: number) {
  return ((to - from + 540) % 360) - 180
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const usesDeviceTilt = useRef(false)
  const orientationPermissionRequested = useRef(false)
  const smoothX = useSpring(pointerX, spring)
  const smoothY = useSpring(pointerY, spring)

  const rotateX = useTransform(smoothY, [-1, 1], [4.5, -4.5])
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6])
  const titleX = useTransform(smoothX, [-1, 1], [-12, 12])
  const titleY = useTransform(smoothY, [-1, 1], [-10, 10])
  const titleRotateX = useTransform(smoothY, [-1, 1], [5, -5])
  const titleRotateY = useTransform(smoothX, [-1, 1], [-5, 5])
  const galleryX = useTransform(smoothX, [-1, 1], [-14, 14])
  const galleryY = useTransform(smoothY, [-1, 1], [-18, 18])
  const galleryRotateX = useTransform(smoothY, [-1, 1], [8, -8])
  const galleryRotateY = useTransform(smoothX, [-1, 1], [-8, 8])
  const portraitX = useTransform(smoothX, [-1, 1], [-24, 24])
  const portraitY = useTransform(smoothY, [-1, 1], [-22, 22])
  const portraitRotateX = useTransform(smoothY, [-1, 1], [7, -7])
  const portraitRotateY = useTransform(smoothX, [-1, 1], [-7, 7])
  const shineX = useTransform(smoothX, [-1, 1], [20, 80])
  const shineY = useTransform(smoothY, [-1, 1], [20, 80])
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgb(255 255 255 / 0.3), transparent 32%)`

  useEffect(() => {
    if (prefersReducedMotion) return

    const mobileQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    usesDeviceTilt.current = mobileQuery.matches
    if (!mobileQuery.matches) return

    let initialBeta: number | null = null
    let initialGamma: number | null = null

    function resetOrigin() {
      initialBeta = null
      initialGamma = null
      pointerX.set(0)
      pointerY.set(0)
    }

    function handleOrientation(event: DeviceOrientationEvent) {
      if (event.beta === null || event.gamma === null) return

      initialBeta ??= event.beta
      initialGamma ??= event.gamma

      const beta = shortestAngle(initialBeta, event.beta)
      const gamma = shortestAngle(initialGamma, event.gamma)
      const screenAngle = ((window.screen.orientation?.angle ?? 0) + 360) % 360

      if (screenAngle === 90) {
        pointerX.set(clamp(beta / 18))
        pointerY.set(clamp(-gamma / 18))
      } else if (screenAngle === 270) {
        pointerX.set(clamp(-beta / 18))
        pointerY.set(clamp(gamma / 18))
      } else if (screenAngle === 180) {
        pointerX.set(clamp(-gamma / 18))
        pointerY.set(clamp(-beta / 18))
      } else {
        pointerX.set(clamp(gamma / 18))
        pointerY.set(clamp(beta / 18))
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('orientationchange', resetOrigin)

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('orientationchange', resetOrigin)
      usesDeviceTilt.current = false
    }
  }, [pointerX, pointerY, prefersReducedMotion])

  async function enableDeviceOrientation(event: ReactPointerEvent<HTMLElement>) {
    if (
      event.pointerType !== 'touch' ||
      !usesDeviceTilt.current ||
      orientationPermissionRequested.current ||
      !('DeviceOrientationEvent' in window)
    ) {
      return
    }

    const OrientationEvent = DeviceOrientationEvent as OrientationEventConstructor
    if (!OrientationEvent.requestPermission) return

    orientationPermissionRequested.current = true
    try {
      const permission = await OrientationEvent.requestPermission()
      if (permission !== 'granted') orientationPermissionRequested.current = false
    } catch {
      orientationPermissionRequested.current = false
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (prefersReducedMotion || usesDeviceTilt.current || event.pointerType === 'touch') return

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
      className="group relative isolate min-h-svh w-full overflow-hidden bg-[#1e321f] [perspective:1400px]"
      aria-labelledby="hero-title"
      onPointerDown={enableDeviceOrientation}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
      >
        {/* Foreground: hero picture */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] [transform-style:preserve-3d]"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: portraitX,
                  y: portraitY,
                  z: 75,
                  rotateX: portraitRotateX,
                  rotateY: portraitRotateY,
                }
          }
        >
          <div className="absolute bottom-[-0.2%] left-1/2 h-[74.8%] w-fit -translate-x-1/2 max-sm:h-[63%] max-sm:max-w-[92vw]">
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
          </div>
        </motion.div>

        {/* Middle layer: text */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] [transform-style:preserve-3d]"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: titleX,
                  y: titleY,
                  z: 15,
                  rotateX: titleRotateX,
                  rotateY: titleRotateY,
                }
          }
        >
          <div className="absolute top-[13.8%] left-1/2 w-max -translate-x-1/2 max-sm:top-[12%]">
            <h1
              id="hero-title"
              className="hero-title m-0 whitespace-nowrap text-[clamp(7rem,21.1vw,22rem)] leading-[0.78] font-normal tracking-[0] text-[#f4f4f4] max-sm:text-center max-sm:text-[28vw] max-sm:leading-[0.78]"
            >
              <span>NIKKA</span>{' '}
              <span className="max-sm:block">ELLA</span>
            </h1>
          </div>
        </motion.div>

        {/* Background: four pictures */}
        <motion.div
          className="absolute top-[40.7%] left-0 z-[1] grid h-[54%] w-full grid-cols-5 gap-[clamp(0.5rem,1.1vw,0.85rem)] p-2 max-sm:top-[36%] max-sm:h-[34%] max-sm:grid-cols-4 max-sm:gap-[0.35rem]"
          aria-hidden="true"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: galleryX,
                  y: galleryY,
                  z: -30,
                  rotateX: galleryRotateX,
                  rotateY: galleryRotateY,
                }
          }
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
