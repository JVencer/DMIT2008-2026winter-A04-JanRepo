import styles from "./page.module.css";

// components
import SimpsonsCharacters from './components/SimpsonsCharacters'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SimpsonsCharacters />
      </main>
    </div>
  );
}
