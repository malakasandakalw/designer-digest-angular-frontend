import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalLayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    PersonalLayoutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    NzButtonModule
  ]
})
export class PersonalModule { }
