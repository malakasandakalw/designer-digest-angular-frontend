import { Component, OnInit } from '@angular/core';
import { Designer } from 'src/app/designers/designers.component';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { DesignerService } from 'src/services/api/designer.service';
import { ILocation } from '../../employer/create-vacancy/create-vacancy.component';
import { DesignerCategory, PostCategory } from 'src/app/common/interfaces/CommonInterface';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { createMessage } from 'src/app/common/utils/messages';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorObject = {
    firstName: {
      show: false
    },
    lastName: {
      show: false
    },
    categories: {
      show: false
    },
    locations: {
      show: false
    }
  }

  designer: Designer | null = null

  loading = false
  loadingCategories = false
  loadingLocations = false
  uploadProgress = false;

  firstName: string = ''
  lastName: string = ''
  phone: string = ''
  uploadedFiles: any[] = [];

  locations:ILocation[] = []
  selectedLocation: string = ''
  
  categories: DesignerCategory[] = []
  selectedCategories: string[] = []
  
  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isDesigner() {
    if(this.currentUser) return this.apiAuthService.isDesigner()
    return false
  }

  async ngOnInit() {
    await this.getCategories()
    await this.getLocations()
    await this.getDesignerData()
  }

  constructor(
    private readonly designerService:DesignerService,
    private apiAuthService: ApiAuthService,
    private designerCategoriesService: DesignerCategoryService,
    private locationsService: LocationsService,
    private router: Router,
    private message: NzMessageService,
  ) {
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.designerCategoriesService.getAllDesignerCategories()
      if(response && response.body) {
        this.categories = response.body
      }
      this.loadingCategories = false
    } catch (error) {
      console.log(error)
      this.loadingCategories = false
    }
  }

  async getLocations() {
    try {
      this.loadingLocations = true
      const response =  await this.locationsService.getAllLocations()
      if(response && response.body) {
        this.locations = response.body
      }
      this.loadingLocations = false
    } catch (error) {
      console.log(error)
      this.loadingLocations = false
    }
  }

  async getDesignerData() {
    if(!this.currentUser) return
    try {
      this.loading = true
      const response = await this.designerService.getDesignerByUserId(this.currentUser.id)
      if(response) {
        console.log(response.body.result)
        this.designer = response.body.result
        this.firstName = response.body.result.first_name
        this.lastName = response.body.result.last_name
        this.phone = response.body.result.phone

        this.selectedCategories = this.categories.filter(category =>
          response.body.result.categories.some((c: DesignerCategory) => c.id === category.id)
        ).map(category => category.id);

        if(response.body.result.profile_picture) {
          this.uploadedFiles.push({
            name: response.body.result.profile_picture.replace("/uploads/", ""),
            url: response.body.result.profile_picture
          })
        }

        this.selectedLocation = response.body.result.locations[0].id

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

  onSelectCategory() {
    if (this.selectedCategories.length) {
      this.errorObject.categories.show = false
    }
  }

  onSelectLocation() {
    if (this.selectedLocation) {
      this.errorObject.locations.show = false
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

    if (!this.selectedCategories || !this.selectedCategories.length) {
      this.errorObject.categories.show = true
      return false
    } else {
      this.errorObject.categories.show = false
    }

    if (!this.selectedLocation || this.selectedLocation.trim() === '') {
      this.errorObject.locations.show = true
      return false
    } else {
      this.errorObject.locations.show = false
    }

    return true
  }

  async submitForm(): Promise<void> {

    if (this.validate()) {
      try {
        const formData = {
          user_id: this.currentUser.id,
          designer_id: this.designer?.designer_id,
          first_name: this.firstName,
          last_name: this.lastName,
          categories: this.selectedCategories,
          location: this.selectedLocation,
          profile_picture: this.uploadedFiles[0] ? this.uploadedFiles[0].url : this.currentUser?.profile_picture,
          phone: this.phone
        }

        const response = await this.designerService.updateDesigner(formData);
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
