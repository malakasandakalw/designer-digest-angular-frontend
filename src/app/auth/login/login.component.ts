import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  loading = false

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  ngOnInit() {

  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authApiService: ApiAuthService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    // const currentUser = this.authApiService.getCurrentUser();
    // if(currentUser && currentUser.user) {
    //  this.navigateUser(currentUser.user);
    // } else {
    //   this.authApiService.logout()
    // }

  }

  navigateUser(user: User) {
    if(user.role === 'Personal') {
      if(!user.is_verified) {
        this.router.navigate(['/designer-digest/personal/profile'])
      }
    }

    if(user.role === 'Designer') {
      if(!user.is_verified) {
        this.router.navigate(['/designer-digest/designer/profile'])
      } else {
        this.router.navigate(['/designer-digest/designer/dashboard'])
      }
    }

  }

  async submitForm(): Promise<void> {
    if (this.loginForm.valid) {
      if(this.loginForm.controls.email.value && this.loginForm.controls.password.value) {
        try {
          const response = await this.authApiService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
          if(response) {
            this.createMessage(response.status, response.message)
            if(response.status === 'success') {
              localStorage.setItem('currentUser', JSON.stringify(response.body));
              this.navigateUser(response.body.user)
            }
          }
        } catch (e) {
          console.log('User login error', e);
        }

      } else {
        return;
      }
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
