import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerLayoutComponent } from './layout.component';

describe('DesignerLayoutComponent', () => {
  let component: DesignerLayoutComponent;
  let fixture: ComponentFixture<DesignerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerLayoutComponent]
    });
    fixture = TestBed.createComponent(DesignerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
