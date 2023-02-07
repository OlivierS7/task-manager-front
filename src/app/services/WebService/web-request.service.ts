import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000'
   }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload)
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`)
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, { email, password }, { observe: 'response' })
  }

  verifyLogin(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/verify-login`, { email, password }, { observe: 'response' })
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, { firstName, lastName, email, password }, { observe: 'response' })
  }
}
