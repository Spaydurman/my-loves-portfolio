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

function App() {
  return (
    <main
      className="relative isolate min-h-svh w-full overflow-hidden bg-[#1e321f]"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        className="absolute top-[13.8%] left-1/2 z-[2] m-0 w-max -translate-x-1/2 whitespace-nowrap text-[clamp(7rem,21.1vw,22rem)] leading-[0.78] font-normal tracking-[0] text-[#f4f4f4] [font-family:Impact,Haettenschweiler,'Arial_Narrow_Bold',sans-serif] max-sm:top-[12%] max-sm:text-[22vw] max-sm:leading-[0.84]"
      >
        NIKKA ELLA
      </h1>

      <div
        className="absolute top-[40.7%] left-0 z-[1] p-2 grid h-[54%] w-full grid-cols-4 gap-[clamp(0.5rem,1.1vw,0.85rem)] max-sm:top-[31%] max-sm:h-[34%] max-sm:gap-[0.35rem]"
        aria-hidden="true"
      >
        {galleryImages.map(({ src, className }) => (
          <img
            className={`h-full min-h-0 w-full min-w-0 rounded-[0.9rem] object-cover max-sm:rounded-[0.55rem] ${className}`}
            src={src}
            alt=""
            key={src}
          />
        ))}
      </div>

      <img
        className="absolute bottom-[-0.2%] left-1/2 z-[3] block h-[74.8%] w-auto -translate-x-1/2 object-contain object-bottom drop-shadow-[0_0.75rem_1rem_rgba(4,17,7,0.18)] max-sm:h-[63%] max-sm:max-w-[92vw]"
        src="/hero-images/Hero Picture.png"
        alt="Nikka Ella wearing black sunglasses and a white top"
      />
    </main>
  )
}

export default App
