import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createMessage } from 'src/app/common/utils/messages';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { ApplicationsService } from 'src/services/api/applications.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { VacanciesService } from 'src/services/api/vacancies.service';
import { UploadedVacancyFile } from '../../employer/create-vacancy/create-vacancy.component';
import { Vacancy } from '../../employer/vacancies/vacancies.component';

@Component({
  selector: 'app-single-vacancy',
  templateUrl: './single-vacancy.component.html',
  styleUrls: ['./single-vacancy.component.css']
})
export class SingleVacancyComponent implements OnInit {

  id: string | null = null
  applicationId: string | null = null
  loadingVacancy = false
  retrivedVacancy: Vacancy | null = null

  uploadProgress = false
  uploadedFiles: UploadedVacancyFile | null = null

  errorObject = {
    files: {
      show: false
    }
  }

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isDesigner() {
    if(this.currentUser) return this.apiAuthService.isDesigner()
    return false
  }

  constructor(
    private locationService: LocationsService,
    private designerCategoryService: DesignerCategoryService,
    private apiAuthService: ApiAuthService,
    private vacancyService: VacanciesService,
    private router: Router,
    private message: NzMessageService,
    private applicationService: ApplicationsService,
    private route: ActivatedRoute
  ){}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    await this.showApplyModel()
  }

  async showApplyModel() {
    if(!this.id) return
    try {
      this.loadingVacancy = true 
      const response = await this.vacancyService.getById(this.id, this.currentUser?.id ? this.currentUser.id : null)
      if(response) {
        this.retrivedVacancy = response.body.result
        this.uploadedFiles = {
          name: response.body.result.resume_url.replace("/uploads/applications/", ""),
          url: response.body.result.resume_url
        }
        this.applicationId = response.body.result.resume_id
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loadingVacancy = false
    }
  }

  onProgressUpdate(progress: boolean) {
    this.uploadProgress = progress;
  }

  onUploadComplete(files: UploadedVacancyFile) {
    this.uploadedFiles = files;
  }

  onUploadError(error: string) {
    console.error('Upload Error:', error);
  }

  removeFile() {
    this.uploadedFiles = null
  }

  validate() {

    if (!this.uploadedFiles) {
      this.errorObject.files.show = true
      return false
    } else {
      this.errorObject.files.show = false;
    }

    return true

  }

  async submitForm() {
    if(this.validate() && this.retrivedVacancy && this.applicationId) {
      try {
        this.loadingVacancy = true
        const formData = {
          files: this.uploadedFiles,
          applicationId: this.applicationId
        }
        const response = await this.applicationService.updateApplication(formData);
        if(response) {
          createMessage(this.message, response.status, response.message as string)
          if(response.status === 'success') {
            setTimeout(() => {
              this.router.navigate(['designer-digest/designer/applications'])
            }, 800)
          }
        }
      } catch (e) {
        console.log('Create post error', e);
      } finally {
        this.loadingVacancy = false
      }
    }
  }

  handleCancel() {
    window.history.back()
  }

  getEncodedFilePath(filePath: string): string {
    return encodeURIComponent(filePath.replace('/uploads/', ''));
  }

}
