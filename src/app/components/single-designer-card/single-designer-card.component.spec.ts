import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDesignerCardComponent } from './single-designer-card.component';

describe('SingleDesignerCardComponent', () => {
  let component: SingleDesignerCardComponent;
  let fixture: ComponentFixture<SingleDesignerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleDesignerCardComponent]
    });
    fixture = TestBed.createComponent(SingleDesignerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
