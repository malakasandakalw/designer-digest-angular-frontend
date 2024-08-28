import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { toQueryString } from 'src/app/common/utils/queryParams';

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

  public getDesignerDataById(designer_id: string, user_id: string | null): Promise<IServerResponse<any>> {
    const params = toQueryString({designer_id, user_id})
    return this._get(this.http, `${this.API_BASE_URL}/designers/get-data-by-designer${params}`)
  }

  public getFilteredDesigners(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/designers/get-filtered-designers${params}`)
  }

  public follow(designer_id: string): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/designers/follow`, {designer_id})
  }

}
