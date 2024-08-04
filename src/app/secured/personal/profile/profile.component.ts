import { Component } from '@angular/core';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: User | null = null

  constructor(
    private apiAuthService: ApiAuthService
  ) {
    this.currentUser = this.apiAuthService.currentUser;
  }

}
