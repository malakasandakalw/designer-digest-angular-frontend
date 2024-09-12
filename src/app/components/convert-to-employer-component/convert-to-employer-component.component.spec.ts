import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToEmployerComponent } from './convert-to-employer-component.component';

describe('ConvertToEmployerComponent', () => {
  let component: ConvertToEmployerComponent;
  let fixture: ComponentFixture<ConvertToEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertToEmployerComponent]
    });
    fixture = TestBed.createComponent(ConvertToEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
