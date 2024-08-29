import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDesignerCategoryComponent } from './single-designer-category.component';

describe('SingleDesignerCategoryComponent', () => {
  let component: SingleDesignerCategoryComponent;
  let fixture: ComponentFixture<SingleDesignerCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleDesignerCategoryComponent]
    });
    fixture = TestBed.createComponent(SingleDesignerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
