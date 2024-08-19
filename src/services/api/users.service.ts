import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getAllUsers(): Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/users/get-all-users`)
  }

}
