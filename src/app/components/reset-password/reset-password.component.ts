import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-public-reset-password',
  standalone: true,
  imports: [CommonModule, NzFormModule, NzInputModule, FormsModule, ReactiveFormsModule, NzButtonModule, NzIconModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class PublicResetPasswordComponent {
  passwordResetForm: FormGroup<{
    current_password: FormControl<string | null>;
    new_password: FormControl<string | null>;
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
    this.passwordResetForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
    })

  }

  async submitForm(): Promise<void> {
    if (this.passwordResetForm.valid) {
      if(this.passwordResetForm.controls.current_password.value && this.passwordResetForm.controls.new_password.value) {
        try {
          const response = await this.authApiService.resetPassword(this.passwordResetForm.controls.current_password.value, this.passwordResetForm.controls.new_password.value);
          if(response) {
            this.createMessage(response.status, response.message)
            if(response.status === 'success') {
              setTimeout(() => {
                this.authApiService.logout()
              }, 2000)
            }
          }
        } catch (e) {
          this.createMessage('error', 'User login error')
          console.log('User login error', e);
        }

      } else {
        return;
      }
    } else {
      Object.values(this.passwordResetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
