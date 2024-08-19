import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersComponent } from './designers.component';

describe('DesignersComponent', () => {
  let component: DesignersComponent;
  let fixture: ComponentFixture<DesignersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignersComponent]
    });
    fixture = TestBed.createComponent(DesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
