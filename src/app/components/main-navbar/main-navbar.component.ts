import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ActivatedRoute, Router } from '@angular/router';
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
import { createMessage } from 'src/app/common/utils/messages';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  isLoggedIn: boolean = false
  placement = 'topRight';
  msgSubscription: Subscription | undefined;
  msgReadSubscription: Subscription | undefined;
  unreadMessageCount: string | null = null

  openNavMenu = false

  mainNav = {
    allPosts : false,
    allCategories: false,
    allDesigners: false,
    allVacancies: false,
    dashboard: false,
    myStore: false,
    applications: false,
    chat: false,
    vacancies: false
  }

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isDesigner() {
    if(this.currentUser) return this.apiAuthService.isDesigner()
    return false
   
  }

  get isPersonal() {
    if(this.currentUser)return this.apiAuthService.isPersonal()
    return false
    
  }

  get isEmployer() {
    if(this.currentUser) return this.apiAuthService.isEmployer()
    return false
    
  }

  constructor(
    private apiAuthService: ApiAuthService,
    private socketService: SocketService,
    private router: Router,
    private notification: NzNotificationService,
    private chatService: ChatsService,
    private activeRoute: ActivatedRoute,
    private message: NzMessageService
  ) {
    if (apiAuthService.isAuthenticated()) {
      this.verification()
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

    const fullUrl = this.router.url;

    if (fullUrl.includes('dashboard')) {
      this.mainNav.dashboard = true;
    }
    if (fullUrl.includes('my-store')) {
      this.mainNav.myStore = true;
    }
    if (fullUrl.includes('applications')) {
      this.mainNav.applications = true;
    }

    if (fullUrl.includes('vacancies')) {
      this.mainNav.vacancies = true;
    }
    

    this.activeRoute.url.subscribe((urlSegments) => {
      if (urlSegments && urlSegments.length > 0) {
        const urlSegment = urlSegments[0];
        const { path } = urlSegment;
  
        if(path.includes('all-posts')) {
          this.mainNav.allPosts = true;
        } 
  
        if(path.includes('categories')) {
          this.mainNav.allCategories = true;
        } 
  
        if(path.includes('designers')) {
          this.mainNav.allDesigners = true;
        } 
  
        if(path.includes('vacancies')) {
          this.mainNav.allVacancies = true;
        }
  
        if(path.includes('dashboard')) {
          this.mainNav.dashboard = true;
        }
      }
    });

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

  navigateResetPassword() {
    if(this.isDesigner) {
      this.router.navigate([`/designer-digest/designer/reset-password`])
    }
    if(this.isEmployer) {
      this.router.navigate([`/designer-digest/employer/reset-password`])
    }
    if(this.isPersonal) {
      this.router.navigate([`/designer-digest/personal/reset-password`])
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
    window.location.reload();
    createMessage(this.message, 'success', 'Successfully Logged Out')
  }
}