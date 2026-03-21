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
    </div>
  )
}

export default App
