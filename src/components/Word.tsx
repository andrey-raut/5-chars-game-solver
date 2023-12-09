import Char from './Char';

import styles from './Word.module.css';
import { WordType } from '../App.types';

const Word: preact.FunctionalComponent<{
  word: WordType;
}> = (props) => {

  return (
    <ul class={styles.wordContainer}>
      {props.word.chars.map((char, index) => (
        <Char
          key={index}
          char={char}
          index={index}
          disabled={!props.word.isActive}
        />
      ))}
    </ul>
  );
};

export default Word;
