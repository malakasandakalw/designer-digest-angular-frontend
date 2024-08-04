import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiAuthService } from '../api/api-auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  constructor(
    private apiAuthService: ApiAuthService,
    private router: Router,
    private message: NzMessageService,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if(event.status === 403) {
              this.createMessage('error', 'Unauthorized')
              this.apiAuthService.logout()
            };
          }
        },
        (error: HttpErrorResponse) => {
          if(error.status === 403) {
            this.createMessage('error', 'Unauthorized')
            this.apiAuthService.logout()
          };

          if(error.status === 404) {
            this.router.navigate(['/page-not-found'])
          };
          console.error('HTTP Error:', error);
        }
      )
    );
  }
}
