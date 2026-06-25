import { Heart,LogOut, Menu, Sparkles, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/recommend', label: 'Find My Trip' },
  { to: '/wishlist', label: 'Wishlist' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  // const [lang, setLang] = useState('EN')
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-[#1a4731]/10 bg-[#fdf6ec]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-[min(1180px,calc(100%-1rem))] items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1a4731] font-black text-white">V</span> */}
          <span>
            <span className="block font-display text-lg text-[#102b1e]">ViewFinder</span>
            <span className="block text-xs text-[#587062]">Bangladesh Travel Planner</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-[#1a4731] text-white' : 'text-[#1a4731] hover:bg-[#1a4731]/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-[#c9a84c] text-[#102b1e]' : 'text-[#1a4731] hover:bg-[#c9a84c]/20'
              }`
            }
          >
            Profile
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {/* <button
            type="button"
            onClick={() => setLang((cur) => (cur === 'EN' ? 'বাংলা' : 'EN'))}
            className="hidden items-center gap-1 rounded-full border border-[#1a4731]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#1a4731] sm:inline-flex"
          >
            <Languages size={14} />
            {lang}
          </button> */}

          <Link
            to="/wishlist"
            className="hidden items-center gap-1 rounded-full border border-[#1a4731]/20 bg-white px-3 py-1.5 text-xs font-semibold text-[#1a4731] sm:inline-flex"
          >
            <Heart size={14} />
            Wishlist
          </Link>

          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="hidden items-center gap-1 rounded-full bg-[#1a4731] px-3 py-1.5 text-xs font-semibold text-white sm:inline-flex"
            >
              <LogOut size={14} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1 rounded-full bg-[#1a4731] px-3 py-1.5 text-xs font-semibold text-white sm:inline-flex"
            >
              <User size={14} />
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((cur) => !cur)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1a4731]/20 bg-white text-[#1a4731] md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#1a4731]/10 bg-[#fffaf2] p-3 md:hidden">
          <div className="mx-auto grid w-[min(1180px,100%)] gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl border border-[#1a4731]/15 bg-white px-4 py-3 text-sm font-semibold text-[#1a4731]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="rounded-xl border border-[#1a4731]/15 bg-white px-4 py-3 text-sm font-semibold text-[#1a4731]"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/recommend"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1a4731] px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Sparkles size={16} />
              Not sure where to go?
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
