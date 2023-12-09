import { signal, computed } from '@preact/signals';

import { CharStatusENUM, WordType } from './App.types';
import findWords from './utils/findWords';

const DEFAULT_INITIAL_WORD='океан';

const firstWord: WordType = {
  id: 1,
  isActive: true,
  chars: DEFAULT_INITIAL_WORD.split('').map((char) => ({ char, status: CharStatusENUM.unknown })),
};

const privateHistory = signal([firstWord]);

export const history = computed(() => {
  return privateHistory.value;
});

export const canAddWord = computed(() => {
  if (!suggestedWords.value.length) {
    return false;
  }
  const activeWordIndex = privateHistory.value.findIndex((word) => word.isActive);
  const unknownStatus = privateHistory.value[activeWordIndex].chars.find(({ status }) => status === CharStatusENUM.unknown);
  return !unknownStatus;
});

export const addWord = () => {
  if (!canAddWord.value || !suggestedWords.value.length) {
    console.error('Failed to add a word');

    return;
  }
  const newHistory = [...privateHistory.value];
  const activeWordIndex = newHistory.findIndex((word) => word.isActive);
  newHistory[activeWordIndex].isActive = false;

  newHistory.push({
    chars: [
      { char: '', status: CharStatusENUM.unknown },
      { char: '', status: CharStatusENUM.unknown },
      { char: '', status: CharStatusENUM.unknown },
      { char: '', status: CharStatusENUM.unknown },
      { char: '', status: CharStatusENUM.unknown },
    ],
    id: newHistory.length + 1,
    isActive: true,
  });
  privateHistory.value = newHistory;
};

export const setWord = (word: string) => {
  const newHistory = [...privateHistory.value];
  const activeWordIndex = newHistory.findIndex((word) => word.isActive);

  newHistory[activeWordIndex].chars = word.split('').map((char) => ({ char, status: CharStatusENUM.unknown }));

  privateHistory.value = newHistory;
};

export const changeCharStatus = (data: {
  charIndex: number;
  status: CharStatusENUM;
}) => {
  const activeWordIndex = privateHistory.value.findIndex((word) => word.isActive);
  const newHistory = [...privateHistory.value];
  newHistory[activeWordIndex].chars[data.charIndex].status = data.status;
  privateHistory.value = newHistory;
};

export const suggestedWords = computed<string[]>(() => {
  const containsList: string[] = [];
  const notList: string[] = [];
  const matchList: Array<{ not: string[]; is: string }> = [
    { not: [], is: '' },
    { not: [], is: '' },
    { not: [], is: '' },
    { not: [], is: '' },
    { not: [], is: '' },
  ];

  privateHistory.value.forEach((word) => {
    word.chars.forEach(({ char, status }, index) => {
      switch (status) {
        case CharStatusENUM.correct:
          matchList[index].is = char;
          break;

        case CharStatusENUM.wrong:
          notList.push(char);
          break;

        case CharStatusENUM.wrongPlace:
          containsList.push(char);
          matchList[index].not.push(char);
          break;

        default:
          break;
      }
    });
  });

  const matchString = matchList.map(({ not, is }) => {
    if (is) {
      return is;
    }
    if (!not.length) {
      return '.';
    }

    return `[^${not.join('')}]`;
  }).join('');
  const match = new RegExp(matchString, 'i');

  const wordsList = findWords({
    not: notList.join('').toLocaleLowerCase(),
    contains: containsList.join('').toLocaleLowerCase(),
    match,
  })

  return wordsList;
});
