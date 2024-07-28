import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs';
import { ApiAuthService } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  loading = false

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authApiService: ApiAuthService,
    private message: NzMessageService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
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
              this.authApiService.currentUser = response.body;
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
