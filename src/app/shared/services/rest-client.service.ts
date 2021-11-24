import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  private BASE_URL = 'http://fenw.etsisi.upm.es:10000';
  private _authToken = '';
  private _username = '';

  constructor(private http: HttpClient) {}

  get authToken() {
    return this._authToken;
  }
  set authToken(authToken: string) {
    this._authToken = authToken;
  }
  get username() {
    return this._username;
  }
  set username(username: string) {
    this._username = username;
  }

  userLogin(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get<HttpResponse<any>>(this.BASE_URL + '/users/login', {
      params,
      observe: 'response',
    });
  }

  getRecords() {
    return this.http.get<Record[]>(this.BASE_URL + '/records');
  }
  logout() {
    this._username = '';
    this._authToken = '';
  }
}
