import Word from './Word';

import styles from './WordsList.module.css';
import { addWord, canAddWord, history } from '../App.state';

const WordsList: preact.FunctionalComponent = () => {
  return (
    <section class={styles.wordsListContainer}>
      {history.value.map((word) => (
        <Word
          key={word.id}
          word={word}
        />
      ))}

      <button
        class={styles.addButton}
        disabled={!canAddWord.value}
        onClick={addWord}
      >
        Следующее слово
      </button>
    </section>
  );
};

export default WordsList;
