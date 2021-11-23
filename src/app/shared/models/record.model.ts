export class Record {
  username: string;
  punctuation: number;
  cards: number;
  disposedTime: number;
  recordDate: number;

  constructor(
    username: string,
    punctuation: number,
    cards: number,
    disposedTime: number,
    recordDate: number
  ) {
    this.username = username;
    this.punctuation = punctuation;
    this.cards = cards;
    this.disposedTime = disposedTime;
    this.recordDate = recordDate;
  }
}
