import { Injectable } from '@angular/core';
import { WebRequestService } from '../WebService/web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
      })
    )
  }

  logout() {
    this.removeSession()
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.webRequestService.signup(firstName, lastName, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
        console.log("signed up");
        
      })
    )
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login')
    this.toastr.error(
      '', `Please, connect to your account!`, {
        closeButton: true,
        timeOut: 20000,
        positionClass: 'toast-top-right',
      })
  }

  getAccessToken(): string {
    return localStorage.getItem('x-access-token') || '';
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken(): string {
    return localStorage.getItem('x-refresh-token') || '';
  }

  setRefreshToken(refreshToken: string) {
    return localStorage.setItem('x-refresh-token', refreshToken);
  }

  getUserId(): string {
    return localStorage.getItem('user-id') || '';
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('x-access-token', accessToken)
    localStorage.setItem('x-refresh-token', refreshToken)
  }

  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-refresh-token')
  }

  getNewAccessToken() {   
    return this.http.get(`${this.webRequestService.ROOT_URL}/users/me/access-token`, { 
      headers: {
      'x-refresh-token': this.getRefreshToken(),
      '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token') as string)
      })
    )
  }
}
