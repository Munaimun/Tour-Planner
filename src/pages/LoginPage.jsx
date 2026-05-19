import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill all fields')
      return
    }

    login({ name: form.name, email: form.email })
    const redirectTo = location.state?.from || '/profile'
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="mx-auto grid w-[min(480px,calc(100%-1rem))] py-14">
      <section className="rounded-3xl border border-[#1a4731]/10 bg-white p-6 shadow-lg">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Account</p>
        <h1 className="mt-1 font-display text-5xl text-[#102b1e]">Login</h1>
        <p className="mt-2 text-sm text-[#587062]">
          No backend yet. This stores user session in localStorage for now.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <InputField
            label="Full name"
            value={form.name}
            onChange={(value) => setForm((cur) => ({ ...cur, name: value }))}
            placeholder="Your name"
          />
          <InputField
            label="Email"
            value={form.email}
            onChange={(value) => setForm((cur) => ({ ...cur, email: value }))}
            placeholder="name@example.com"
            type="email"
          />
          <InputField
            label="Password"
            value={form.password}
            onChange={(value) => setForm((cur) => ({ ...cur, password: value }))}
            placeholder="••••••••"
            type="password"
          />

          {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-[#1a4731] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-1"
          >
            Continue
          </button>
        </form>
      </section>
    </div>
  )
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#587062]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-[#1a4731]/15 bg-[#fffaf2] px-4 py-2.5 text-sm outline-none transition focus:border-[#1a4731]"
      />
    </label>
  )
}
