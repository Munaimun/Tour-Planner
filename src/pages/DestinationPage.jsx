import { BadgeCheck, Heart } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useDestinations } from '../contexts/DestinationsContext'
import { useWishlist } from '../contexts/WishlistContext'

export default function DestinationPage() {
  const { slug } = useParams()
  const { isSaved, toggleWish } = useWishlist()
  const { getDestination } = useDestinations()
  const destination = getDestination(slug)

  if (!destination) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto w-[min(1180px,calc(100%-1rem))] py-10">
      <section className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/20">
        <img src={destination.bannerImage} alt={destination.name} className="h-[360px] w-full object-cover md:h-[460px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/75" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <span className="rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-bold text-[#102b1e]">{destination.region}</span>
          <h1 className="mt-3 font-display text-5xl text-white">{destination.name}</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/90 md:text-base">{destination.shortDescription}</p>
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#1a4731]/10 bg-white p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1a4731]">Best Season</p>
          <h2 className="font-display text-2xl text-[#102b1e]">
            {destination.bestSeason.icon} {destination.bestSeason.label}
          </h2>
          <p className="text-sm text-[#587062]">{destination.bestSeason.note}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleWish(destination.slug)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
            isSaved(destination.slug)
              ? 'bg-[#c9a84c]/20 text-[#7a5e12]'
              : 'bg-[#1a4731] text-white hover:-translate-y-1'
          }`}
        >
          <Heart size={16} />
          {isSaved(destination.slug) ? 'Saved to wishlist' : 'Save to wishlist'}
        </button>
      </div>

      <section className="mt-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Why Visit</p>
        <h3 className="font-display text-4xl text-[#102b1e]">What makes it special</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {destination.whyVisit.map((reason) => (
            <div key={reason} className="flex items-start gap-3 rounded-2xl border border-[#1a4731]/10 bg-white p-4">
              <BadgeCheck size={18} className="mt-0.5 text-[#c9a84c]" />
              <p className="text-sm text-[#587062]">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Choose your package</p>
        <h3 className="font-display text-4xl text-[#102b1e]">Trip durations</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {destination.packages.map((pkg) => (
            <article
              key={pkg.slug}
              className="rounded-3xl border border-[#1a4731]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#c9a84c]/20 px-3 py-1 text-xs font-semibold text-[#7a5e12]">{pkg.label}</span>
                <span className="rounded-full bg-[#1a4731]/10 px-3 py-1 text-xs font-semibold text-[#1a4731]">{pkg.difficulty}</span>
              </div>
              <h4 className="mt-3 font-display text-3xl text-[#102b1e]">{pkg.shortTitle}</h4>
              <p className="mt-2 text-sm text-[#587062]">{pkg.summary}</p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[#587062]">
                <li>{pkg.placesCovered} places covered</li>
                <li>{pkg.costRange}</li>
                <li>{pkg.focus}</li>
              </ul>
              <Link
                to={`/destination/${destination.slug}/plan/${pkg.slug}`}
                className="mt-4 inline-flex rounded-full bg-[#1a4731] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-1"
              >
                View Plan
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
