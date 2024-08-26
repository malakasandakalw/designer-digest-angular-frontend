import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DesignerService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getAllDesigners(): Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/designers/get-all-designers`)
  }

}
