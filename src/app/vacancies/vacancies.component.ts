import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { DesignerCategory, DesignerLocations, Designer } from '../designers/designers.component';
import { Vacancy } from '../secured/employer/vacancies/vacancies.component';
import { VacanciesService } from 'src/services/api/vacancies.service';
import { UploadedVacancyFile } from '../secured/employer/create-vacancy/create-vacancy.component';
import { createMessage } from '../common/utils/messages';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApplicationsService } from 'src/services/api/applications.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {
  loading = false
  appliedOnly = false

  totalVacancies = 0;
  pageIndex = 1;
  pageSize = 50;

  categories: DesignerCategory[] = []
  loadingCategories: boolean = false
  selectedCategories: string[] = []

  locations: DesignerLocations[] = []
  loadingLocations: boolean = false
  selectedLocations: string[] = []

  vacancies: Vacancy[] = []

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
    private applicationService: ApplicationsService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getCategories()
    await this.getLocations()
    await this.getVacancies()
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.designerCategoryService.getAllDesignerCategories();
      if (response) {
        this.categories = response.body;
      }
      this.loadingCategories = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loadingCategories = false
    }
  }

  async getLocations() {
    try {
      this.loadingLocations = true
      const response = await this.locationService.getAllLocations();
      if (response) {
        this.locations = response.body;
      }
      this.loadingLocations = false
    } catch (e) {
      console.log('Get categories error', e);
      this.loadingLocations = false
    }
  }

  async getVacancies() {
    try {
      this.loading = true
      const filterData = {
        categories: this.selectedCategories,
        locations: this.selectedLocations,
        page_index: this.pageIndex,
        page_size: this.pageSize,
        applied_only: this.appliedOnly,
        user_id: this.currentUser ? this.currentUser.id : null
      }
      const response = await this.vacancyService.getFilteredVacancies(filterData);
      if (response) {
        this.totalVacancies = response.body.result.total
        this.vacancies = response.body.result.vacancies;
      }
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async onFilterCategoryChange() {
    await this.getVacancies()
  }

  async onFilterLocationChange() {
    await this.getVacancies()
  }

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getVacancies()
  }

  showModel = false
  loadingVacancy = false
  retrivedVacancy: Vacancy | null = null

  async showApplyModel(id: string) {
    if(!id) return
    try {
      this.showModel = true
      this.loadingVacancy = true 
      const response = await this.vacancyService.getById(id, this.currentUser?.id ? this.currentUser.id : null)
      if(response) {
        this.retrivedVacancy = response.body.result
      }
    } catch (error) {
      console.log(error)
      this.showModel = false
    } finally {
      this.loadingVacancy = false
    }
  }

  handleCancel() {
    this.showModel = false
    this.retrivedVacancy = null
  }

  uploadProgress = false
  uploadedFiles: UploadedVacancyFile | null = null

  errorObject = {
    files: {
      show: false
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
    if(this.validate() && this.retrivedVacancy) {
      try {
        this.loading = true
        const formData = {
          files: this.uploadedFiles,
          vacancyId: this.retrivedVacancy.vacancy_id
        }
        const response = await this.applicationService.createApplication(formData);
        if(response) {
          createMessage(this.message, response.status, response.message as string)
          if(response.status === 'success') {
            setTimeout(() => {
              this.handleCancel()
              this.router.navigate(['/vacancies'])
            }, 800)
          }
        }
      } catch (e) {
        console.log('Create post error', e);
      } finally {
        this.loading = false
      }
    }
  }

  navigateToUpdateApplication(vacancyId: string) {
    if(!vacancyId) return
    this.router.navigate(['/vacancies'])
  }

}
