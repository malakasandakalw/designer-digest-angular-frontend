import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  protected readonly API_BASE_URL = "/api/v1";
  protected readonly AUTH_API_BASE_URL = "/secure";
}
