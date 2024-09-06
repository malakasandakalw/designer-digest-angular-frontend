import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleChatComponent } from './single-chat.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { FileManagerService } from 'src/services/api/file-manager.service';
import { ChatsService } from 'src/services/api/chats.service';
import { UsersService } from 'src/services/api/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { SocketService } from 'src/services/socket.service';
import { MessageData } from '../../designer/single-chat/single-chat.component';
import { IServerResponse } from 'src/services/api/base.service';

describe('SingleChatComponent', () => {
  let component: SingleChatComponent;
  let fixture: ComponentFixture<SingleChatComponent>;
  let apiAuthService: jasmine.SpyObj<ApiAuthService>;
  let fileManagerService: jasmine.SpyObj<FileManagerService>;
  let socketService: jasmine.SpyObj<SocketService>;
  let chatService: jasmine.SpyObj<ChatsService>;
  let usersService: jasmine.SpyObj<UsersService>;
  
  beforeEach(async () => {
    const apiAuthServiceSpy = jasmine.createSpyObj('ApiAuthService', ['getCurrentUser']);
    const fileManagerServiceSpy = jasmine.createSpyObj('FileManagerService', ['uploadFiles']);
    const socketServiceSpy = jasmine.createSpyObj('SocketService', ['getNewMessageObservable', 'sendMessage', 'sendMessageRead']);
    const chatServiceSpy = jasmine.createSpyObj('ChatsService', ['getSingleChat', 'readAllMessages', 'emitUnreadCountRefresh']);
    const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getById']);

    await TestBed.configureTestingModule({
      declarations: [SingleChatComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ApiAuthService, useValue: apiAuthServiceSpy },
        { provide: FileManagerService, useValue: fileManagerServiceSpy },
        { provide: SocketService, useValue: socketServiceSpy },
        { provide: ChatsService, useValue: chatServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: NzMessageService, useValue: {} },
        { provide: NzModalService, useValue: {} },
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: (id: string) => '123' }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleChatComponent);
    component = fixture.componentInstance;
    apiAuthService = TestBed.inject(ApiAuthService) as jasmine.SpyObj<ApiAuthService>;
    fileManagerService = TestBed.inject(FileManagerService) as jasmine.SpyObj<FileManagerService>;
    socketService = TestBed.inject(SocketService) as jasmine.SpyObj<SocketService>;
    chatService = TestBed.inject(ChatsService) as jasmine.SpyObj<ChatsService>;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;

    apiAuthService.getCurrentUser.and.returnValue({ user: { id: 'user123', first_name: 'John', last_name: 'Doe', email: 'john@example.com', profile_picture: null } });
    socketService.getNewMessageObservable.and.returnValue(of<MessageData>({
      from_user_name: 'user456',
      from_user: 'user456',
      to_user: 'user123',
      message: 'Hi',
      type: 'text',
      file_url: null,
      id: '778234',
      created_at: new Date().toISOString()
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get receiver data on initialization', async () => {
    const mockResponse: IServerResponse<any> = {
      done: true,
      status: 'success',
      body: {
        id: 'user456',
        first_name: 'Jane',
        last_name: 'Doe',
        role: 'Designer',
        email: 'jane@example.com',
        profile_picture: null
      }
    };
    
    usersService.getById.and.returnValue(Promise.resolve(mockResponse));

    await component.getReceiverData();
    expect(component.reciever).toEqual(mockResponse.body);
    expect(usersService.getById).toHaveBeenCalled();
  });

  it('should scroll to bottom when new message received', () => {
    const mockMessage: MessageData = {
      from_user_name: 'user456',
      from_user: 'user456',
      to_user: 'user4567',
      message: 'Hi',
      type: 'text',
      file_url: null,
      id: '778234',
      created_at: new Date().toISOString()
    };
    component.messages = [];
    socketService.getNewMessageObservable.and.returnValue(of(mockMessage));
    component.ngOnInit();
    expect(component.messages.length).toBe(1);
    expect(component.messages[0]).toEqual(mockMessage);
  });

  it('should disable send button if message text is empty', () => {
    component.messageText = '';
    component.onMessageTextChange();
    expect(component.disableButton).toBeTrue();
  });

  it('should enable send button if message text is not empty', () => {
    component.messageText = 'Hello';
    component.onMessageTextChange();
    expect(component.disableButton).toBeFalse();
  });
});
