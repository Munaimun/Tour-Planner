export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#1a4731]/10 bg-white p-4">
      <div className="aspect-[4/3] animate-pulse rounded-2xl bg-[#1a4731]/10" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-20 animate-pulse rounded bg-[#1a4731]/10" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-[#1a4731]/10" />
        <div className="h-3 w-full animate-pulse rounded bg-[#1a4731]/10" />
      </div>
    </div>
  )
}
