import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToEmployerComponentComponent } from './convert-to-employer-component.component';

describe('ConvertToEmployerComponentComponent', () => {
  let component: ConvertToEmployerComponentComponent;
  let fixture: ComponentFixture<ConvertToEmployerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertToEmployerComponentComponent]
    });
    fixture = TestBed.createComponent(ConvertToEmployerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
