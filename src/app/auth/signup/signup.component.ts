import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiAuthService, userSignupRequestData } from 'src/services/api/api-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    checkPassword: FormControl<string | null>;
  }>;

  loading = false;
  validating = false;
  passwordVisibility = false;

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.signupForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authApiService: ApiAuthService
  ) {
    // this.app.setTitle('Signup')
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]]
    })
  }


  async submitForm(): Promise<void> {
    if (this.signupForm.valid) {
      if(this.signupForm.controls.firstName.value && this.signupForm.controls.lastName.value && this.signupForm.controls.email.value && this.signupForm.controls.password.value) {
        
        const requestData: userSignupRequestData = {
          first_name: this.signupForm.controls.firstName.value,
          last_name: this.signupForm.controls.lastName.value,
          email: this.signupForm.controls.email.value,
          password: this.signupForm.controls.password.value,
        }

        try {
          const response = await this.authApiService.signup(requestData);
          console.log(response);
        } catch (e) {
          console.log('User signup error', e);
        }

      } else {
        return;
      }
    } else {
      Object.values(this.signupForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
