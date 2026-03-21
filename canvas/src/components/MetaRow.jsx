import styles from './MetaRow.module.css'

export function MetaRow() {
  return (
    <div className={styles.row}>
      <div className={`${styles.cell} ${styles.cell1}`}>
        <span className={styles.title}>THIS IS NOT A GAP</span>
        <span className={styles.subtitle}>FLUID RECORD V02</span>
      </div>
      <div className={`${styles.cell} ${styles.cell2}`}>
        <span className={styles.meta}>SOURCE: FBI UCR 1991–2023</span>
        <span className={styles.meta}>26 YEARS</span>
        <span className={styles.meta}>7 GAPS</span>
      </div>
      <div className={`${styles.cell} ${styles.cell3}`}>
        <p className={styles.prose}>
          A fluid record of anti-Asian violence and racism from data reported to the FBI.
        </p>
      </div>
    </div>
  )
}
