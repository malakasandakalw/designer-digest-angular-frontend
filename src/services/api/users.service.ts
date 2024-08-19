import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { toQueryString } from 'src/app/common/utils/queryParams';

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

  public getById(id: string): Promise<IServerResponse<any>> {
    const q = toQueryString({receiverId: id})
    return this._get(this.http, `${this.API_BASE_URL}/users/get-by-id${q}`)
  }

}
