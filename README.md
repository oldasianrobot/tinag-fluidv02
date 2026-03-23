# This Is Not A Gap: Fluid Record V02

**An interactive generative art experience that renders anti-Asian hate crime data as live fluid trails — where each particle's color, weight, and trajectory carries the encoded record of violence, absence, and everything the data could not reach.**

> *The gap between an FBI report of 407 incidents and a community count of 12,803 in the same year is not a discrepancy to footnote. It is the subject of the work.*

---

## What It Is

*fluid* is the first canvas in the TINAG (This Is Not A Gap) series — an ongoing art project examining anti-Asian hate in America through data, absence, and the structural limits of counting.

Move your cursor across the screen and you generate particles. Each particle is drawn from 33 years of FBI hate crime data (1991–2023). Its **color** encodes the type of offense. Its **size** and **trail length** encode the incident count from a sampled year — a higher-count year produces a heavier, longer stroke; a quieter year, a thinner, shorter one. The trails are fluid: turbulence-driven, curved, briefly visible before they decay and vanish. Like the events they represent.

When no one is interacting, three autonomous bots continue to move through the canvas — the data generating itself, witnessed or not.

This is not a chart. There are no axes, no labels, no tooltips. The numbers are present. They are not legible.

---

## The Data Problem

This project draws from two fundamentally incompatible measurement systems. Both are partial. Neither is wrong.

### FBI Hate Crime Statistics (1992–2023)
The FBI counts **criminal acts** that were:
1. Reported to police
2. Investigated and determined to be bias-motivated by an officer
3. Submitted by a participating law enforcement agency to the federal program

In 2023: **407** anti-Asian hate crime incidents recorded nationally.

### STOP AAPI Hate (March 19, 2020–2024)
STOP AAPI Hate counts **any discriminatory act** self-reported by community members — criminal or not. Verbal slurs on the street. Being avoided on the sidewalk. Being refused service. Being spat at. Being attacked.

From launch through 2024: **12,803** incidents reported.

The Bureau of Justice Statistics estimates only ~54% of violent hate crimes are reported to police at all. Of those, a fraction are classified as hate crimes. The true number is unknowable. That is part of the truth.

### The Gaps Are the Data

Both datasets contain structural voids that are not incidental — they are records of how violence has been seen, and not seen:

- **1991:** The Hate Crime Statistics Act passed in 1990. Collection began in 1992. The mandate preceded the mechanism. The first year the law existed, no one counted.
- **1993–1999:** Only two confirmed annual figures survive in public records. Four years have no recoverable number — not because nothing happened, but because no one assembled it into a number that survived.
- **2013:** The OMB separated "Asian" from "Native Hawaiian or Other Pacific Islander." The apparent drop in incidents after this year may not reflect any real change — it may be that Pacific Islander victims were reclassified out of the count. A bureaucratic redefinition that looks like improvement.
- **2021:** The year of the largest recorded spike (746 incidents, +168%) is also the year the FBI transitioned to NIBRS, dropping ~3,300 agencies from participation. The most visible moment of violence is the least comparably measured in the dataset.
- **November 2023:** STOP AAPI Hate retroactively reclassified all 2020–2021 reports using a new three-tier taxonomy, removing 817 incidents from the official totals. The peak, as first reported in real time during the height of the violence, was quietly walked back three years later. The people who submitted those 817 reports did not change their experience. The framework that decided whether their experience counted changed around them.
- **2024:** STOP AAPI Hate has not published 2024 incident counts as of March 2026. The year exists in this dataset as an empty cell — not an omission, a presence.

---

## How Data Drives the Canvas

Every visual property of every particle is determined by real data, not aesthetic choice.

| Visual Property | Data Source | Range |
|---|---|---|
| **Color** | FBI offense type, weighted by real proportions | See color system below |
| **Trail weight / stroke width** | FBI annual incident count, normalized | 1.2–5.5px |
| **Trail length** | FBI annual incident count, normalized | 6–22 segments |
| **Trail curve** | Quadratic bezier through position history | — |
| **Flow direction** | Perlin-style turbulence field + mouse velocity | — |
| **Particle decay** | Fixed rate (0.005–0.015/frame) | Life: 1.0 → 0 |

The highest incident year (2021: 746) produces the heaviest, longest strokes. The quietest years (2017: 109, 2015: 111) produce barely-there marks. The canvas accumulates and fades — a ghosted record that cannot be read, only felt.

