import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacancy } from 'src/app/secured/employer/vacancies/vacancies.component';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-single-vacancy-card',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  templateUrl: './single-vacancy-card.component.html',
  styleUrls: ['./single-vacancy-card.component.css']
})
export class SingleVacancyCardComponent {
  @Input({required: true}) vacancy: Vacancy | null = null
  @Input({required: true}) isEmployer: boolean = false

  constructor(
    private router: Router,
  ) {

  }

  navigateToVacancy(vacancyId: string) {
    if(!vacancyId) return
    if(this.isEmployer) {
      this.router.navigate([`/designer-digest/employer/vacancies/${vacancyId}`])
    } else {
      this.router.navigate([`/vacancies/${vacancyId}`])
    }
  }

  navigateToEdit() {
    if(!this.isEmployer || !this.vacancy?.vacancy_id) return
    this.router.navigate([`/designer-digest/employer/update-vacancy/${this.vacancy?.vacancy_id}`])
  }

}
