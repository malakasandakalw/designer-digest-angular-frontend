import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { DesignerService } from 'src/services/api/designer.service';
import { UsersService } from 'src/services/api/users.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit{
  loading = false
  loadingUsers = false
  isVisible = false;
  chats: any[] = []
  designers: User[] = []

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private designersService: DesignerService,
    private router: Router,
    private apiAuthService: ApiAuthService
  ){}

  async ngOnInit(): Promise<void> {
    try {
      await this.getChatsByPersonal()
      await this.getDesigners();
    } catch (error) {
      console.log(error)
    }
  }

  async getDesigners() {
    try {
      this.loadingUsers = true
      const response = await this.designersService.getAllDesigners()
      if(response) {
        this.designers = response.body
      }
      this.loadingUsers = false
    } catch (error) {
      console.log(error)
    }
  }

  async getChatsByPersonal() {
    try {
      this.loading = true
      // const response = await this.postsService.getPostsByDesigner();
      // if (response) {
      //   console.log(response)
        // this.chats = response.body;
      // }
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
    this.router.navigate([`/designer-digest/personal/chats/${userId}`])
  }

}
