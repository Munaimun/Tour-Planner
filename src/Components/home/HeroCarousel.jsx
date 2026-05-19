import { useEffect, useState } from 'react'
import shundorban from '../../img/shundorban.jpg'
import cox from '../../img/cox.jpg'
import sylhetImg from '../../img/sylhet.jpg'
import oldDhakaImg from '../../img/lalbag.jpg'

const heroSlides = [
  {
    title: 'Sundarbans',
    subtitle: 'Mangroves, wildlife, and tidal silence',
    image: shundorban,
  },
  {
    title: "Cox's Bazar",
    subtitle: 'The long arc of sea and sand',
    image: cox,
  },
  {
    title: 'Sylhet',
    subtitle: 'Tea gardens, waterfalls, and river blues',
    image: sylhetImg,
  },
  {
    title: 'Old Dhaka',
    subtitle: 'Stories, spice lanes, and heritage streets',
    image: oldDhakaImg,
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((cur) => (cur + 1) % heroSlides.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
            i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75" />
          <div className="absolute bottom-5 right-5 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white backdrop-blur">
            <p className="font-bold">{slide.title}</p>
            <p className="text-sm text-white/85">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-5 left-5 flex gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show ${slide.title}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#c9a84c]' : 'w-2.5 bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  )
}
