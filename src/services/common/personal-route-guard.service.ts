import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiAuthService } from '../api/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalRouteGuardService implements CanActivate {

  constructor(
    private apiAuthService: ApiAuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.apiAuthService.isPersonal()) {
      return true
    } else {
      this.apiAuthService.logout()
      return false;
    }
  }
}
