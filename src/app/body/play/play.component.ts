import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/shared/models/card.model';
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
  board: Card[] = [];
  score: number = 0;
  totalScore: number = 0;
  timer: number = 0;
  cardsImagesBasePath: string = '../../assets/naipes/';

  gameOver: boolean = false;
  logged: boolean = false;
  scoreSaved: boolean = false;

  private timerInterval: any;
  private selectedCardIndex: number | undefined;
  private waitTurn: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private restClient: RestClientService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeBoard();
    this.initializeTimer();
    this.logged = this.loginService.getUsername() ? true : false;
  }

  private initializeBoard() {
    const cardsNumberItem: string | null = localStorage.getItem(
      environment.cardsNumber
    );
    this.scoreSaved = false;
    this.board = [];
    this.score = 0;
    this.totalScore = this.getExtraScore();
    let cardsNumber: number = cardsNumberItem ? parseInt(cardsNumberItem) : 20;
    for (let i = 0; i < cardsNumber / 2; i++) {
      let cardValue = Math.floor(Math.random() * (8 - 1)) + 1;
      this.board.push(new Card(cardValue), new Card(cardValue));
    }
    this.board.sort(() => Math.random() - 0.5);
  }

  private initializeTimer() {
    const timeLimitItem: string | null = localStorage.getItem(
      environment.timeLimit
    );
    this.timer = timeLimitItem ? parseInt(timeLimitItem) : 0;
    if (this.timer > 0)
      this.timerInterval = setInterval(() => this.resumeTimer(), 1000);
  }

  selectCard(index: number) {
    if (this.waitTurn) return;

    const cardSelected = this.board[index];

    if (cardSelected.shown) return;

    cardSelected.shown = true;
    document
      .getElementById('img-' + index)
      ?.setAttribute('src', cardSelected.image);

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
        previousSelectedCard.shown = false;
        cardSelected.shown = false;
        this.score -= 5;
        this.totalScore = this.score + this.getExtraScore();
        this.waitTurn = true;
        setTimeout(() => {
          document
            .getElementById('img-' + index)
            ?.setAttribute('src', this.cardsImagesBasePath + 'reverso.jpg');
          document
            .getElementById('img-' + this.selectedCardIndex)
            ?.setAttribute('src', this.cardsImagesBasePath + 'reverso.jpg');
          this.waitTurn = false;
          this.selectedCardIndex = undefined;
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
    const cardsNumber = parseInt(
      localStorage.getItem(environment.cardsNumber)!
    );
    const timeLimit = parseInt(localStorage.getItem(environment.timeLimit)!);
    switch (cardsNumber) {
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
    switch (timeLimit) {
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
    const cards = localStorage.getItem(environment.cardsNumber);
    const disposedTime = localStorage.getItem(environment.timeLimit);

    if (cards && disposedTime) {
      const userRecord = new Record(
        this.totalScore,
        parseInt(cards),
        parseInt(disposedTime)
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
    } else {
      this.toastService.error(
        'Error al obtener los datos para el guardado de partida',
        'Error al guardar partida'
      );
    }
  }
}
