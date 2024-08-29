import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyFilterComponent } from './vacancy-filter.component';

describe('VacancyFilterComponent', () => {
  let component: VacancyFilterComponent;
  let fixture: ComponentFixture<VacancyFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VacancyFilterComponent]
    });
    fixture = TestBed.createComponent(VacancyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
