import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuredRoutingModule } from './secured-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorService } from 'src/services/common/request-interceptor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecuredRoutingModule
  ],
  providers: [
  ]
})
export class SecuredModule { }
