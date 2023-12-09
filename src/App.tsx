import WordsList from './components/WordsList';
import Suggestions from './components/Suggestions';

import styles from './App.module.css';

const App: preact.FunctionalComponent = () => {
  return (
    <main class={styles.pageContainer}>
      <h1 class={styles.pageTitle}>
        5 БУКВ
      </h1>

      <div class={styles.mainContentWrapper}>
        <WordsList />

        <Suggestions />
      </div>
    </main>
  );
};

export default App;
