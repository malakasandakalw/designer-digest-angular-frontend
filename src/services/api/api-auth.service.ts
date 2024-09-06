import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface userSignupRequestData {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService extends BaseService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    super();
  }

  getCurrentUser(): any {
    const userJson = localStorage.getItem('currentUser');
    if(userJson === 'undefined' || !userJson) return false
    return userJson ? JSON.parse(userJson) : null;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  updateCurrentUserSession(user: any): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.user.first_name = user.first_name,
      currentUser.user.last_name = user.last_name,
      currentUser.user.is_verified = user.is_verified,
      currentUser.user.profile_picture = user.profile_picture,
      currentUser.user.role = user.role
      currentUser.user.phone = user.phone
      this.setCurrentUser(currentUser);
    }
    return true
  }

  updateUserRole(newRole: string): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.user.role = newRole;
      this.setCurrentUser(currentUser);
    }
  }

  public signup(data: userSignupRequestData): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.API_BASE_URL}/users/signup`, data))
  }

  public login(email: string, password: string) {
    return this._post(this.http, `${this.API_BASE_URL}/users/login`, { email, password })
  }

  public resetPassword(current_password: string, new_password: string) {
    return this._post(this.http, `${this.API_BASE_URL}/users/reset-password`, { current_password, new_password })
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/'])
  }

  public tokenAuthenticator() {
    return this._post(this.http, `${this.API_BASE_URL}/users/verify`)
  }

  public isAuthenticated(): boolean {
    console.log(this.getCurrentUser())
    return !!this.getCurrentUser();
  }

  public isDesigner(): boolean {
    const user_ = this.getCurrentUser().user
    return user_.role === "Designer"
  }

  public isPersonal(): boolean {
    const user_ = this.getCurrentUser().user
    return user_.role === "Personal"
  }

  public isEmployer(): boolean {
    const user_ = this.getCurrentUser().user
    return user_.role === "Employer"
  }

}
