import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerRoutingModule } from './designer-routing.module';
import { DesignerLayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    DesignerLayoutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule
  ]
})
export class DesignerModule { }