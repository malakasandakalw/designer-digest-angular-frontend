import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

interface CreatePostData {
  title: string,
  categories: string[],
  files: File[]
}

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public createPost(data: CreatePostData): Promise<IServerResponse<any>> {
    console.log('create post', data)
    return this._post(this.http, `${this.API_BASE_URL}/posts/create`, {title: data.title, categories: data.categories, files: data.files})
  }
}
