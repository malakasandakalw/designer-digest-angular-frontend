import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SocketService } from 'src/services/socket.service';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription, takeUntil } from 'rxjs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ChatsService } from 'src/services/api/chats.service';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
    NzIconModule,
    NzBadgeModule
  ]
})
export class MainNavbarComponent implements OnInit{

  currentUser: User | null = null
  isLoggedIn: boolean = false
  placement = 'topRight';
  msgSubscription: Subscription | undefined;
  msgReadSubscription: Subscription | undefined;
  unreadMessageCount: string | null = null

  get isDesigner() {
    return this.apiAuthService.isDesigner()
  }

  get isPersonal() {
    return this.apiAuthService.isPersonal()
  }

  get isEmployer() {
    return this.apiAuthService.isEmployer()
  }

  constructor(
    private apiAuthService: ApiAuthService,
    private socketService: SocketService,
    private router: Router,
    private notification: NzNotificationService,
    private chatService: ChatsService
  ) {
    if (apiAuthService.isAuthenticated()) {
      this.verification()
      this.currentUser = this.apiAuthService.getCurrentUser().user
    }
    this.msgSubscription = this.socketService.getNewMessageObservable().subscribe(async (message) => {
      if (message && this.currentUser) {
        if ((message.to_user === this.currentUser.id) && message.id) {
          // this.socketService.sendMessageRead(message.id)
          this.createBasicNotification(message.from_user_name)
          this.getUnreadMessagesCount()
        }
      }
    });
    this.chatService.onRefreshUnreadCount.pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.getUnreadMessagesCount()
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getUnreadMessagesCount();
  }

  createBasicNotification(userName: string): void {
    this.notification.blank(
      ``, `New meessage from "${userName}"`, { nzPlacement: 'topRight' }
    );
  }

  async verification() {
    const response = await this.apiAuthService.tokenAuthenticator()
    if (response.verified) {
      this.isLoggedIn = true;
    }
  }

  async getUnreadMessagesCount() {
    if(!this.currentUser) return
    try {
      const response = await this.chatService.getUnreadMessagesCount()
      if (response) {
        this.unreadMessageCount = response.body
      }
    } catch (error) {
      console.log(error)
    }
  }

  navigateProfile() {
    if(this.isDesigner) {
      this.router.navigate([`/designer-digest/designer/profile`])
    }
    if(this.isEmployer) {
      this.router.navigate([`/designer-digest/employer/profile`])
    }
    if(this.isPersonal) {
      this.router.navigate([`/designer-digest/personal/profile`])
    }
  }

  async logOut() {
    await this.apiAuthService.logout()
    this.router.navigate([`/`])
  }
}