import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDesignerComponent } from './single-designer.component';

describe('SingleDesignerComponent', () => {
  let component: SingleDesignerComponent;
  let fixture: ComponentFixture<SingleDesignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleDesignerComponent]
    });
    fixture = TestBed.createComponent(SingleDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
