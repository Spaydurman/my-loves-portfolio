export type SocialSkeletonScreenProps = {
  variant?: number
}

export default function SocialSkeletonScreen({ variant = 0 }: SocialSkeletonScreenProps) {
  const imageHeights = ['46%', '54%', '50%']

  return (
    <div
      className="social-skeleton flex h-full flex-col bg-black px-[7%] pb-[8%] pt-[13%]"
      role="status"
      aria-label="Social media content loading"
    >
      <div className="flex h-[11%] shrink-0 items-center gap-[5%] border-b border-white/10">
        <span className="social-skeleton-block aspect-square h-[48%] rounded-full" />
        <span className="flex-1 space-y-[5%]">
          <span className="social-skeleton-block block h-[0.38rem] w-[58%] rounded-full" />
          <span className="social-skeleton-block block h-[0.3rem] w-[34%] rounded-full opacity-70" />
        </span>
        <span className="flex gap-1 opacity-60" aria-hidden="true">
          <i className="size-1 rounded-full bg-[#59605c]" />
          <i className="size-1 rounded-full bg-[#59605c]" />
          <i className="size-1 rounded-full bg-[#59605c]" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col py-[8%]">
        <div className="space-y-[3%]">
          <span className="social-skeleton-block block h-[0.42rem] w-[82%] rounded-full" />
          <span className="social-skeleton-block block h-[0.42rem] w-[61%] rounded-full opacity-80" />
        </div>
        <span
          className="social-skeleton-block my-auto block w-full rounded-[8%]"
          style={{ height: imageHeights[variant % imageHeights.length] }}
        />
        <div className="space-y-[3%]">
          <span className="social-skeleton-block block h-[0.4rem] w-full rounded-full" />
          <span className="social-skeleton-block block h-[0.4rem] w-[74%] rounded-full opacity-80" />
          <span className="social-skeleton-block block h-[0.4rem] w-[48%] rounded-full opacity-60" />
        </div>
      </div>

      <div className="flex h-[6%] shrink-0 items-end justify-between px-[4%]">
        {[0, 1, 2, 3].map((item) => (
          <span key={item} className="social-skeleton-block size-[0.55rem] rounded-full opacity-75" />
        ))}
      </div>
    </div>
  )
}
