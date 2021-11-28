import { Card } from './card.model';

export class Game {
  board: Card[];
  score: number;
  totalScore: number;
  disposedTime: number;
  currentTime: number;
  cardsNumber: number;

  constructor(
    board: Card[],
    score: number,
    totalScore: number,
    cardsNumber: number,
    currentTime: number,
    disposedtime: number
  ) {
    this.board = board;
    this.score = score;
    this.totalScore = totalScore;
    this.cardsNumber = cardsNumber;
    this.currentTime = currentTime;
    this.disposedTime = disposedtime;
  }
}
