export class Record {
  punctuation: number;
  cards: number;
  disposedTime: number;
  username?: string;
  recordDate?: number;

  constructor(
    punctuation: number,
    cards: number,
    disposedTime: number,
    username?: string,
    recordDate?: number,
  ) {
    this.punctuation = punctuation;
    this.cards = cards;
    this.disposedTime = disposedTime;
    this.username = username;
    this.recordDate = recordDate;
  }
}
