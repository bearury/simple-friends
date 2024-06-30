import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "./types";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://parseapi.back4app.com/';
  applicationId = 'ObG3j2IT0fkm19FA3Mv8wB8Zni1ZhtfaPuplu9ZR';
  restApiKey = 'RETMLnyhBwSQ0qV5r6MMZzNbjuGwjxEzmstAUtmU';

  baseHeaders = {
    'X-Parse-Application-Id': this.applicationId,
    'X-Parse-REST-API-Key': this.restApiKey,
  };

  http = inject(HttpClient)
  user: UserResponse | null = null

  get isAuth() {
    return !!this.user?.sessionToken
  }

  login({email, password}: { email: string, password: string }) {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, {email, password}, {
      headers: this.baseHeaders
    }).pipe(tap(data => this.user = data))
  }

  checkAuth(token: string) {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.baseHeaders,
        'X-Parse-Session-Token': token
      }
    }).pipe(tap(data => this.user = data))
  }
}
