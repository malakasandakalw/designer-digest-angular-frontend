import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/common/interfaces/CommonInterface';
import { createMessage } from 'src/app/common/utils/messages';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { UsersService } from 'src/services/api/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  errorObject = {
    firstName: {
      show: false
    },
    lastName: {
      show: false
    }
  }

  employer: User | null = null

  loading = false
  uploadProgress = false;

  firstName: string = ''
  lastName: string = ''
  phone: string = ''
  uploadedFiles: any[] = [];


  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isEmployer() {
    if(this.currentUser) return this.apiAuthService.isEmployer()
    return false
  }

  async ngOnInit() {
    await this.getEmployerData()
  }

  constructor(
    private readonly userService: UsersService,
    private apiAuthService: ApiAuthService,
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  async getEmployerData() {
    if(!this.currentUser) return
    try {
      this.loading = true
      const response = await this.userService.getById(this.currentUser.id)
      if(response) {
        this.employer = response.body
        this.firstName = response.body.first_name
        this.lastName = response.body.last_name
        this.phone = response.body.phone

        if(response.body.profile_picture) {
          this.uploadedFiles.push({
            name: response.body.profile_picture.replace("/uploads/", ""),
            url: response.body.profile_picture
          })
        }

      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
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

  onFirstnameChange(e: any) {
    if (this.firstName.length) {
      this.errorObject.firstName.show = false
    }
  }
  onLastnameChange(e: any) {
    if (this.lastName.length) {
      this.errorObject.lastName.show = false
    }
  }

  validate() {

    if (!this.firstName || this.firstName.trim() === '') {
      this.errorObject.firstName.show = true
      return false
    } else {
      this.errorObject.firstName.show = false
    }

    if (!this.lastName || this.lastName.trim() === '') {
      this.errorObject.lastName.show = true
      return false
    } else {
      this.errorObject.lastName.show = false
    }

    return true
  }

  async submitForm(): Promise<void> {

    if (this.validate()) {
      try {
        const formData = {
          user_id: this.currentUser.id,
          first_name: this.firstName,
          last_name: this.lastName,
          profile_picture: this.uploadedFiles[0] ? this.uploadedFiles[0].url : this.currentUser?.profile_picture,
          phone: this.phone
        }

        const response = await this.userService.updateUser(formData);
        if (response) {
          createMessage(this.message, response.status, response.message as string)
          if(response.status === 'success') {
            this.apiAuthService.updateCurrentUserSession(response.body.user)
            setTimeout(() => {
              window.location.reload()
            }, 800)
          }
        }

        
      } catch (e) {
        console.log('Create post error', e);
      }
    }
  }

}
