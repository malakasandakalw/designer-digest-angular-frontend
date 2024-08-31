import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacancy } from 'src/app/secured/employer/vacancies/vacancies.component';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-single-vacancy-card',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule, NzAvatarModule, NzToolTipModule],
  templateUrl: './single-vacancy-card.component.html',
  styleUrls: ['./single-vacancy-card.component.css']
})
export class SingleVacancyCardComponent {
  @Input({required: true}) vacancy: Vacancy | null = null
  @Input({required: true}) isEmployer: boolean = false
  @Input() isDesignerEdit: boolean = false
  @Output() emitOpenApplyModel = new EventEmitter<string>();

  get currentUser() {
    return this.apiAuthService.getCurrentUser().user
  }

  get isDesigner() {
    if(this.currentUser) return this.apiAuthService.isDesigner()
    return false
  }

  constructor(
    private router: Router,
    private apiAuthService: ApiAuthService
  ) {

  }

  navigateToVacancy(vacancyId: string) {
    if(!vacancyId) return
    if(this.isEmployer) {
      this.router.navigate([`/designer-digest/employer/vacancies/${vacancyId}`])
    }
  }

  navigateToEdit() {
    if(!this.isEmployer || !this.vacancy?.vacancy_id) return
    this.router.navigate([`/designer-digest/employer/update-vacancy/${this.vacancy?.vacancy_id}`])
  }

  openApplyModel() {
    this.emitOpenApplyModel.emit(this.vacancy?.vacancy_id)
    if(this.isDesignerEdit) {
      if(this.isDesigner) {
        this.router.navigate([`/designer-digest/designer/applications/${this.vacancy?.vacancy_id}`])
      }
    }
  }

}
