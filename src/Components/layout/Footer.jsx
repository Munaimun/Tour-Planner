import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a4731]/10 bg-[#fffaf2]">
      <div className="mx-auto grid w-[min(1180px,calc(100%-1rem))] gap-8 py-10 md:grid-cols-3">
        <section>
          <h3 className="font-display text-xl text-[#102b1e]">About VisitBD</h3>
          <p className="mt-3 text-sm text-[#587062]">
            Smart trip planning for Bangladesh. Explore destinations, compare plans, and save your favorites.
          </p>
        </section>

        <section>
          <h3 className="font-display text-xl text-[#102b1e]">Quick Links</h3>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-[#1a4731]">
            <Link to="/">Home</Link>
            <Link to="/recommend">Find My Trip</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </section>

        <section>
          <h3 className="font-display text-xl text-[#102b1e]">Contact</h3>
          <div className="mt-3 space-y-1 text-sm text-[#587062]">
            <p>munaimunz@gmail.com</p>
            <p>Dhaka, Bangladesh</p>
            <p>Facebook · Instagram · YouTube</p>
          </div>
        </section>
      </div>
    </footer>
  )
}
