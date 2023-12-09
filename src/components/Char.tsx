import styles from './Char.module.css';
import classNames from '../utils/classNames';
import { CharStatusENUM, CharType } from '../App.types';
import { changeCharStatus } from '../App.state';

const statuses = [
  CharStatusENUM.unknown,
  CharStatusENUM.correct,
  CharStatusENUM.wrongPlace,
  CharStatusENUM.wrong,
];

const Char: preact.FunctionalComponent<{
  char: CharType;
  disabled: boolean;
  index: number;
}> = (props) => {
  const handleCharClick = () => {
    const oldStatusIndex = statuses.findIndex((i) => i === props.char.status)!;
    let newStatus: CharStatusENUM;

    if (oldStatusIndex === statuses.length - 1) {
      newStatus = statuses[0];
    } else {
      newStatus = statuses[oldStatusIndex + 1];
    }

    changeCharStatus({
      charIndex: props.index,
      status: newStatus
    })
  };

  return (
    <li
      class={classNames(styles.charContainer, {
        [styles.charContainer_disabled]: props.disabled || !props.char.char,
        [styles.charContainer_correct]: props.char.status === CharStatusENUM.correct,
        [styles.charContainer_wrongPlace]: props.char.status === CharStatusENUM.wrongPlace,
        [styles.charContainer_wrong]: props.char.status === CharStatusENUM.wrong,
      })}
      onClick={handleCharClick}
    >
      {props.char.char}
    </li>
  );
};

export default Char;
