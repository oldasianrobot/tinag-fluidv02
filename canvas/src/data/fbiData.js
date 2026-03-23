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
// Violent offenses against persons → warm (red → orange → yellow)
// Property offenses → cool (green)
// Colors from data/fbi/fbi_offense_color_system.md
// Weights normalized from fbi_offense_types.csv so they sum to 1.0
const OFFENSE_PALETTE = [
  { color: '#CC0000', weight: 0.005 }, // Murder / non-negligent manslaughter (<1%)
  { color: '#FF5500', weight: 0.130 }, // Aggravated assault (14%)
  { color: '#FFB300', weight: 0.240 }, // Simple assault (26%)
  { color: '#FFE033', weight: 0.355 }, // Intimidation (38%) — crime against persons; warm
  { color: '#2D6A4F', weight: 0.270 }, // Vandalism / property (29%)
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
