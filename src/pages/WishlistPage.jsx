import { Heart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import destinations from '../data/destinations.json'

export default function WishlistPage() {
  const { wishlist, removeWish, clearWish } = useWishlist()
  const items = wishlist.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean)

  return (
    <div className="mx-auto w-[min(1180px,calc(100%-1rem))] py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Wishlist</p>
          <h1 className="font-display text-5xl text-[#102b1e]">Saved destinations</h1>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearWish}
            className="inline-flex items-center gap-2 rounded-full border border-[#1a4731]/20 bg-white px-4 py-2 text-sm font-semibold text-[#1a4731]"
          >
            <Trash2 size={15} />
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="grid place-items-center gap-4 rounded-3xl border border-[#1a4731]/10 bg-white p-10 text-center">
          <Heart size={36} className="text-[#c9a84c]" />
          <h2 className="font-display text-3xl text-[#102b1e]">No saved destination yet</h2>
          <p className="max-w-md text-sm text-[#587062]">Save from cards or recommendations and manage them here.</p>
          <Link to="/" className="rounded-full bg-[#1a4731] px-4 py-2 text-sm font-bold text-white">
            Browse destinations
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-3xl border border-[#1a4731]/10 bg-white">
              <img src={item.heroImage} alt={item.name} className="h-52 w-full object-cover" />
              <div className="space-y-3 p-4">
                <h3 className="font-display text-3xl text-[#102b1e]">{item.name}</h3>
                <p className="text-sm text-[#587062]">{item.tagline}</p>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={`/destination/${item.slug}`}
                    className="rounded-full bg-[#1a4731] px-4 py-2 text-xs font-bold text-white"
                  >
                    View Plan
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeWish(item.slug)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#1a4731]/20 bg-white px-4 py-2 text-xs font-semibold text-[#1a4731]"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
