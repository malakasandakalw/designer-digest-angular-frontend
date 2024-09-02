import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';

export interface UpdatePersonalProfileData {
  first_name: string,
  last_name: string,
  profile_picture: string,
  phone: string
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public updateProfile(data: UpdatePersonalProfileData): Promise<IServerResponse<any>> {
    const result = this._post(this.http, `${this.API_BASE_URL}/personal/update-profile-data`, data)
    return result
  }

  public convertToDesignerProfile(location: string, categories: string[]): Promise<IServerResponse<any>> {
    const result = this._post(this.http, `${this.API_BASE_URL}/personal/convert-to-designer`, { location, categories: categories })
    return result
  }

  public convertToEmployerProfile(): Promise<IServerResponse<any>> {
    const result = this._post(this.http, `${this.API_BASE_URL}/personal/convert-to-employer`)
    return result
  }

}
