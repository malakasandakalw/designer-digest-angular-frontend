import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { toQueryString } from 'src/app/common/utils/queryParams';

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

  public updatePost(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/posts/update`, data)
  }

  public deletePost(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/posts/delete`, data)
  }

  public getPosts(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-posts${params}`)
  }

  public getPostsByDesigner(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-by-designer${params}`)
  }

  public getPostsByDesignerId(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-by-designer-id${params}`)
  }

  public getPostById(post_id: string): Promise<IServerResponse<any>> {
    const params = toQueryString({post_id})
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-by-id${params}`)
  }

  public getFullPostById(post_id: string, user_id: string | null): Promise<IServerResponse<any>> {
    const params = toQueryString({post_id, user_id: user_id ? user_id : null})
    return this._get(this.http, `${this.API_BASE_URL}/posts/get-full-by-id${params}`)
  }


  public triggerUpvote(post_id: string): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/posts/upvote`, {post_id})
  }

}
