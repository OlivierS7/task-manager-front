import { Injectable } from '@angular/core';
import { WebRequestService } from '../WebService/web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';

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
        this.setSession(res.body._id, res.body.firstName, res.body.lastName, res.body.email, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
      })
    )
  }

  logout() {
    this.removeSession()
  }

  verifyLogin(email: string, password: string) {
    return this.webRequestService.verifyLogin(email, password)
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.webRequestService.signup(firstName, lastName, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // Auth tokens will be in the header of this response
        this.setSession(res.body._id, firstName, lastName, email, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
      })
    )
  }

  async patchUser(user: User) {
    await this.setFirstName(user.firstName)
    await this.setLastName(user.lastName)
    await this.setEmail(user.email)
    return await this.webRequestService.patch(`users`, user)
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

  getFirstName(): string {
    return localStorage.getItem('first-name') || '';
  }

  setFirstName(firstName: string) {
    return localStorage.setItem('first-name', firstName);
  }

  getLastName(): string {
    return localStorage.getItem('last-name') || '';
  }

  setLastName(lastName: string) {
    return localStorage.setItem('last-name', lastName);
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }

  setEmail(email: string) {
    return localStorage.setItem('email', email);
  }

  private setSession(userId: string, firstName: string, lastName: string, email: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId)
    localStorage.setItem('first-name', firstName)
    localStorage.setItem('last-name', lastName)
    localStorage.setItem('email', email)
    localStorage.setItem('x-access-token', accessToken)
    localStorage.setItem('x-refresh-token', refreshToken)
  }

  private removeSession() {
    localStorage.removeItem('user-id')
    localStorage.removeItem('first-name')
    localStorage.removeItem('last-name')
    localStorage.removeItem('email')
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
