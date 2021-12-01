import {
  HttpClient, HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  username$: BehaviorSubject<string> = new BehaviorSubject(
    sessionStorage.getItem('username') || ''
  );

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private router: Router
  ) {}

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
    this.username$.next('');
    this.toastService.success(
      'Se ha cerrado la sesión con éxito',
      'Cierre de sesión'
    );
  }
  loginSuccess(username: string, authToken: string) {
    this.username$.next(username);
    this.toastService.success(
      'Has iniciado sesión con éxito como usuario ' + username,
      'Inicio de sesión'
    );
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
  invalidateToken(err: any): Observable<any> {
    if (err.status == 401 && err.error == 'no valid token') {
      this.router.navigateByUrl('/home');
      this.toastService.warning(
        'El token de autenticación ha expirado',
        'Sesión expirada'
      );
      this.userLogout();
    }
    return of(err);
  }
  get username() {
    return this.username$.getValue();
  }
}
