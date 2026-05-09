import { Analytics } from '@vercel/analytics/react'
import { MetaRow } from './components/MetaRow'
import { GenerativeCanvas } from './components/GenerativeCanvas'
import { DataStreamRow } from './components/DataStreamRow'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.appFrame}>
      <MetaRow />
      <GenerativeCanvas />
      <DataStreamRow />
      <Analytics />
    </div>
  )
}

export default App
