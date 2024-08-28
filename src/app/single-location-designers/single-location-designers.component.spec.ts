import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLocationDesignersComponent } from './single-location-designers.component';

describe('SingleLocationDesignersComponent', () => {
  let component: SingleLocationDesignersComponent;
  let fixture: ComponentFixture<SingleLocationDesignersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleLocationDesignersComponent]
    });
    fixture = TestBed.createComponent(SingleLocationDesignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
