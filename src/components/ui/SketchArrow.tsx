export type SketchArrowProps = {
  className?: string
  variant?: 'down' | 'right' | 'up'
}

const arrowPaths = {
  right: {
    line: 'M8 105C23 57 58 60 73 82c12 18-3 37-22 27-24-12-26-50 0-74C73 14 108 12 137 21c28 9 50 6 77-1',
    head: 'M196 8L214 20l-19 8',
  },
  down: {
    line: 'M12 14C57 6 88 18 113 40c27 24 58 27 69 53 8 18 0 31-15 31-18 0-22-20-9-29 16-11 38 1 37 16-1 10-25 13-85 15',
    head: 'M97 111l13 15 11-16',
  },
  up: {
    line: 'M208 118c-42 9-62-18-80-37-17-18-42-18-49-2-7 17 13 30 28 20 17-11 5-35-18-43C69 49 78 18 110 4',
    head: 'M98 19l12-15 12 15',
  },
} as const

export default function SketchArrow({ className = '', variant = 'right' }: SketchArrowProps) {
  const paths = arrowPaths[variant]

  return (
    <svg
      viewBox="0 0 220 130"
      className={`overflow-visible ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path d={paths.line} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={paths.head} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
