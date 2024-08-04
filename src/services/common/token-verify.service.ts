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
    console.log(result);
    return true;
    // if() {
    //   return true
    // } else {
    //   this.apiAuthService.logout()
    //   this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
    //   return false;
    // }
  }
}
