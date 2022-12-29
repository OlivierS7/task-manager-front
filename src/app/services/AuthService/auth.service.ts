import { Injectable } from '@angular/core';
import { WebRequestService } from '../WebService/web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService, private router: Router) { }

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
    console.log("logged OUT");
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setRefreshToken(refreshToken: string) {
    return localStorage.setItem('x-refresh-token', refreshToken);
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('access-token', accessToken)
    localStorage.setItem('refresh-token', refreshToken)
  }

  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }
}
