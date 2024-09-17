import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vacancy } from '../vacancies/vacancies.component';
import { VacanciesService } from 'src/services/api/vacancies.service';

@Component({
  selector: 'app-single-vacancy',
  templateUrl: './single-vacancy.component.html',
  styleUrls: ['./single-vacancy.component.css']
})
export class SingleVacancyComponent implements OnInit{

  id: string | null = null

  loading = false

  vacancy: Vacancy | null = null

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacanciesService
  ){

  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    await this.getVacancyById()
  }

  async getVacancyById() {
    if(!this.id) return
    try {
      this.loading = true
      const response = await this.vacancyService.getFullById(this.id)
      if(response) {
        this.vacancy = response.body.result
      }
      this.loading = false
    } catch (error) {
      console.log(error)
      this.loading = false
    }
  }

  getEncodedFilePath(filePath: string): string {
    return encodeURIComponent(filePath.replace('/uploads/', ''));
  }

}
