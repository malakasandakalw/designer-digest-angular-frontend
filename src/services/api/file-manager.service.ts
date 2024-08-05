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
    console.log(files)
    return this._post(this.http, `${this.API_BASE_URL}/file-manager/upload`, {files: files})
  }

  // public uploadFiles(file: File) {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   const headers = new HttpHeaders();
  //   const req = new HttpRequest('POST', `${this.API_BASE_URL}/file-manager/upload`, formData, {
  //     headers: headers,
  //     reportProgress: true,
  //   });

  //   return this.http.request(req).pipe(
  //     map(event => {
  //       switch (event.type) {
  //         case HttpEventType.UploadProgress:
  //           const progress = Math.round((100 * event.loaded) / (event.total || 1));
  //           return { status: 'progress', message: progress };
  //         case HttpEventType.Response:
  //           return { status: 'completed', message: event.body };
  //         default:
  //           return `Unhandled event: ${event.type}`;
  //       }
  //     })
  //   );
  // }

  private getEventMessage(event: HttpEvent<any>) {
    switch(event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
      case HttpEventType.Response:
        return event.body;
      default:
        return `upload event: ${event.type}`
    }
  }

  private fileUploadProgress(e: any) {
    const percentDone = Math.round(100 * e.loaded / e.total);
    return {progress: percentDone, files: []};
  }

}
