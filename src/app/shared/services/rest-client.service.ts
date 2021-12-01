import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';
import { Record } from '../models/record.model';
import { User } from '../models/user.model';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) {}

  getRecords() {
    return this.http.get<Record[]>(environment.baseUrl + '/records');
  }
  getUserRecords() {
    return this.http
      .get<Record[]>(
        environment.baseUrl + '/records/' + this.loginService.username
      )
      .pipe(catchError((err) => this.loginService.invalidateToken(err)));
  }
  saveUserRecord(record: Record) {
    return this.http
      .post(environment.baseUrl + '/records', record)
      .pipe(catchError(this.loginService.invalidateToken));
  }
  deleteUserRecords() {
    return this.http
      .delete(environment.baseUrl + '/records')
      .pipe(catchError(this.loginService.invalidateToken));
  }
  signupUser(user: User) {
    return this.http.post(environment.baseUrl + '/users', user);
  }
  saveGame(game: Game) {
    return this.http
      .post(environment.baseUrl + '/games', game)
      .pipe(catchError(this.loginService.invalidateToken));
  }
  loadGame() {
    return this.http.get<string>(environment.baseUrl + '/games').pipe(
      catchError(this.loginService.invalidateToken),
      map((response) => JSON.parse(response) as Game)
    );
  }
}
