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
  private AUTHORIZATION_HEADER = 'Authorization';
  private _authToken = '';

  constructor(private http: HttpClient) {}

  set authToken(authToken: string) {
    this._authToken = authToken;
  }
  
  userLogin(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    this.http
      .get<HttpResponse<any>>(this.BASE_URL + '/users/login', {
        params,
        observe: 'response',
      })
      .subscribe((response: HttpResponse<any>) => {
        if (response.ok)
          this.authToken =
            response.headers.get(this.AUTHORIZATION_HEADER) || '';
      });
  }

  getRecords() {
    return this.http.get<Record[]>(this.BASE_URL + '/records');
  }
}
