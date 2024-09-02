import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toQueryString } from 'src/app/common/utils/queryParams';
import { BaseService, IServerResponse } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService  extends BaseService  {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public createVacancy(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/vacancy/create`, data)
  }
  
  public updateVacancy(data: any): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/vacancy/update`, data)
  }

  public getFilteredVacancies(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/vacancy/get-filtered-vacancies${params}`)
  }

  public getVacancies(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/vacancy/get-vacancies${params}`)
  }

  public getByEmployer(filterData: any): Promise<IServerResponse<any>> {
    const params = toQueryString(filterData)
    return this._get(this.http, `${this.API_BASE_URL}/vacancy/get-vacancies-by-employer${params}`)
  }

  public getById(id: string, userId: string | null): Promise<IServerResponse<any>> {
    const params = toQueryString({id,userId})
    return this._get(this.http, `${this.API_BASE_URL}/vacancy/get-by-id${params}`)
  }

  public getFullById(id: string): Promise<IServerResponse<any>> {
    const params = toQueryString({id})
    return this._get(this.http, `${this.API_BASE_URL}/vacancy/get-full-by-id${params}`)
  }
  
  

}
