import styles from "./page.module.css";

// components
import Hello from "./components/Hello.js";
import NewConcept from "./components/NewConcept.js";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>My React App hehe</h1>
        <Hello />
        <NewConcept irrelevantProp="unused because of destructuring" concept="passing props to a React component" />
        <NewConcept concept="how easy it is to reuse components I've already made" />
        <NewConcept concept="ask me tomorrow and I'll already have forgotten" />
      </main>
    </div>
  );
}
