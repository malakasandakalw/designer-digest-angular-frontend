import { Component, OnInit } from '@angular/core';
import { DesignerCategory, User } from 'src/app/common/interfaces/CommonInterface';
import { VacanciesService } from 'src/services/api/vacancies.service';
import { ILocation } from '../create-vacancy/create-vacancy.component';

export interface Vacancy {
  vacancy_id: string,
  title: string,
  description: string,
  application_url: string,
  is_active: boolean,
  created_by: User,
  created_at: string,
  categories: DesignerCategory[]
  locations: ILocation[]
  applications?: any[]
  applied: boolean
}

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  loading = false
  totalVacancies = 0;
  pageIndex = 1;
  pageSize = 20;

  vacancies: Vacancy[] = []

  selectedCategories: string[] = []
  selectedLocations: string[] = []
  searchText: string = ''
  active = true

  constructor(
    private vacancyService: VacanciesService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getVacanciesByEmployer()
  }

  async getVacanciesByEmployer() {
    try {
      this.loading = true
      const filterData = {
        active: this.active,
        search: this.searchText,
        categories: this.selectedCategories,
        locations: this.selectedLocations,
        page_index: this.pageIndex,
        page_size: this.pageSize
      }
      const response = await this.vacancyService.getByEmployer(filterData)
      if(response) {
        this.totalVacancies = response.body.result.total
        this.vacancies = response.body.result.vacancies
        console.log(response)
      }
      this.loading = false
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  async onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex
    await this.getVacanciesByEmployer();
  }

  async onSearchChange(value: string) {
    this.searchText = value
    await this.getVacanciesByEmployer()
  }

  async onFilterCategoryChange(value: string[]) {
    this.selectedCategories = value
    await this.getVacanciesByEmployer()
  }

  async onFilterLocationChange(value: string[]) {
    this.selectedLocations = value
    await this.getVacanciesByEmployer()
  }

  async onActiveChange(value: boolean) {
    this.active = value
    await this.getVacanciesByEmployer()
  }

}
