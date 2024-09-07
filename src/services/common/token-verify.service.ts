import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiAuthService } from '../api/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenVerifyService implements CanActivate {

  constructor(
    private apiAuthService: ApiAuthService,
    private router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const result = await this.apiAuthService.tokenAuthenticator();
    // console.log('result', result.verified)
    if(result) {
      if(result.verified) {
        if(result.verified === true) {
          return true;
        }
      }
    }
    return false
  }
}
