import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLayoutComponent } from './layout.component';

describe('PersonalLayoutComponent', () => {
  let component: PersonalLayoutComponent;
  let fixture: ComponentFixture<PersonalLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalLayoutComponent]
    });
    fixture = TestBed.createComponent(PersonalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
