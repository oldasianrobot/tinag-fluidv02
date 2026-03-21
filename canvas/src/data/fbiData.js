// FBI anti-Asian hate crime incident counts (verified + partial years only)
// Source: data/fbi/fbi_anti_asian_annual.csv
export const INCIDENT_COUNTS = [
  258, 355, 281, 280, 217, 231, 217, 199,
  181, 188, 137, 126, 150, 175, 152, 164,
  150, 111, 113, 109, 148, 149, 279, 746, 380, 407,
]

const MIN_COUNT = 109
const MAX_COUNT = 746

function normalize(value, min, max, outMin, outMax) {
  return outMin + ((value - min) / (max - min)) * (outMax - outMin)
}

// Offense types mapped to severity colors
// warm = physical violence, cool = psychological/property
// Weighted by real percentages from fbi_offense_types.csv
const OFFENSE_PALETTE = [
  { color: '#FF0000', weight: 0.01 }, // Murder / non-negligent manslaughter
  { color: '#FF4400', weight: 0.06 }, // Aggravated assault
  { color: '#FF8800', weight: 0.26 }, // Simple assault
  { color: '#4488FF', weight: 0.38 }, // Intimidation
  { color: '#8899BB', weight: 0.29 }, // Vandalism / property
]

// Build cumulative weight table for weighted random selection
const cumulativeWeights = []
let cumulative = 0
for (const item of OFFENSE_PALETTE) {
  cumulative += item.weight
  cumulativeWeights.push({ color: item.color, cumulative })
}

export function sampleOffenseColor() {
  const r = Math.random()
  for (const entry of cumulativeWeights) {
    if (r <= entry.cumulative) return entry.color
  }
  return OFFENSE_PALETTE[OFFENSE_PALETTE.length - 1].color
}

export function sampleIncidentCount() {
  return INCIDENT_COUNTS[Math.floor(Math.random() * INCIDENT_COUNTS.length)]
}

export function incidentToSize(count) {
  return normalize(count, MIN_COUNT, MAX_COUNT, 1.2, 5.5)
}

export function incidentToTrailLength(count) {
  return Math.round(normalize(count, MIN_COUNT, MAX_COUNT, 6, 22))
}
