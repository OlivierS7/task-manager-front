import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Handle the request
    request = this.addAuthHeader(request)
    // Call next and handle the response
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err)
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const accessToken = this.authService.getAccessToken()
    if(accessToken) {
      return request.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      })
    }
    return request
  }
}
