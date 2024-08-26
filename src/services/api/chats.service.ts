import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService, IServerResponse } from './base.service';
import { toQueryString } from 'src/app/common/utils/queryParams';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService extends BaseService  {
  private readonly emitRefershUnreadCount = new Subject<void>();

  public get onRefreshUnreadCount() {
    return this.emitRefershUnreadCount.asObservable()
  }

  public emitUnreadCountRefresh() {
    this.emitRefershUnreadCount.next()
  }

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getChatsByDesigner(): Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/chats/get-all-by-designer`)
  }

  public getSingleChat(senderId: string, receiverId: string): Promise<IServerResponse<any>> {
    const q = toQueryString({senderId: senderId, receiverId: receiverId})
    return this._get(this.http, `${this.API_BASE_URL}/chats/get-single-chat${q}`)
  }

  public getUnreadMessagesCount() : Promise<IServerResponse<any>> {
    return this._get(this.http, `${this.API_BASE_URL}/chats/get-unread-count`)
  }

  public readAllMessages(toId: string, fromId: string): Promise<IServerResponse<any>> {
    return this._post(this.http, `${this.API_BASE_URL}/chats/read-all`, {toId, fromId})
  }

}
