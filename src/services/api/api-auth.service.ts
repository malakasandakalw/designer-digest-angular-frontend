import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface userSignupRequestData{
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
    private http: HttpClient
  ) {
    super();
  }

  public signup(data: userSignupRequestData): Promise<any> {
    return lastValueFrom(this.http.post<any>(`${this.API_BASE_URL}/users/signup`, data))
  }

}
