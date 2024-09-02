import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { DesignerCategory } from 'src/app/common/interfaces/CommonInterface';
import { createMessage } from 'src/app/common/utils/messages';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { VacanciesService } from 'src/services/api/vacancies.service';

export interface ILocation {
  id: string,
  name: string
}

export interface UploadedVacancyFile {name: string, url: string}

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.css']
})
export class CreateVacancyComponent implements OnInit, OnDestroy {
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
  selectedCatgeories = [];

  locations: ILocation[] = [];
  selectedLocations = []

  uploadProgress = false
  uploadedFiles: UploadedVacancyFile | null = null

  loading = false
  loadingCategories = false
  loadingLocations = false

  constructor(
    private locationsService: LocationsService,
    private designerCategoriesService: DesignerCategoryService,
    private vacanciesService: VacanciesService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.editor = new Editor();
    await this.getCategories()
    await this.getLocations()
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
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

  onTitleChange(e: any) {
    if(this.title.length) {
      this.errorObject.title.show = false
    }
  }

  onDescriptionChange(e: any) {
    if(this.description && this.description.trim() !== '<p></p>') {
      this.errorObject.description.show = false
    }
  }

  onCategory() {
    if(this.selectedCatgeories.length) {
      this.errorObject.categories.show = false
    }
  }

  onLocation() {
    if(this.selectedLocations.length) {
      this.errorObject.locations.show = false
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

    if(!this.title || this.title.trim() === '') {
      this.errorObject.title.show = true
      return false
    } else {
      this.errorObject.title.show = false
    }

    if(!this.description || this.description.trim() === '<p></p>') {
      this.errorObject.description.show = true
      return false
    } else {
      this.errorObject.description.show = false
    }

    if(!this.selectedCatgeories || !this.selectedCatgeories.length) {
      this.errorObject.categories.show = true
      return false
    } else {
      this.errorObject.categories.show = false
    }

    if(!this.selectedLocations || !this.selectedLocations.length) {
      this.errorObject.locations.show = true
      return false
    } else {
      this.errorObject.locations.show = false
    }

    return true

  }

  async submitForm() {
    if(this.validate()) {
      try {
        const formData = {
          title: this.title,
          description: this.description,
          categories: this.selectedCatgeories,
          locations: this.selectedLocations,
          files: this.uploadedFiles,
        }

        const response = await this.vacanciesService.createVacancy(formData);
        if(response) {
          createMessage(this.message, response.status, response.message as string)
          if(response.status === 'success') {
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

}
