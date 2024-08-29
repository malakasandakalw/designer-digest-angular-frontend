import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService  extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public uploadFiles(files: { name: string, data: string }[]): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/file-manager/upload`, {files: files})
  }

  public uploadFile(file: { name: string, data: string }): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/file-manager/upload-vacancy-file`, {file: file})
  }

}
