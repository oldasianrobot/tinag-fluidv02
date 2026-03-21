import styles from './DataStreamRow.module.css'

const LEGEND = [
  { color: '#FF0000', offense: 'Murder / Non-negligent manslaughter', pct: '<1%', count: '~30'    },
  { color: '#FF4400', offense: 'Aggravated assault',                  pct: '6%',  count: '~354'   },
  { color: '#FF8800', offense: 'Simple assault',                      pct: '26%', count: '~1,535' },
  { color: '#4488FF', offense: 'Intimidation',                        pct: '38%', count: '~2,243' },
  { color: '#8899BB', offense: 'Vandalism / Property destruction',    pct: '29%', count: '~1,712' },
]

const DATA_YEARS = '1993, 1995, 2000–2023'
const GAP_YEARS  = '1991, 1992, 1994, 1996–1999'

export function DataStreamRow() {
  return (
    <div className={styles.row}>
      <div className={`${styles.cell} ${styles.cellId}`}>
        <span className={styles.label}>DATA—STREAM</span>
        <span className={styles.value}>ACTIVE</span>
        <span className={styles.value}>CONTINUOUS</span>
      </div>

      <div className={`${styles.cell} ${styles.cellLegend}`}>
        <span className={styles.heading}>FLUID LEGEND</span>
        <div className={styles.legendList}>
          {LEGEND.map((item) => (
            <div key={item.color} className={styles.legendItem}>
              <span className={styles.swatch} style={{ backgroundColor: item.color }} />
              <span className={styles.offenseLabel}>{item.offense}</span>
              <span className={styles.pct}>{item.pct} <span className={styles.count}>({item.count})</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.cell} ${styles.cellYears}`}>
        <span className={styles.heading}>YEAR NOTES</span>
        <div className={styles.yearBlock}>
          <span className={styles.yearLabel}>DATA COLLECTED</span>
          <span className={styles.yearValue}>{DATA_YEARS}</span>
        </div>
        <div className={styles.yearBlock}>
          <span className={styles.yearLabel}>GAPS — NO DATA</span>
          <span className={styles.yearValue}>{GAP_YEARS}</span>
        </div>
      </div>
    </div>
  )
}
