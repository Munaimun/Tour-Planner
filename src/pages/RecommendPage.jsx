/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight, BadgeCheck, Heart, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDestinations } from '../contexts/DestinationsContext'
import { useWishlist } from '../contexts/WishlistContext'
import {
  budgetOptions,
  durationOptions,
  seasonOptions,
  specialNeedOptions,
  travelerOptions,
  vibeOptions,
} from '../data/constants'
import { recommendDestinations } from '../utils/recommend'

const loadingTexts = ['Scanning tea gardens...', 'Checking the tides...', 'Asking the hilltops...']

export default function RecommendPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [textIndex, setTextIndex] = useState(0)
  const { destinations } = useDestinations()

  const [pref, setPref] = useState({
    travelerType: '',
    vibes: [],
    duration: '3-4-days',
    budget: 'mid-range',
    season: 'any',
    needs: [],
  })

  useEffect(() => {
    if (!loading) {
      return undefined
    }
    const timer = window.setInterval(() => {
      setTextIndex((cur) => (cur + 1) % loadingTexts.length)
    }, 900)
    return () => window.clearInterval(timer)
  }, [loading])

  const next = () => {
    if (step < 4) {
      setStep((cur) => cur + 1)
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      setResults(recommendDestinations(pref, destinations))
      setLoading(false)
    }, 3000)
  }

  const back = () => setStep((cur) => Math.max(1, cur - 1))

  return (
    <div className="mx-auto w-[min(1000px,calc(100%-1rem))] py-10">
      <section className="rounded-3xl border border-[#1a4731]/10 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Find My Perfect Destination</p>
        <h1 className="font-display text-5xl text-[#102b1e]">Travel Quiz</h1>
        <p className="mt-2 text-sm text-[#587062]">Fun multi-step planner with personalized recommendations.</p>

        <div className="mt-5 overflow-hidden rounded-full bg-[#1a4731]/10">
          <div className="h-2 bg-gradient-to-r from-[#1a4731] to-[#c9a84c] transition-all" style={{ width: `${(step / 4) * 100}%` }} />
        </div>
        <p className="mt-2 inline-flex rounded-full bg-[#1a4731]/10 px-3 py-1 text-xs font-semibold text-[#1a4731]">
          Step {step} of 4
        </p>

        {!loading && results.length === 0 ? (
          <div className="mt-6 space-y-5">
            {step === 1 ? (
              <SingleStep
                title="Who's Travelling?"
                selected={pref.travelerType}
                options={travelerOptions}
                onSelect={(val) => setPref((cur) => ({ ...cur, travelerType: val }))}
              />
            ) : null}

            {step === 2 ? (
              <MultiStep
                title="What's Your Vibe?"
                selected={pref.vibes}
                options={vibeOptions}
                limit={3}
                onToggle={(values) => setPref((cur) => ({ ...cur, vibes: values }))}
              />
            ) : null}

            {step === 3 ? <TripDetails pref={pref} setPref={setPref} /> : null}

            {step === 4 ? (
              <MultiStep
                title="Any Special Needs?"
                selected={pref.needs}
                options={specialNeedOptions}
                limit={5}
                onToggle={(values) => setPref((cur) => ({ ...cur, needs: values }))}
              />
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-full border border-[#1a4731]/20 px-4 py-2 text-sm font-semibold text-[#1a4731] disabled:opacity-50"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-[#1a4731] px-5 py-2.5 text-sm font-bold text-white"
              >
                {step < 4 ? (
                  <>
                    Next <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    Find my trip <Sparkles size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="grid place-items-center gap-3 py-16 text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#1a4731]/20 border-t-[#c9a84c]" />
            <h2 className="font-display text-3xl text-[#102b1e]">Finding your perfect trip...</h2>
            <p className="text-sm text-[#587062]">{loadingTexts[textIndex]}</p>
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-display text-4xl text-[#102b1e]">We found 3 perfect destinations for you ✨</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((item, idx) => (
                <ResultCard key={item.destination.slug} item={item} rank={idx + 1} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function SingleStep({ title, selected, options, onSelect }) {
  return (
    <div>
      <h3 className="font-display text-3xl text-[#102b1e]">{title}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onSelect(option.key)}
            className={`rounded-2xl border p-4 text-left transition ${
              selected === option.key
                ? 'border-[#c9a84c] bg-[#c9a84c]/15'
                : 'border-[#1a4731]/15 bg-[#fffaf2] hover:border-[#1a4731]/30'
            }`}
          >
            <p className="text-2xl">{option.emoji}</p>
            <p className="mt-2 text-sm font-semibold text-[#1a4731]">{option.label}</p>
            {selected === option.key && <BadgeCheck size={16} className="mt-2 text-[#7a5e12]" />}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiStep({ title, selected, options, limit, onToggle }) {
  const toggle = (key) => {
    if (selected.includes(key)) {
      onToggle(selected.filter((item) => item !== key))
      return
    }
    if (selected.length >= limit) {
      return
    }
    onToggle([...selected, key])
  }

  return (
    <div>
      <h3 className="font-display text-3xl text-[#102b1e]">{title}</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => toggle(option.key)}
            className={`rounded-2xl border p-4 text-left text-sm transition ${
              selected.includes(option.key)
                ? 'border-[#c9a84c] bg-[#c9a84c]/15 font-semibold text-[#7a5e12]'
                : 'border-[#1a4731]/15 bg-[#fffaf2] text-[#1a4731] hover:border-[#1a4731]/30'
            }`}
          >
            <p>{option.label}</p>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold text-[#587062]">
        {selected.length} of {limit} selected
      </p>
    </div>
  )
}

function TripDetails({ pref, setPref }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-3xl text-[#102b1e]">Trip Details</h3>
      <ChoiceRow
        title="How many days?"
        options={durationOptions}
        value={pref.duration}
        onChange={(value) => setPref((cur) => ({ ...cur, duration: value }))}
      />
      <ChoiceRow
        title="Budget range"
        options={budgetOptions}
        value={pref.budget}
        onChange={(value) => setPref((cur) => ({ ...cur, budget: value }))}
      />
      <ChoiceRow
        title="Best season preference"
        options={seasonOptions}
        value={pref.season}
        onChange={(value) => setPref((cur) => ({ ...cur, season: value }))}
      />
    </div>
  )
}

function ChoiceRow({ title, options, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#1a4731]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              option.key === value
                ? 'bg-[#1a4731] text-white'
                : 'border border-[#1a4731]/15 bg-[#fffaf2] text-[#1a4731]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ResultCard({ item, rank }) {
  const { isSaved, toggleWish } = useWishlist()
  const saved = isSaved(item.destination.slug)

  return (
    <article className="overflow-hidden rounded-3xl border border-[#1a4731]/10 bg-white shadow-sm">
      <div className="relative">
        <img src={item.destination.heroImage} alt={item.destination.name} className="h-44 w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#102b1e]">#{rank}</span>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="font-display text-3xl text-[#102b1e]">{item.destination.name}</h3>
        <p className="text-sm text-[#587062]">{item.reason}</p>

        <div className="h-2 overflow-hidden rounded-full bg-[#1a4731]/10">
          <div className="h-full bg-gradient-to-r from-[#1a4731] to-[#c9a84c]" style={{ width: `${item.score}%` }} />
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-[#587062]">
          <span>{item.score}% match</span>
          <span>{item.packageLabel}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/destination/${item.destination.slug}/plan/${item.packageSlug}`}
            className="rounded-full bg-[#1a4731] px-4 py-2 text-xs font-bold text-white"
          >
            View Full Plan
          </Link>
          <button
            type="button"
            onClick={() => toggleWish(item.destination.slug)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
              saved
                ? 'bg-[#c9a84c]/20 text-[#7a5e12]'
                : 'border border-[#1a4731]/20 bg-white text-[#1a4731]'
            }`}
          >
            <Heart size={14} />
            Save to Wishlist
          </button>
        </div>
      </div>
    </article>
  )
}
