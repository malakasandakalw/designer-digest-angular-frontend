import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerLayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { ChatsComponent } from './chats/chats.component';
import { SingleChatComponent } from './single-chat/single-chat.component';
import { UpdateVacancyComponent } from './update-vacancy/update-vacancy.component';
import { ApplicationsComponent } from './applications/applications.component';
import { MainNavbarComponent } from "../../components/main-navbar/main-navbar.component";
import { EmployerRoutingModule } from './employer-routing.module';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxEditorModule } from 'ngx-editor';
import { FileUploadVacancyComponent } from "../../components/file-upload-vacancy/file-upload-vacancy.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { VacancyFilterComponent } from "../../components/vacancy-filter/vacancy-filter.component";
import { SingleVacancyCardComponent } from "../../components/single-vacancy-card/single-vacancy-card.component";
import { SingleVacancyComponent } from './single-vacancy/single-vacancy.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FileUploadComponent } from "../../components/file-upload/file-upload.component";
import { NzImageModule } from 'ng-zorro-antd/image';



@NgModule({
  declarations: [
    EmployerLayoutComponent,
    ProfileComponent,
    VacanciesComponent,
    CreateVacancyComponent,
    ChatsComponent,
    SingleChatComponent,
    UpdateVacancyComponent,
    ApplicationsComponent,
    SingleVacancyComponent
  ],
  imports: [
    CommonModule,
    MainNavbarComponent,
    EmployerRoutingModule,
    LoadingSpinnerComponent,
    NzIconModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzPaginationModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NgxEditorModule,
    FileUploadVacancyComponent,
    NzLayoutModule,
    NzGridModule,
    NzTypographyModule,
    VacancyFilterComponent,
    SingleVacancyCardComponent,
    NzTagModule,
    NzListModule,
    NzAvatarModule,
    FileUploadComponent,
    NzImageModule
]
})
export class EmployerModule { }
