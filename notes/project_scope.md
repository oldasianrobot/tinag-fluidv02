# Project Data Scope

## What This Project Uses

For TINAG purposes, this database is scoped to two data points per year, per source:

1. **Total annual incident/offense count**
2. **Disaggregation by type of offense or incident** (where available)

Everything else — demographics, geography, agency participation rates, survey methodology — is context held in source docs and notes. It informs interpretation but is not primary data for the work.

---

## What We Have

### FBI — annual totals
`data/fbi/fbi_anti_asian_annual.csv`
Complete 1991–2023. Most years verified; 1991–1999 has gaps.

### FBI — offense type disaggregation
`data/fbi/fbi_offense_types.csv`
**Limitation:** Currently aggregate percentages across all years (most recent data), not a year-by-year breakdown. FBI does publish offense type by bias motivation annually — year-by-year disaggregation is possible but not yet pulled.

Categories: Intimidation (38%), Vandalism (29%), Simple Assault (26%), Aggravated Assault (14%), other (<1% each)

### STOP AAPI Hate — annual totals
`data/stop_aapi_hate/sah_annual_totals.csv`
March 19, 2020 – 2023 verified. 2024 count unpublished/gap.

### STOP AAPI Hate — incident type disaggregation
`data/stop_aapi_hate/sah_incident_types.csv`
**Limitation:** Aggregate percentages across 2020–2022 period, not broken out by year. STOP AAPI Hate does not appear to publish annual offense type breakdowns — the disaggregation in their reports is cumulative.

Categories: Verbal Harassment (63%), Physical Assault (16%), Avoidance/Shunning (16%), Civil Rights Violations (11.5%), Online Harassment (8.6%), Property Damage (~6%)

---

## Known Gaps in Disaggregation

- FBI year-by-year offense type data exists but has not been pulled yet
- STOP AAPI Hate incident type by year is likely not published at that granularity
- Both current offense type files are snapshots, not time series

## Next Steps (if needed)
- Pull FBI year-by-year offense type breakdown from Crime Data Explorer (CDE) tables
- Confirm whether STOP AAPI Hate published annual incident type breakdowns in any of their PDFs
