import styles from './Suggestions.module.css';

import { setWord, suggestedWords } from '../App.state';

const Suggestions: preact.FunctionalComponent = () => {
  return (
    <section class={styles.suggestionsContainer}>
      <h3 class={styles.suggestionsTitle}>
        {`Всего вариантов: ${suggestedWords.value.length}`}
      </h3>

      <div class={styles.scrollWrapper}>
        <ul class={styles.scrollContainer}>
          {suggestedWords.value.map((word) => (
            <li key={word} class={styles.suggestionItem} onClick={() => setWord(word)}>
              {word}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Suggestions;
