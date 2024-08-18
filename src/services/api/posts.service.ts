import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public createPost(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/posts/create`, data)
  }

  public getPostsByDesigner(): Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-by-designer`)
  }
}
