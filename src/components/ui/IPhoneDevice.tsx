import type { ReactNode } from 'react'

export type IPhoneDeviceProps = {
  children: ReactNode
  className?: string
  label: string
}

export default function IPhoneDevice({
  children,
  className = '',
  label,
}: IPhoneDeviceProps) {
  return (
    <div
      className={`iphone-device relative mx-auto aspect-[9/19.25] w-full max-w-[18rem] ${className}`}
      role="group"
      aria-label={label}
    >
      <span className="absolute top-[18%] -left-[0.2rem] h-[8%] w-[0.22rem] rounded-l-full bg-[#9b9d98]" />
      <span className="absolute top-[29%] -left-[0.2rem] h-[13%] w-[0.22rem] rounded-l-full bg-[#9b9d98]" />
      <span className="absolute top-[25%] -right-[0.2rem] h-[16%] w-[0.22rem] rounded-r-full bg-[#9b9d98]" />

      <div className="absolute inset-0 rounded-[clamp(2.5rem,4vw,3.4rem)] border-[0.22rem] border-[#c8cbc6] bg-[#080a09] p-[0.48rem] shadow-[0_2.5rem_5rem_rgba(0,0,0,0.42),inset_0_0_0_1px_rgba(255,255,255,0.25)]">
        <div className="relative h-full overflow-hidden rounded-[clamp(2.05rem,3.5vw,2.9rem)] bg-[#f6f5f1] ring-1 ring-white/10">
          <div className="absolute top-0 left-1/2 z-30 h-[4.8%] w-[50%] -translate-x-1/2 rounded-b-[1.35rem] bg-[#080a09]">
            <span className="absolute top-[34%] left-[31%] h-[0.2rem] w-[38%] rounded-full bg-[#4a4d4a]" />
            <span className="absolute top-[31%] right-[14%] size-[0.32rem] rounded-full bg-[#252b2a] ring-1 ring-[#555]" />
          </div>
          {children}
          <span className="absolute bottom-[1.05%] left-1/2 z-30 h-[0.22rem] w-[36%] -translate-x-1/2 rounded-full bg-black/75" />
        </div>
      </div>
    </div>
  )
}
