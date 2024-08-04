import { Component } from '@angular/core';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { User } from '../common/interfaces/CommonInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  currentUser: User | null = null
  isLoggedIn: boolean = false

  constructor(
    private apiAuthService: ApiAuthService,
    private router: Router
  ) {
    if(apiAuthService.isAuthenticated()) {
      this.verification()
    } else {
      this.logOut()
    }
  }

  async verification() {
    const response = await this.apiAuthService.tokenAuthenticator()
    console.log(response)
    console.log(response.verified)
    if(response.verified) {
      this.isLoggedIn = true;
    } else {
      this.logOut()
    }
  }

  async logOut() {
    await this.apiAuthService.logout()
  }

}
