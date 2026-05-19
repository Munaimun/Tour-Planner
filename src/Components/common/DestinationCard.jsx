import { Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../contexts/WishlistContext'

export default function DestinationCard({ destination }) {
  const { isSaved, toggleWish } = useWishlist()
  const saved = isSaved(destination.slug)

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#1a4731]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/destination/${destination.slug}`} className="relative block aspect-[4/3]">
        <img src={destination.heroImage} alt={destination.name} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-[#c9a84c]/90 px-3 py-1 text-xs font-bold text-[#102b1e]">
          {destination.bestSeason.badge}
        </span>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#1a4731]/10 px-3 py-1 text-xs font-semibold text-[#1a4731]">
            {destination.region}
          </span>
          <button
            type="button"
            onClick={() => toggleWish(destination.slug)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${
              saved
                ? 'border-[#c9a84c] bg-[#c9a84c]/20 text-[#7a5e12]'
                : 'border-[#1a4731]/20 bg-white text-[#1a4731] hover:bg-[#1a4731]/5'
            }`}
          >
            <Heart size={16} />
          </button>
        </div>

        <div>
          <h3 className="font-display text-2xl text-[#102b1e]">{destination.name}</h3>
          <p className="mt-1 text-sm text-[#587062]">{destination.tagline}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1 text-[#587062]">
            <Sparkles size={14} />
            {destination.bestSeason.label}
          </span>
          <Link to={`/destination/${destination.slug}`} className="font-semibold text-[#1a4731] hover:text-[#c9a84c]">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
