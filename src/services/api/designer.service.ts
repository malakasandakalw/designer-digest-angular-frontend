import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DesignerService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public test() {
    console.log('here')
    return this._get(this.http, `${this.API_BASE_URL}/designers`)
  }

}
