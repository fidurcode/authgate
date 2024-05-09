import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly endpoint: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    console.log('registered user', user);
    return this.http.post<User>(`${this.endpoint}auth/register`, {username: user.username, password: user.password, email: user.email})
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.endpoint}auth/login`, {username: user.username, password: user.password})
  }
}
