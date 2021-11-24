import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root', 
})
export class AuthService implements HttpInterceptor {
  constructor(private restService: RestClientService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.restService.authToken;

    let newHeaders = req.headers;

    if (token) newHeaders = newHeaders.append('authorization', token);

    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }
}
