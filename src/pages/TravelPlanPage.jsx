import { ArrowLeft, CalendarDays, Clock3, MapPin, Star } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import destinations from '../data/destinations.json'

export default function TravelPlanPage() {
  const { slug, packageSlug } = useParams()
  const destination = destinations.find((item) => item.slug === slug)
  const selectedPackage = destination?.packages.find((item) => item.slug === packageSlug)

  if (!destination || !selectedPackage) {
    return <Navigate to="/" replace />
  }

  const itinerary = selectedPackage.days?.length
    ? selectedPackage.days
    : generateDays(destination, selectedPackage.slug)

  const totalPlaces = new Set(itinerary.flatMap((day) => day.slots.map((slot) => slot.place.name))).size
  const totalCost = itinerary.reduce((sum, day) => sum + parseCost(day.cost), 0)

  return (
    <div className="mx-auto grid w-[min(1180px,calc(100%-1rem))] gap-6 py-10 lg:grid-cols-[290px_1fr]">
      <aside className="self-start rounded-3xl border border-[#1a4731]/10 bg-white p-5 lg:sticky lg:top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Trip overview</p>
        <h1 className="mt-1 font-display text-4xl text-[#102b1e]">{destination.name}</h1>
        <p className="text-sm text-[#587062]">{selectedPackage.shortTitle}</p>

        <div className="mt-4 grid gap-2">
          <InfoPill icon={<MapPin size={14} />} text={destination.region} />
          <InfoPill icon={<CalendarDays size={14} />} text={`${itinerary.length} days`} />
          <InfoPill icon={<Clock3 size={14} />} text={selectedPackage.difficulty} />
          <InfoPill icon={<Star size={14} />} text={`${totalPlaces} places`} />
        </div>

        <div className="mt-4 grid gap-2">
          {itinerary.map((_, idx) => (
            <a
              key={idx}
              href={`#day-${idx + 1}`}
              className="rounded-xl border border-[#1a4731]/10 bg-[#fdf6ec] px-3 py-2 text-sm font-semibold text-[#1a4731]"
            >
              Day {idx + 1}
            </a>
          ))}
        </div>

        <Link
          to={`/destination/${destination.slug}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#1a4731]/20 px-4 py-2 text-sm font-semibold text-[#1a4731]"
        >
          <ArrowLeft size={16} />
          Back to destination
        </Link>
      </aside>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[#1a4731]/10 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">Summary</p>
          <h2 className="font-display text-4xl text-[#102b1e]">{selectedPackage.label}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Total places" value={`${totalPlaces}`} />
            <SummaryCard label="Total cost" value={`${totalCost.toLocaleString()} BDT`} />
            <SummaryCard label="Best months" value={destination.bestSeason.label} />
            <SummaryCard label="Difficulty" value={selectedPackage.difficulty} />
          </div>
        </div>

        <div className="space-y-5">
          {itinerary.map((day, idx) => (
            <article key={day.title} id={`day-${idx + 1}`} className="relative pl-6">
              <span className="absolute left-0 top-6 h-full w-px bg-[#c9a84c]/70" />
              <span className="absolute left-[-5px] top-8 h-3 w-3 rounded-full bg-[#c9a84c]" />
              <div className="rounded-3xl border border-[#1a4731]/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1a4731]">{day.title}</p>
                    <h3 className="font-display text-3xl text-[#102b1e]">{day.subtitle}</h3>
                  </div>
                  <span className="rounded-full bg-[#c9a84c]/20 px-3 py-1 text-xs font-semibold text-[#7a5e12]">
                    {day.cost}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {day.slots.map((slot) => (
                    <div key={slot.period} className="rounded-2xl border border-[#1a4731]/10 bg-[#fffaf2] p-3">
                      <span className="rounded-full bg-[#1a4731]/10 px-3 py-1 text-xs font-semibold text-[#1a4731]">
                        {slot.period}
                      </span>
                      <img
                        src={slot.place.image}
                        alt={slot.place.name}
                        className="mt-2 h-44 w-full rounded-xl object-cover"
                      />
                      <h4 className="mt-2 font-display text-2xl text-[#102b1e]">{slot.place.name}</h4>
                      <p className="mt-1 text-sm text-[#587062]">{slot.place.description}</p>
                      <div className="mt-2 space-y-1 text-xs text-[#587062]">
                        <p>⏱ {slot.place.duration_suggested}</p>
                        <p>📍 {slot.place.best_time}</p>
                        <p>💡 {slot.place.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-[#1a4731]/5 p-3 text-sm text-[#1a4731]">
                  <p>
                    <span className="font-bold">Transport note:</span> {day.transport}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#1a4731]/10 bg-[#fffaf2] p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#587062]">{label}</p>
      <p className="mt-1 text-base font-bold text-[#102b1e]">{value}</p>
    </div>
  )
}

function InfoPill({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#1a4731]/10 px-3 py-1.5 text-xs font-semibold text-[#1a4731]">
      {icon}
      {text}
    </div>
  )
}

function parseCost(cost) {
  const value = cost.replace(/[^0-9]/g, '')
  return value ? Number(value) : 0
}

function generateDays(destination, packageSlug) {
  const count = packageSlug === '1-2-days' ? 2 : packageSlug === '3-4-days' ? 4 : 7
  return Array.from({ length: count }).map((_, idx) => {
    const morning = destination.keyPlaces[(idx * 2) % destination.keyPlaces.length]
    const afternoon = destination.keyPlaces[(idx * 2 + 1) % destination.keyPlaces.length]
    const evening = destination.keyPlaces[(idx * 2 + 2) % destination.keyPlaces.length]

    return {
      title: `Day ${idx + 1}`,
      subtitle: idx === 0 ? `Arrival and first highlights` : `Curated route across ${destination.name}`,
      transport: destination.transportNotes[idx % destination.transportNotes.length],
      cost: `${destination.baseDayCost[idx % destination.baseDayCost.length]} BDT`,
      slots: [
        { period: 'Morning', place: morning },
        { period: 'Afternoon', place: afternoon },
        { period: 'Evening', place: evening },
      ],
    }
  })
}
