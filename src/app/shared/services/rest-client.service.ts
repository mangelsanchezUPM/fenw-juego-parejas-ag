import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record.model';
import { environment } from 'src/environments/environment';
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
}
