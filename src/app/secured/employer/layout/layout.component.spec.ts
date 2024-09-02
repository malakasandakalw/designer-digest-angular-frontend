import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: EmployerLayoutComponent;
  let fixture: ComponentFixture<EmployerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerLayoutComponent]
    });
    fixture = TestBed.createComponent(EmployerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
