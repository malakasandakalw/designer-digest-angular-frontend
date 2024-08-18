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


@NgModule({
  declarations: [
    DesignerLayoutComponent,
    ProfileComponent,
    CreatePostComponent,
    DashboardComponent,
    MyStoreComponent,
    VacanciesComponent
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
    NzImageModule
]
})
export class DesignerModule { }