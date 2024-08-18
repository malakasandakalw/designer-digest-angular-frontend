import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
  standalone: true,
  imports: [
    NzDropDownModule,
    NzButtonModule,
    CommonModule,
    NzAvatarModule,
    NzIconModule
  ]
})
export class MainNavbarComponent {

  currentUser: User | null = null
  isLoggedIn: boolean = false

  constructor(
    private apiAuthService: ApiAuthService,
    private router: Router
  ) {
    if(apiAuthService.isAuthenticated()) {
      this.verification()
      this.currentUser = this.apiAuthService.getCurrentUser().user
      console.log(this.currentUser)
    } else {
      this.logOut()
    }
  }

  async verification() {
    const response = await this.apiAuthService.tokenAuthenticator()
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
