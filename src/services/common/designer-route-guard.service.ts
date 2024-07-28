import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiAuthService } from '../api/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DesignerRouteGuardService implements CanActivate {

  constructor(
    private apiAuthService: ApiAuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.apiAuthService.isDesigner()) {
      return true
    } else {
      return false;
    }
  }

}
