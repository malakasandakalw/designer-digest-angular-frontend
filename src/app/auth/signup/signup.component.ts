import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiAuthService, userSignupRequestData } from 'src/services/api/api-auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
  userType: string = 'designer'

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

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

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.userType = params['type']
    })
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authApiService: ApiAuthService,
    private message: NzMessageService,
    private router: Router,
    private activatedRouter: ActivatedRoute
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
      if (this.signupForm.controls.firstName.value && this.signupForm.controls.lastName.value && this.signupForm.controls.email.value && this.signupForm.controls.password.value) {

        const requestData: userSignupRequestData = {
          first_name: this.signupForm.controls.firstName.value,
          last_name: this.signupForm.controls.lastName.value,
          email: this.signupForm.controls.email.value,
          password: this.signupForm.controls.password.value,
          role: this.userType
        }

        try {
          const response = await this.authApiService.signup(requestData);
          if (response) {
            this.createMessage(response.status, response.message);
            if (response.status === 'success') {
              setTimeout(() => {
                this.router.navigate(['/auth/login'])
              }, 800)
            }
          }
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
