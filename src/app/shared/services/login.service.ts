import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username$: BehaviorSubject<string> = new BehaviorSubject(
    sessionStorage.getItem('username') || ''
  );

  constructor(private http: HttpClient) {}

  userLogin(user: User) {
    const params = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);
    return this.http.get<HttpResponse<any>>(
      environment.baseUrl + '/users/login',
      {
        params,
        observe: 'response',
      }
    );
  }
  userLogout() {
    sessionStorage.clear();
  }
  loginSuccess(username: string, authToken: string) {
    this.username$.next(username);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('authToken', authToken);
  }
  checkUserExists(username: string) {
    return this.http.get<HttpResponse<any>>(
      environment.baseUrl + '/users/' + username,
      {
        observe: 'response',
      }
    );
  }
  get username() {
    return this.username$.getValue();
  }
}
