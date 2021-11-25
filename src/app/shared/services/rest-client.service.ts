import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Record } from '../models/record.model';
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
  signupUser(username: string, email: string, password: string) {
    const signupBody = { username: username, email: email, password: password };
    return this.http.post(environment.baseUrl + '/users', signupBody);
  }
}
