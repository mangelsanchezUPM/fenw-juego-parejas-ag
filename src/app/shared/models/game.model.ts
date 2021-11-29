import { Card } from './card.model';

export class Game {
  board: Card[];
  score: number;
  totalScore: number;
  disposedTime: number;
  currentTime: number;
  cardsNumber: number;
  selectedCardIndex: number | undefined;

  constructor(
    board: Card[],
    score: number,
    totalScore: number,
    cardsNumber: number,
    currentTime: number,
    disposedtime: number,
    selectedCardIndex: number | undefined
  ) {
    this.board = board;
    this.score = score;
    this.totalScore = totalScore;
    this.cardsNumber = cardsNumber;
    this.currentTime = currentTime;
    this.disposedTime = disposedtime;
    this.selectedCardIndex = selectedCardIndex;
  }
}
