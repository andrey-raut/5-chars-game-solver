export enum CharStatusENUM {
  correct = 'correct',
  wrongPlace = 'wrongPlace',
  wrong = 'wrong',
  unknown = 'unknown',
}

export type CharType = {
  char: string;
  status: CharStatusENUM;
};

export type WordType = {
  chars: CharType[];
  id: number;
  isActive: boolean;
};
