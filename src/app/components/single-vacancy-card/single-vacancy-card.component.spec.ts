import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVacancyCardComponent } from './single-vacancy-card.component';

describe('SingleVacancyCardComponent', () => {
  let component: SingleVacancyCardComponent;
  let fixture: ComponentFixture<SingleVacancyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleVacancyCardComponent]
    });
    fixture = TestBed.createComponent(SingleVacancyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
