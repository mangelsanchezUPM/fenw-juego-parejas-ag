import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class TokenInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('authToken');
    
        let newHeaders = req.headers;
    
        if (token) newHeaders = newHeaders.append(environment.authTokenHeader, token);
    
        const authReq = req.clone({ headers: newHeaders });
        return next.handle(authReq);
      }
}