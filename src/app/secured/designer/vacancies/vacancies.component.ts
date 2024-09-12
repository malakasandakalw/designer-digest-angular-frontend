import { Component } from '@angular/core';
import { DesignerCategory, DesignerLocations } from 'src/app/designers/designers.component';
import { Vacancy } from '../../employer/vacancies/vacancies.component';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { ApplicationsService } from 'src/services/api/applications.service';
import { DesignerCategoryService } from 'src/services/api/designer-category.service';
import { LocationsService } from 'src/services/api/locations.service';
import { VacanciesService } from 'src/services/api/vacancies.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent {

  loading = false
  appliedOnly = true

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
  async onPageSizeChange(size: number) {
    this.pageSize = size
    await this.getVacancies()
  }
}