### The Color System

Offense types map to a severity-weighted spectrum. Warm colors carry physical violence. Cool and dark colors carry property crime and psychological harm. Colors appear weighted by their actual proportions in the FBI data — so the canvas is predominantly amber and blue-green, because intimidation (38%) and vandalism (29%) dominate the record, not murder.

| Offense | Color | Hex | FBI Share |
|---|---|---|---|
| Murder / Non-negligent Manslaughter | Deep red | `#CC0000` | <1% |
| Rape | Red-orange | `#E8472A` | <1% |
| Aggravated Assault | Orange-red | `#FF5500` | 6% |
| Robbery | Burnt orange | `#FF8000` | <1% |
| Simple Assault | Amber | `#FFB300` | 26% |
| Intimidation | Yellow | `#FFE033` | 38% |
| Arson | Dark brown | `#7D4E00` | <1% |
| Vandalism / Property Destruction | Forest green | `#2D6A4F` | 29% |
| Burglary | Dark blue | `#1A5276` | <1% |
| Larceny-Theft | Deep purple | `#4A235A` | <1% |
| Motor Vehicle Theft | Medium purple | `#7D3C98` | <1% |
| Other / Unknown | Neutral gray | `#555555` | — |

---

## Running the Project

Built with React 19 + Vite 8. No external dependencies beyond the framework.

```bash
cd canvas
npm install
npm run dev
```

Open `http://localhost:5173`. Move your cursor to generate data trails. Leave it idle to watch the autonomous bots.

```bash
npm run build    # production build → canvas/dist/
npm run preview  # preview production build locally
```

---

## Project Structure

```
thisisnotagap_fluid/
├── canvas/                          — React/Vite application
│   └── src/
│       ├── components/
│       │   ├── GenerativeCanvas.jsx — particle system + canvas loop
│       │   ├── DataStreamRow.jsx    — data display rows
│       │   └── MetaRow.jsx          — metadata display
│       └── data/
│           └── fbiData.js           — data layer: counts, color weights, normalization
├── data/
│   ├── fbi/
│   │   ├── fbi_anti_asian_annual.csv      — 1991–2023 annual FBI incident counts
│   │   ├── fbi_offense_types.csv          — offense category breakdown
│   │   ├── fbi_offense_color_system.md    — color system documentation
│   │   └── fbi_sources.md                 — source URLs and methodology
│   └── stop_aapi_hate/
│       ├── sah_annual_totals.csv          — March 2020–2024 annual totals
│       ├── sah_incident_types.csv         — incident category breakdown
│       └── sah_sources.md                 — source URLs and methodology
└── notes/
    ├── data_gaps.md                 — interpretive notes on what the data cannot see
    └── project_scope.md             — data scope and known limitations
```

`notes/data_gaps.md` is the most important file in this repository. It documents not the data, but the shape of what is missing — and why that shape is itself evidence.

---

## Data Sources

- **FBI Hate Crime Statistics** (1992–2023) — [UCR Program](https://ucr.fbi.gov/hate-crime) / [Crime Data Explorer](https://cde.ucr.cjis.gov)
- **STOP AAPI Hate** — [National Reports 2020–2022](https://stopaapihate.org/national-report-through-2021/)
- **Bureau of Justice Statistics** — [National Crime Victimization Survey](https://bjs.ojp.gov/data-collection/ncvs)
- **Asian Americans Advancing Justice / NORC** — [Anti-Asian Hate 2024 Analysis](https://www.advancingjustice-aajc.org/publication/anti-asian-hate-2024-analysis-and-recommendations-change)

---

## On Method

This project is not empirically rigorous and does not claim to be. The FBI data has significant participation gaps. The STOP AAPI Hate data is self-reported and unverified. Both datasets are floors, not ceilings. The methodological inconsistencies across decades — shifting definitions, participation fluctuations, retroactive reclassifications — are left in, not cleaned out.

The messiness is honest.

What matters is not the precision of any single number. It is the fact that both measurement systems, as different as they are, agree: anti-Asian hate in America is chronic, undercounted, and ongoing. What falls between them — the gap — is not an artifact of bad data. It is the space that data, by definition, cannot fill.

---

*Data compiled March 2026. TINAG — This Is Not A Gap.*
