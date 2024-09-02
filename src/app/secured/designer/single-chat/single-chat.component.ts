import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileManagerService } from 'src/services/api/file-manager.service';
import { io, Socket } from 'socket.io-client';
import { SocketService } from 'src/services/socket.service';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatsService } from 'src/services/api/chats.service';
import { UsersService } from 'src/services/api/users.service';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

export interface MessageData {
  from_user_name: string,
  from_user: string,
  to_user: string,
  message: string | null,
  type: string,
  file_url: string | null,
  id?: string,
  created_at?: string
}

export interface MessageRead {
  id: string,
  from_user: string,
  to_user: string
}

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.component.html',
  styleUrls: ['./single-chat.component.css'],
  standalone: true,
  imports: [
    NzModalModule,
    NzListModule,
    NzAvatarModule,
    CommonModule,
    NzButtonModule,
    FormsModule, ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzImageModule,
    NzSkeletonModule,
    NzImageModule
  ]
})
export class SingleChatComponent implements OnInit, OnDestroy{
  @ViewChild('scrollContainer') private scrollContainer: ElementRef<HTMLDivElement> | undefined;
  loading = false
  reciever: User | null = null
  files: { name: string, data: string }[] = []
  uploadedFiles: string[] = []
  uploading = false
  sending = false
  messages: MessageData[] = []
  messageText = ''
  activeChatId: string | null = null
  disableButton = false
  msgSubscription: Subscription | undefined;

  chats = [1,2,3,4,5]

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  constructor(
    private fileManagerService: FileManagerService,
    private socketService: SocketService,
    private apiAuthService: ApiAuthService,
    private route: ActivatedRoute,
    private chatService: ChatsService,
    private usersService: UsersService
  ){
    this.messages = [];
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.activeChatId = params.get('id');
    });
    this.msgSubscription = this.socketService.getNewMessageObservable().subscribe((message) => {
      if (message) {
        this.messages = this.messages ? [...this.messages, message] : [message];
        this.scrollToBottom()

        console.log(message)
        console.log(this.currentUser.id)

        if((message.to_user === this.currentUser.id ) && message.id) {
          this.socketService.sendMessageRead(message.id,  message.to_user)
        }
      }
    });
    await this.getReceiverData()
    await this.getMessages()
    await this.readAllMessages()
    this.chatService.emitUnreadCountRefresh()
  }

  ngOnDestroy(): void {
    if (this.msgSubscription) {
      this.msgSubscription.unsubscribe();
      console.log('Subscription unsubscribed');
    }
    console.log('Component destroyed');;
  }

  async getReceiverData() {
    if(!this.activeChatId) return
    try {
      this.loading = true
      const response = await this.usersService.getById(this.activeChatId)
      if(response) {
        this.reciever = response.body
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async getMessages() {
    if(!this.currentUser.id || !this.activeChatId) return
    try {
      this.loading = true
      const response = await this.chatService.getSingleChat(this.currentUser.id, this.activeChatId)
      if(response) {
        this.messages = response.body
      }
      setTimeout(() => {
        this.scrollToBottom()
        this.loading = false
      }, 800)
    } catch (error) {
      console.log(error)
    }
  }

  async readAllMessages() {
    if(!this.currentUser.id || !this.activeChatId) return
    try {
      await this.chatService.readAllMessages(this.currentUser.id, this.activeChatId)
    } catch (error) {
      console.log(error)
    }
  }

  onMessageTextChange() {
    if(!this.messageText.length) {
      this.disableButton = true
    } else {
      this.disableButton = false
    }
  }

  onSelecttoUpload(event: any) {
    const selectedFiles: File[] = Array.from(event.target.files as FileList);
    this.onSelectFiles(selectedFiles)
  }

  onSelectFiles(selectedFiles: File[]) {
    const fileReaders = selectedFiles.map((file, index) => {
      return new Promise<any>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve(
            this.files.push({
              name: file.name,
              data: e.target.result
            })
          )
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    })
    Promise.all(fileReaders).then(() => {
      this.onDroppedFile()
    }
    ).catch((error) => console.log('Error files reading', error))
  }

  async onDroppedFile() {
    if (this.files.length > 0) {
      try {
        this.uploading = true
        const response = await this.fileManagerService.uploadFiles(this.files)
        if(response) {
          response.body.files.forEach(async (file: any) => {
            await this.sendMessage(file.type, file.url)
          });
        }
        this.files = []
        this.uploading = false
      } catch (error) {

      }
    }
  }

  async sendMessage(type: string, file_url: string | null) {
    
    if(!this.currentUser || !this.activeChatId) return

    const messageData: MessageData = {
      from_user_name: this.currentUser.first_name,
      from_user: this.currentUser.id,
      to_user: this.activeChatId,
      message: this.messageText,
      type: type,
      file_url: file_url
    }
    this.socketService.sendMessage(messageData)
    this.messageText = ''
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      const element = this.scrollContainer.nativeElement;
      setTimeout(() => element.scrollTop = element.scrollHeight, 100);
    }
  }

}
