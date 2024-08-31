import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerRoutingModule } from './designer-routing.module';
import { DesignerLayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MainNavbarComponent } from "../../components/main-navbar/main-navbar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { NzImageModule } from 'ng-zorro-antd/image';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { MainPostsFilterComponent } from 'src/app/components/main-posts-filter/main-posts-filter.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SinglePostComponent } from './single-post/single-post.component';
import { ChatsComponent } from './chats/chats.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SingleChatComponent } from './single-chat/single-chat.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SinglePostCardComponent } from "../../components/single-post-card/single-post-card.component";
import { NgxEditorModule } from 'ngx-editor';
import { UpdatePostComponent } from './update-post/update-post.component';
import { SingleVacancyCardComponent } from "../../components/single-vacancy-card/single-vacancy-card.component";
import { SingleVacancyComponent } from './single-vacancy/single-vacancy.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { FileUploadApplicationComponent } from "../../components/file-upload-application/file-upload-application.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    DesignerLayoutComponent,
    ProfileComponent,
    CreatePostComponent,
    DashboardComponent,
    MyStoreComponent,
    VacanciesComponent,
    SinglePostComponent,
    ChatsComponent,
    UpdatePostComponent,
    SingleVacancyComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzSelectModule,
    NzTypographyModule,
    NzUploadModule,
    MainNavbarComponent,
    FileUploadComponent,
    NzImageModule,
    LoadingSpinnerComponent,
    MainPostsFilterComponent,
    NzPaginationModule,
    NzTagModule,
    NzToolTipModule,
    NzModalModule,
    NzListModule,
    NzAvatarModule,
    SingleChatComponent,
    NzBadgeModule,
    SinglePostCardComponent,
    NgxEditorModule,
    SingleVacancyCardComponent,
    NzSkeletonModule,
    FileUploadApplicationComponent,
    NzDatePickerModule
]
})
export class DesignerModule { }