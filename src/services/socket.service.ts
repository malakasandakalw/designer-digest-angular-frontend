import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageData, MessageRead } from 'src/app/secured/designer/single-chat/single-chat.component';
import { ApiAuthService } from './api/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private newMessageSubject = new BehaviorSubject<any>(null);

  constructor(
    private authApiService: ApiAuthService
  ) {

    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      this.socket.emit('authenticate', this.authApiService.getCurrentUser().token); 
    });

    this.socket.on('receiveMessage', (message: MessageData) => {
      this.newMessageSubject.next(message);
    });

  }

  getNewMessageObservable(): Observable<MessageData> {
    return this.newMessageSubject.asObservable();
  }

  sendMessage(messageData: MessageData) {
    this.socket.emit('sendMessage', messageData);
  }

  sendMessageRead(id: string, to_user: string) {
    this.socket.emit('sendRead', {id, to_user})
  }

  disconnect() {
    this.socket.disconnect();
  }
}
