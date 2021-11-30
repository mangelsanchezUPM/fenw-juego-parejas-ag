import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class TokenInterceptor implements HttpInterceptor {
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
          const newAuthToken: string | null = event.headers.get(
            environment.authTokenHeader
          );
          if (newAuthToken)
            sessionStorage.setItem(environment.authToken, newAuthToken);
          console.log(token == newAuthToken)
        }
        return event;
      })
    );
  }
}
