import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Editor, Toolbar } from 'ngx-editor';
import { createMessage } from 'src/app/common/utils/messages';
import { DesignerCategory } from 'src/app/designers/designers.component';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { VacanciesService } from 'src/services/api/vacancies.service';
import { ILocation, UploadedVacancyFile } from '../create-vacancy/create-vacancy.component';

@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrls: ['./update-vacancy.component.css']
})
export class UpdateVacancyComponent implements OnInit, OnDestroy {
  errorObject = {
    title: {
      show: false
    },
    description: {
      show: false
    },
    categories: {
      show: false
    },
    locations: {
      show: false
    },
    file: {
      show: false
    }
  }

  title: string = ''
  editor: Editor | null = null;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  description = '';
  categories: DesignerCategory[] = [];
  selectedCatgeories: string[] = [];

  locations: ILocation[] = [];
  selectedLocations: string[] = []

  uploadProgress = false
  uploadedFiles: UploadedVacancyFile | null = null

  loading = false
  loadingCategories = false
  loadingLocations = false

  active: string = ''

  id: string | null = null

  constructor(
    private locationsService: LocationsService,
    private designerCategoriesService: DesignerCategoryService,
    private vacanciesService: VacanciesService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  async ngOnInit(): Promise<void> {
    this.editor = new Editor();
    this.getCategories()
      .then(() => this.getLocations())
      .then(() => this.getVacancyById())
      .catch(error => {
        console.error('Error occurred:', error);
      });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  async getCategories() {
    try {
      this.loadingCategories = true
      const response = await this.designerCategoriesService.getAllDesignerCategories()
      if (response && response.body) {
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
      const response = await this.locationsService.getAllLocations()
      if (response && response.body) {
        this.locations = response.body
      }
      this.loadingLocations = false
    } catch (error) {
      console.log(error)
      this.loadingLocations = false
    }
  }

  async getVacancyById() {
    if (!this.id) return
    try {
      this.loading = true
      const response = await this.vacanciesService.getFullById(this.id)
      if (response) {
        this.title = response.body.result.title
        this.description = response.body.result.description

        this.selectedCatgeories = this.categories.filter(category =>
          response.body.result.categories.some((c: DesignerCategory) => c.id === category.id)
        ).map(category => category.id);

        this.selectedLocations = this.locations.filter(location =>
          response.body.result.locations.some((l: ILocation) => l.id === location.id)
        ).map(location => location.id);

        this.uploadedFiles = {
          name: response.body.result.application_url.replace("/uploads/vacancy/", ""),
          url: response.body.result.application_url
        }
        this.active = response.body.result.is_active ? 'active' : 'inactive'
      }
      this.loading = false
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  onTitleChange(e: any) {
    if (this.title.length) {
      this.errorObject.title.show = false
    }
  }

  onDescriptionChange(e: any) {
    if (this.description && this.description.trim() !== '<p></p>') {
      this.errorObject.description.show = false
    }
  }

  onCategory(event: any): void {
    if (this.selectedCatgeories.length) {
      this.errorObject.categories.show = false
    }
  }

  onLocation(event: any): void {
    if (this.selectedLocations.length) {
      this.errorObject.locations.show = false
    }
  }

  onActiveChange(value: string): void {
    console.log('Active status changed to:', value);
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

    if (!this.title || this.title.trim() === '') {
      this.errorObject.title.show = true
      return false
    } else {
      this.errorObject.title.show = false
    }

    if (!this.description || this.description.trim() === '<p></p>') {
      this.errorObject.description.show = true
      return false
    } else {
      this.errorObject.description.show = false
    }

    if (!this.selectedCatgeories || !this.selectedCatgeories.length) {
      this.errorObject.categories.show = true
      return false
    } else {
      this.errorObject.categories.show = false
    }

    if (!this.selectedLocations || !this.selectedLocations.length) {
      this.errorObject.locations.show = true
      return false
    } else {
      this.errorObject.locations.show = false
    }

    if(!this.uploadedFiles) {
      this.errorObject.file.show = true
      return false
    } else {
      this.errorObject.file.show = false
    }

    return true

  }

  async submitForm() {
    if (this.validate()) {
      try {
        const formData = {
          id: this.id,
          title: this.title,
          description: this.description,
          categories: this.selectedCatgeories,
          locations: this.selectedLocations,
          files: this.uploadedFiles,
          is_active: this.active === 'active' ? true : false
        }

        const response = await this.vacanciesService.updateVacancy(formData);
        if (response) {
          createMessage(this.message, response.status, response.message as string)
          if (response.status === 'success') {
            setTimeout(() => {
              this.router.navigate(['/designer-digest/employer/vacancies'])
            }, 800)
          }
        }
      } catch (e) {
        console.log('Create post error', e);
      }
    }
  }

  trackByFn(index: number, item: any): string {
    return item.id;
  }

}
