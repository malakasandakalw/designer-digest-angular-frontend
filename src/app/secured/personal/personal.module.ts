import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalLayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MainNavbarComponent } from "../../components/main-navbar/main-navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ChatsComponent } from './chats/chats.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { SingleChatComponent } from '../designer/single-chat/single-chat.component';

@NgModule({
  declarations: [
    PersonalLayoutComponent,
    ProfileComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    NzButtonModule,
    MainNavbarComponent,
    FormsModule, ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    FileUploadComponent,
    NzImageModule,
    NzAvatarModule,
    NzModalModule,
    NzListModule,
    LoadingSpinnerComponent,
    SingleChatComponent
]
})
export class PersonalModule { }
