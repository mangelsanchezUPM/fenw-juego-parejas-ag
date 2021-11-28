import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';
import { Record } from '../models/record.model';
import { User } from '../models/user.model';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getRecords() {
    return this.http.get<Record[]>(environment.baseUrl + '/records');
  }
  getUserRecords() {
    return this.http.get<Record[]>(
      environment.baseUrl + '/records/' + this.loginService.getUsername()
    );
  }
  saveUserRecord(record: Record) {
    return this.http.post(environment.baseUrl + '/records/', record);
  }
  signupUser(user: User) {
    return this.http.post(environment.baseUrl + '/users', user);
  }
  saveGame(game: Game) {
    return this.http.post(environment.baseUrl + '/games', game);
  }
  loadGame() {
    return this.http.get<Game>(environment.baseUrl + '/games');
  }
}
