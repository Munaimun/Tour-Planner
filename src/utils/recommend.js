const seasonTagMap = {
  winter: 'winter',
  monsoon: 'monsoon',
  summer: 'summer',
  any: null,
}

export function recommendDestinations(userPreferences, destinations) {
  return destinations
    .map((destination) => {
      let score = 0
      const matchedReasons = []

      if (destination.travelerTypes.includes(userPreferences.travelerType)) {
        score += 26
        matchedReasons.push(`Great for ${friendlyTraveler(userPreferences.travelerType)}`)
      }

      const vibeMatches = userPreferences.vibes.filter((vibe) => destination.tags.includes(vibe))
      if (vibeMatches.length) {
        score += vibeMatches.length * 14
        matchedReasons.push(`Matches ${vibeMatches.length} of your travel vibes`)
      }

      if (destination.budgetTags.includes(userPreferences.budget)) {
        score += 12
        matchedReasons.push('Fits your budget range')
      }

      if (seasonTagMap[userPreferences.season] && destination.seasonTags.includes(seasonTagMap[userPreferences.season])) {
        score += 14
        matchedReasons.push(`Best enjoyed in ${labelFromKey(userPreferences.season)}`)
      }

      if (userPreferences.season === 'any') {
        score += 5
      }

      if (destination.needsTags?.some((tag) => userPreferences.needs.includes(tag))) {
        score += 10
        matchedReasons.push('Handles one or more special needs')
      }

      const packageSlug = pickPackage(destination, userPreferences.duration)
      const packageMatch = destination.packages.find((item) => item.slug === packageSlug)

      if (packageMatch) {
        score += 10
      }

      return {
        destination,
        score: Math.min(score, 100),
        reason: matchedReasons[0] || destination.tagline,
        packageSlug,
        packageLabel: packageMatch?.label || packageLabelFromSlug(packageSlug),
      }
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
}

function pickPackage(destination, duration) {
  if (destination.packages.some((item) => item.slug === duration)) {
    return duration
  }

  if (duration === '1-2-days') {
    return destination.packages[0]?.slug || '1-2-days'
  }

  if (duration === '3-4-days') {
    return destination.packages[1]?.slug || destination.packages[0]?.slug || '3-4-days'
  }

  return destination.packages[2]?.slug || destination.packages.at(-1)?.slug || '7-days'
}

function friendlyTraveler(key) {
  const values = {
    solo: 'solo travelers',
    couple: 'couples',
    family: 'families',
    friends: 'groups of friends',
    senior: 'senior travelers',
  }
  return values[key] || 'travelers'
}

function labelFromKey(key) {
  const values = {
    winter: 'Winter',
    monsoon: 'Monsoon',
    summer: 'Summer',
  }
  return values[key] || 'Any season'
}

function packageLabelFromSlug(slug) {
  const labels = {
    '1-2-days': '1–2 Day Plan',
    '3-4-days': '3–4 Day Plan',
    '7-days': '7 Day Plan',
  }
  return labels[slug] || 'Suggested Plan'
}