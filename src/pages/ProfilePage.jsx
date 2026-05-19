import { CalendarDays, Heart, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useWishlist } from '../contexts/WishlistContext'
import destinations from '../data/destinations.json'

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const { wishlist } = useWishlist()

  if (!isAuthenticated) {
    return (
      <div className="mx-auto w-[min(760px,calc(100%-1rem))] py-14">
        <div className="rounded-3xl border border-[#1a4731]/10 bg-white p-8 text-center">
          <h1 className="font-display text-4xl text-[#102b1e]">Please login first</h1>
          <p className="mt-2 text-sm text-[#587062]">Login to see your profile and wishlist in one place.</p>
          <Link to="/login" className="mt-4 inline-block rounded-full bg-[#1a4731] px-5 py-2 text-sm font-bold text-white">
            Go to login
          </Link>
        </div>
      </div>
    )
  }

  const wishItems = wishlist.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean)

  return (
    <div className="mx-auto w-[min(1180px,calc(100%-1rem))] py-10">
      <div className="mb-6 grid gap-4 rounded-3xl border border-[#1a4731]/10 bg-white p-6 md:grid-cols-3">
        <Info icon={<User size={16} />} label="Name" value={user.name} />
        <Info icon={<Mail size={16} />} label="Email" value={user.email} />
        <Info
          icon={<CalendarDays size={16} />}
          label="Joined"
          value={new Date(user.joinedAt).toLocaleDateString()}
        />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-4xl text-[#102b1e]">Your wishlist</h2>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#1a4731]/10 px-4 py-2 text-sm font-semibold text-[#1a4731]">
          <Heart size={16} />
          {wishItems.length} saved
        </span>
      </div>

      {wishItems.length === 0 ? (
        <div className="rounded-3xl border border-[#1a4731]/10 bg-white p-8 text-center">
          <p className="text-sm text-[#587062]">You have no saved destinations yet.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-[#1a4731] px-5 py-2 text-sm font-bold text-white">
            Explore destinations
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishItems.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-3xl border border-[#1a4731]/10 bg-white">
              <img src={item.heroImage} alt={item.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-3xl text-[#102b1e]">{item.name}</h3>
                <p className="mt-1 text-sm text-[#587062]">{item.tagline}</p>
                <Link
                  to={`/destination/${item.slug}`}
                  className="mt-3 inline-block rounded-full bg-[#1a4731] px-4 py-2 text-sm font-semibold text-white"
                >
                  Open destination
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-[#fffaf2] p-4">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#587062]">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-[#102b1e]">{value}</p>
    </div>
  )
}
