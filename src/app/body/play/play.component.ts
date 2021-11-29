import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/shared/models/card.model';
import { Game } from 'src/app/shared/models/game.model';
import { Record } from 'src/app/shared/models/record.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { RestClientService } from 'src/app/shared/services/rest-client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  cardsNumber: number = 20;
  disposedTime: number = 0;

  board: Card[] = [];
  score: number = 0;
  totalScore: number = 0;
  timer: number = 0;
  reversoImgPath: string = '../../assets/naipes/reverso.jpg';

  gameOver: boolean = false;
  logged: boolean = false;
  scoreSaved: boolean = false;
  selectedCardIndex: number | undefined;

  private timerInterval: any;
  private waitTurn: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private restClient: RestClientService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    const cardsNumberString: string =
      localStorage.getItem(environment.cardsNumber) || '20';
    const timeLimitString: string =
      localStorage.getItem(environment.timeLimit) || '0';

    this.cardsNumber = parseInt(cardsNumberString);
    this.disposedTime = parseInt(timeLimitString);

    this.initializeBoard();
    this.initializeTimer();
    this.logged = this.loginService.getUsername() ? true : false;
  }

  private initializeBoard() {
    this.board = [];
    this.score = 0;
    this.scoreSaved = false;
    this.totalScore = this.getExtraScore();
    for (let i = 0; i < this.cardsNumber / 2; i++) {
      let cardValue = Math.floor(Math.random() * (8 - 1)) + 1;
      this.board.push(new Card(cardValue), new Card(cardValue));
    }
    this.board.sort(() => Math.random() - 0.5);
  }

  private initializeTimer() {
    this.timer = this.disposedTime;
    if (this.timer > 0)
      this.timerInterval = setInterval(() => this.resumeTimer(), 1000);
  }

  selectCard(index: number) {
    debugger;
    if (this.waitTurn) return;

    const cardSelected = this.board[index];

    if (cardSelected.shown) return;
    cardSelected.shown = true;
    if (this.selectedCardIndex == undefined) {
      this.selectedCardIndex = index;
    } else {
      const previousSelectedCard: Card = this.board[this.selectedCardIndex];
      if (previousSelectedCard.value == cardSelected.value) {
        this.score += 15;
        this.totalScore = this.score + this.getExtraScore();
        this.selectedCardIndex = undefined;
        if (this.board.every((card: Card) => card.shown == true))
          this.isGameOver();
      } else {
        this.waitTurn = true;
        this.score -= 5;
        this.totalScore = this.score + this.getExtraScore();
        setTimeout(() => {
          previousSelectedCard.shown = false;
          cardSelected.shown = false;
          this.selectedCardIndex = undefined;
          this.waitTurn = false;
        }, 500);
      }
    }
  }

  private resumeTimer() {
    this.timer -= 1;
    if (this.timer == 0 && this.timerInterval) this.isGameOver();
  }

  private getExtraScore() {
    let extraPoints = 0;
    switch (this.cardsNumber) {
      case 26:
        extraPoints += 25;
        break;
      case 32:
        extraPoints += 50;
        break;
      default:
        extraPoints += 0;
        break;
    }
    switch (this.disposedTime) {
      case 60:
        extraPoints += 100;
        break;
      case 90:
        extraPoints += 75;
        break;
      case 120:
        extraPoints += 50;
        break;
      case 150:
        extraPoints += 25;
        break;
      default:
        extraPoints += 0;
    }
    return extraPoints;
  }

  isGameOver() {
    clearInterval(this.timerInterval);
    this.gameOver = true;
  }

  finishGame() {
    this.router.navigateByUrl('');
  }

  restartGame() {
    this.gameOver = false;
    this.initializeBoard();
    this.initializeTimer();
  }

  saveScore() {
    const userRecord = new Record(
      this.totalScore,
      this.cardsNumber,
      this.disposedTime
    );
    this.restClient.saveUserRecord(userRecord).subscribe(
      () => {
        this.scoreSaved = true;
        this.toastService.success(
          'Puntuación total guardada con éxito',
          'Puntuación guardada'
        );
      },
      (err) => this.toastService.error(err, 'Error al guardar partida')
    );
  }

  saveGame() {
    const game = new Game(
      this.board,
      this.score,
      this.totalScore,
      this.cardsNumber,
      this.timer,
      this.disposedTime,
      this.selectedCardIndex
    );

    this.restClient.saveGame(game).subscribe(
      () =>
        this.toastService.success(
          'Partida guardada con éxito',
          'Partida Guardada'
        ),
      (err) =>
        this.toastService.error(
          'La partida no ha podido ser guardada',
          'Error al Guardar Partida'
        )
    );
  }

  loadGame() {
    this.restClient.loadGame().subscribe(
      (game: Game) => {
        this.toastService.success(
          'Partida cargada con éxito',
          'Partida Cargada'
        );
        this.board = game.board;
        this.score = game.score;
        this.totalScore = game.totalScore;
        this.timer = game.currentTime;
        this.disposedTime = game.disposedTime;
        this.cardsNumber = game.cardsNumber;
        this.selectedCardIndex = game.selectedCardIndex;
      },
      (err) =>
        this.toastService.error(
          'La partida no ha podido ser cargada',
          'Error al Cargar Partida'
        )
    );
  }
}
