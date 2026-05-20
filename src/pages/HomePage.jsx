import { ArrowRight, Filter, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DestinationCard from '../Components/common/DestinationCard'
import SkeletonCard from '../Components/common/SkeletonCard'
import HeroCarousel from '../Components/home/HeroCarousel'
import destinations from '../data/destinations.json'
import { regionOptions } from '../data/constants'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter((item) => {
      const matchRegion = region === 'All' || item.region === region
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchRegion && matchQuery
    })
  }, [query, region])

  const hasActiveFilters = region !== 'All' || query.trim().length > 0

  const clearFilters = () => {
    setQuery('')
    setRegion('All')
  }

  return (
    <>
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-64px)] w-[min(1180px,calc(100%-1rem))] flex-col justify-center gap-5 py-12 text-white">
          <span className="w-fit rounded-full border border-white/30 bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
            Bangladesh Tourism Made Smart
          </span>
          <h1 className="font-display text-5xl leading-tight md:text-7xl">Discover Bangladesh</h1>
          <p className="max-w-2xl text-base text-white/85 md:text-lg">
            Your smart travel companion for every corner of Bangladesh.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/recommend"
              className="inline-flex items-center gap-2 rounded-full bg-[#c9a84c] px-5 py-3 text-sm font-bold text-[#102b1e] transition hover:-translate-y-1"
            >
              Not sure where to go? Let us help
              <ArrowRight size={16} />
            </Link>
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 py-3 text-sm font-bold text-white backdrop-blur"
            >
              Browse destinations
            </a>
          </div>

          <div className="mt-2 flex w-full max-w-xl items-center gap-2 rounded-2xl border border-white/30 bg-white/90 px-4 py-3 text-[#173026] shadow-xl">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Where do you want to go?"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </section>

      <section id="destinations" className="mx-auto w-[min(1180px,calc(100%-1rem))] py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Explore</p>
            <h2 className="font-display text-4xl text-[#102b1e]">Curated destinations</h2>
          </div>
          <p className="max-w-xl text-sm text-[#587062]">
            Filter by region and pick a package that fits your time, budget, and style.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#1a4731]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#1a4731]">
            <Filter size={14} /> Region
          </span>
          {regionOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRegion(option)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                region === option
                  ? 'bg-[#1a4731] text-white'
                  : 'border border-[#1a4731]/20 bg-white text-[#1a4731] hover:bg-[#1a4731]/5'
              }`}
            >
              {option}
            </button>
          ))}
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-[#1a4731]/20 bg-white px-4 py-2 text-xs font-semibold text-[#1a4731] transition hover:bg-[#1a4731]/5"
            >
              Show all destinations
            </button>
          ) : null}
        </div>

        <p className="mb-4 text-sm text-[#587062]">
          Showing {filteredDestinations.length} destination{filteredDestinations.length === 1 ? '' : 's'}
          {hasActiveFilters ? ' (filtered)' : ''}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : filteredDestinations.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
        </div>
      </section>
    </>
  )
}
