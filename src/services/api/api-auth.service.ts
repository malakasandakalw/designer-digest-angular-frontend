import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';

export interface userSignupRequestData {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService extends BaseService {
  public currentUser: any;

  constructor(
    private http: HttpClient
  ) {
    super();
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    console.log(this.currentUser);
  }

  public signup(data: userSignupRequestData): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.API_BASE_URL}/users/signup`, data))
  }

  public login(email: string, password: string) {
    return this._post(this.http, `${this.API_BASE_URL}/users/login`, { email, password })
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  public isDesigner(): boolean {
    console.log(this.currentUser);
    return this.currentUser.user.role === "Designer"
  }

}
