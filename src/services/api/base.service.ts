import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
export interface IServerResponse<T> {
  done: boolean;
  title?: string;
  message?: string;
  body: T;
  status: string
}
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  protected readonly API_BASE_URL = "/api";
  // protected readonly AUTH_API_BASE_URL = "/api/secure/users";

  protected _post<T>(http: HttpClient, url: string, data?: any, options?: any): Promise<IServerResponse<T>> | any {
    return lastValueFrom(http.post<IServerResponse<T>>(url, data || null, options));
  }

  protected _get<T>(http: HttpClient, url: string): Promise<IServerResponse<T>> {
    return lastValueFrom(http.get<IServerResponse<T>>(url));
  }

  protected _put<T>(http: HttpClient, url: string, data?: any): Promise<IServerResponse<T>> {
    return lastValueFrom(http.put<IServerResponse<T>>(url, data || null));
  }

  protected _delete<T>(http: HttpClient, url: string): Promise<IServerResponse<T>> {
    return lastValueFrom(http.delete<IServerResponse<T>>(url));
  }
}
