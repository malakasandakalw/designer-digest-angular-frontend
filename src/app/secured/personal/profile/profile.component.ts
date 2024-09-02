import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { PersonalService, UpdatePersonalProfileData } from 'src/services/api/personal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  updateForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    phone: FormControl<string | null>;
  }>;

  currentUser: User | null = null
  loading = false;
  uploadProgress = false;
  uploadedFiles: any[] = [];

  constructor(
    private apiAuthService: ApiAuthService,
    private readonly formBuilder: FormBuilder,
    private personalService: PersonalService,
  ) {
    this.currentUser = this.apiAuthService.getCurrentUser().user;
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['']
    })
  }

  ngOnInit(): void {
    if(this.currentUser) {
      this.updateForm.setValue({
        firstName: this.currentUser.first_name,
        lastName: this.currentUser.last_name,
        phone: this.currentUser.phone || ''
      })
    }
  }

  async submitForm() {
    try{
      this.loading = true

      const requestData: UpdatePersonalProfileData = {
        first_name: this.updateForm.controls.firstName.value as string,
        last_name: this.updateForm.controls.lastName.value as string,
        profile_picture: this.uploadedFiles[0] ? this.uploadedFiles[0].url : this.currentUser?.profile_picture,
        phone: this.updateForm.controls.phone.value as string,
      }

      const response = await this.personalService.updateProfile(requestData)

      if(response.status === 'success') {
        this.apiAuthService.updateCurrentUserSession(response.body.user)
        setTimeout(() => {
          window.location.reload()
        }, 800)
      }

      this.loading = false
    } catch (e) {

    }
  }

  onProgressUpdate(progress: boolean) {
    this.uploadProgress = progress;
  }

  onUploadComplete(files: any[]) {
    this.uploadedFiles = files;
  }

  onUploadError(error: string) {
    console.error('Upload Error:', error);
  }

}