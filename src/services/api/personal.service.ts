import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalService  extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public convertToDesignerProfile(): Promise<IServerResponse<any>> {

    const result = this._post(this.http, `${this.API_BASE_URL}/personal/convert-to-designer`)

    return result
  }
}
