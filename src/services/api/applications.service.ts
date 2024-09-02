import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService  extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public createApplication(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/applications/create`, data)
  }

  public updateApplication(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/applications/update`, data)
  }

  
}
