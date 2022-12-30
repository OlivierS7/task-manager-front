import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  private refreshingAccessToken!: boolean

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Handle the request
    request = this.addAuthHeader(request)
    // Call next and handle the response
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401 && !this.refreshingAccessToken) {
          // Unauthorized (401)
          // Refresh access token
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request)
              return next.handle(request)
            }),
            catchError((err: any) => {
              this.authService.logout()
              this.authService.redirectToLogin()
              // Return an empty Observable
              return EMPTY
            })
          ) 
        }
        return throwError(() => err)
      })
    )
  }

  refreshAccessToken() {
    this.refreshingAccessToken = true
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false
        console.log("Access token refreshed");
        
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
