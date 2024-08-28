import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { toQueryString } from 'src/app/common/utils/queryParams';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getAllCategories(): Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/category/all`)
  }

  public getCategory(id: string): Promise<IServerResponse<any>> {
    const q = toQueryString({id})
    return this._get(this.http, `${this.API_BASE_URL}/category/get-by-id${q}`)
  }

}
