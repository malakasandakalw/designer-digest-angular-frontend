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


@NgModule({
  declarations: [
    DesignerLayoutComponent,
    ProfileComponent,
    CreatePostComponent
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
    NzSelectModule
  ]
})
export class DesignerModule { }