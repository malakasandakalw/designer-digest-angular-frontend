import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { ChatsService } from 'src/services/api/chats.service';
import { UsersService } from 'src/services/api/users.service';

export interface Chat {
  user_id: string,
  user_name: string,
  profile_picture: string,
  latest_message: string,
  created_at: string,
  unread_count: number
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit{

  loading = false
  loadingUsers = false
  isVisible = false;
  chats: Chat[] = []
  users: User[] = []
  // currentUser: User | null = null

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private apiAuthService: ApiAuthService,
    private chatService: ChatsService
  ){
    // this.currentUser = this.apiAuthService.getCurrentUser().user
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.getChatsByDesigner()
      await this.getUsers();
    } catch (error) {
      console.log(error)
    }
  }

  async getUsers() {
    try {
      this.loadingUsers = true
      const response = await this.usersService.getAllUsers()
      if(response) {
        this.users = response.body
      }
      this.loadingUsers = false
    } catch (error) {
      console.log(error)
    }
  }

  async getChatsByDesigner() {
    try {
      this.loading = true
      const response = await this.chatService.getChatsByDesigner();
      if (response) {
        this.chats = response.body;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  goToSingleChat(userId: string) {
    if(!userId) return
    this.router.navigate([`/designer-digest/designer/chats/${userId}`])
  }

  handleCancel() {
    this.isVisible = false
  }

}
