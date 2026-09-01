import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

import IPhoneDevice from './ui/IPhoneDevice'

export type SocialMediaManagerProps = {
  videoSrc?: string
  videoPoster?: string
  postImageSrc?: string
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ml-1 size-8 fill-current" aria-hidden="true">
      <path d="M8 5.1v13.8a1 1 0 0 0 1.53.85l10.35-6.9a1 1 0 0 0 0-1.7L9.53 4.25A1 1 0 0 0 8 5.1Z" />
    </svg>
  )
}

function VideoScreen({ src, poster }: { src?: string; poster?: string }) {
  return (
    <div className="relative h-full bg-[#d9d1e4]">
      {src ? (
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label="Social media video project"
        />
      ) : (
        <div className="video-placeholder relative flex h-full items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#e9dff6_0%,#fff6f8_47%,#bad9c3_100%)]">
          <div className="absolute top-[19%] -right-[22%] size-[70%] rounded-full bg-[#a9d7b7]/70 blur-2xl" />
          <div className="absolute bottom-[18%] -left-[26%] size-[74%] rotate-12 rounded-[3rem] bg-[#f7afbe]/45 blur-xl" />
          <div className="relative z-10 max-w-[78%] text-center text-[#17331d]">
            <p className="about-title text-[clamp(2.8rem,5vw,4rem)] leading-[0.84]">Your video</p>
            <p className="mt-4 text-[0.68rem] font-bold tracking-[0.25em] uppercase opacity-70">
              Social campaign
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-[9%] flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full border border-white/55 bg-[#17331d]/80 text-white shadow-xl backdrop-blur-md">
              <PlayIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <span className={`social-shimmer block rounded-full bg-[#d7d9d5] ${className}`} />
}

function PostScreen({ imageSrc }: { imageSrc?: string }) {
  const [loadedImageSrc, setLoadedImageSrc] = useState<string>()
  const imageLoaded = Boolean(imageSrc && loadedImageSrc === imageSrc)

  return (
    <div className="flex h-full flex-col bg-[#f8f8f6] pt-[12%] text-[#26312a]">
      <div className="flex h-[9%] shrink-0 items-center gap-2.5 border-b border-[#dfe1dd] px-[6%]">
        <span className="size-7 shrink-0 rounded-full bg-[#58b8f1]" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <SkeletonBlock className="h-1.5 w-[52%]" />
          <SkeletonBlock className="h-1 w-[28%] opacity-70" />
        </div>
        <span className="text-sm tracking-[0.08em] text-[#727872]">•••</span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#e7e9e5]">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Social media post preview"
            className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoadedImageSrc(imageSrc)}
          />
        )}

        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col justify-between p-[8%]" role="status" aria-label="Loading social media post">
            <div className="space-y-3">
              <SkeletonBlock className="h-3 w-[78%] rounded-md" />
              <SkeletonBlock className="h-3 w-[58%] rounded-md" />
            </div>
            <div className="social-shimmer mx-auto aspect-[4/5] w-[82%] rounded-xl bg-[#d4d7d2]" />
            <div className="space-y-2">
              <SkeletonBlock className="h-2 w-full rounded-md" />
              <SkeletonBlock className="h-2 w-[84%] rounded-md" />
              <SkeletonBlock className="h-2 w-[62%] rounded-md" />
            </div>
          </div>
        )}
      </div>

      <div className="flex h-[10%] shrink-0 items-center justify-around border-t border-[#dfe1dd] px-[5%] text-[#6f756f]">
        <span aria-hidden="true">♥</span>
        <span aria-hidden="true">●</span>
        <span aria-hidden="true">◆</span>
        <span aria-hidden="true">↗</span>
      </div>
    </div>
  )
}

export default function SocialMediaManager({
  videoSrc,
  videoPoster,
  postImageSrc,
}: SocialMediaManagerProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="social-media"
      className="relative isolate min-h-svh overflow-hidden bg-[#17321d] px-6 py-24 text-[#f3f1e9] sm:px-10 lg:px-16"
      aria-labelledby="social-media-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_18%_18%,rgba(183,220,174,0.24),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(231,208,163,0.18),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-12rem)] max-w-[92rem] items-center gap-16 lg:grid-cols-[0.72fr_1.28fr]">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-5 text-xs font-bold tracking-[0.32em] text-[#b8d0b9] uppercase">
            Selected work
          </p>
          <h2
            id="social-media-title"
            className="about-title text-[clamp(4.6rem,8.5vw,8.8rem)] leading-[0.78] tracking-[-0.035em]"
          >
            Social Media Manager
          </h2>
          <p className="mt-8 max-w-md text-base leading-7 text-[#d6ddd3] sm:text-lg">
            Campaign videos and social posts shaped for clear storytelling, strong visual identity,
            and meaningful audience connection.
          </p>
        </motion.div>

        <div className="grid items-end gap-10 sm:grid-cols-2 lg:gap-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 80, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <IPhoneDevice label="Video content preview">
              <VideoScreen src={videoSrc} poster={videoPoster} />
            </IPhoneDevice>
            <p className="mt-6 text-center text-xs font-bold tracking-[0.24em] text-[#b8d0b9] uppercase">
              Video campaign
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 80, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <IPhoneDevice label="Social media image post preview">
              <PostScreen imageSrc={postImageSrc} />
            </IPhoneDevice>
            <p className="mt-6 text-center text-xs font-bold tracking-[0.24em] text-[#b8d0b9] uppercase">
              Social post
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
