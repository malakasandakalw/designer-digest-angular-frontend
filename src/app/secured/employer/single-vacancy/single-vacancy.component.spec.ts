import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVacancyComponent } from './single-vacancy.component';

describe('SingleVacancyComponent', () => {
  let component: SingleVacancyComponent;
  let fixture: ComponentFixture<SingleVacancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleVacancyComponent]
    });
    fixture = TestBed.createComponent(SingleVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
