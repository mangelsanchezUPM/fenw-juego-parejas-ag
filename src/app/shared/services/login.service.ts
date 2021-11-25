import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username$: BehaviorSubject<string> = new BehaviorSubject(
    sessionStorage.getItem('username') || ''
  );

  constructor(private http: HttpClient) {}

  userLogin(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
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
  getUsername() {
    return this.username$.getValue();
  }
}
