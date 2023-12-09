import fullList from './wordsList.json';

type WordsFilterType = {
  not: string;
  contains: string;
  match: RegExp;
}

const findWords = ({ not, contains, match }: WordsFilterType) => {
  const notRegExp = new RegExp(not.split('').join('|'));

  const matchedWords = fullList.filter((word) => {
    let isContains = true;
    contains.split('').forEach((char) => {
      if (!word.includes(char)) {
        isContains = false;
      }
    });

    if (
      (not ? !notRegExp.test(word) : true) &&
      (match ? match.test(word) : true) &&
      isContains
    ) {
      return true;
    }
    return false;
  });

  return matchedWords;
};

export default findWords;
