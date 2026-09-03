import { motion, useTransform, type MotionStyle, type MotionValue } from 'motion/react'

type CampaignEventCardProps = {
  cardWidth: number
  index: number
  progress: MotionValue<number>
  spacing: number
  title: string
  total: number
  visibleSlots: number
}

const placeholderColors = [
  ['#f6d966', '#fff3bd'],
  ['#b6ced0', '#e8f0ea'],
  ['#d8c2dc', '#f5eaf2'],
  ['#b7cda9', '#e4efda'],
  ['#d9b2a0', '#f4dfd3'],
]

function getRelativePosition(index: number, progress: number, total: number) {
  let position = index - progress
  while (position > total / 2) position -= total
  while (position < -total / 2) position += total
  return position
}

export default function CampaignEventCard({
  cardWidth,
  index,
  progress,
  spacing,
  title,
  total,
  visibleSlots,
}: CampaignEventCardProps) {
  const [accent, surface] = placeholderColors[index % placeholderColors.length]
  const position = useTransform(progress, (current) => getRelativePosition(index, current, total))
  const x = useTransform(position, (slot) => slot * spacing - cardWidth / 2)
  const y = useTransform(position, (slot) => Math.min(112, slot * slot * 17))
  const rotate = useTransform(position, (slot) => Math.max(-18, Math.min(18, slot * 7.5)))
  const scale = useTransform(position, (slot) => Math.max(0.86, 1 - Math.abs(slot) * 0.035))
  const opacity = useTransform(position, (slot) => {
    const distance = Math.abs(slot)
    if (distance <= visibleSlots) return 1
    return Math.max(0, 1 - (distance - visibleSlots) * 1.75)
  })
  const zIndex = useTransform(position, (slot) => Math.max(1, 50 - Math.round(Math.abs(slot) * 5)))
  const cardStyle: MotionStyle & {
    '--campaign-card-accent': string
    '--campaign-card-surface': string
  } = {
    '--campaign-card-accent': accent,
    '--campaign-card-surface': surface,
    width: cardWidth,
    x,
    y,
    rotate,
    scale,
    opacity,
    zIndex,
  }

  return (
    <motion.figure className="campaign-event-card" style={cardStyle}>
      <div className="campaign-event-card__image" role="img" aria-label={`Placeholder image for ${title}`}>
        <svg aria-hidden="true" viewBox="0 0 48 48" className="campaign-event-card__icon">
          <path d="M8 36 18.5 24l7 7L31 25l9 11H8Z" fill="currentColor" opacity=".22" />
          <circle cx="17" cy="16" r="4" fill="currentColor" opacity=".28" />
          <rect x="5" y="7" width="38" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Image placeholder</span>
        <strong>{String(index + 1).padStart(2, '0')}</strong>
      </div>
      <figcaption>{title}</figcaption>
    </motion.figure>
  )
}
