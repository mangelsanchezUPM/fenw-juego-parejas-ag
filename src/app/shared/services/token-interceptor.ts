import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private loginService: LoginService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(environment.authToken);
    let newHeaders = req.headers;
    if (token)
      newHeaders = newHeaders.append(environment.authTokenHeader, token);
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status == 200) {
            const newAuthToken: string | null = event.headers.get(
              environment.authTokenHeader
            );
            if (newAuthToken)
              sessionStorage.setItem(environment.authToken, newAuthToken);
          }
        }
        return event;
      })
    );
  }
}
