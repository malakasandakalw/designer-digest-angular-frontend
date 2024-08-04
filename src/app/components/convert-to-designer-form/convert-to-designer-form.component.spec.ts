import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToDesignerFormComponent } from './convert-to-designer-form.component';

describe('ConvertToDesignerFormComponent', () => {
  let component: ConvertToDesignerFormComponent;
  let fixture: ComponentFixture<ConvertToDesignerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConvertToDesignerFormComponent]
    });
    fixture = TestBed.createComponent(ConvertToDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
