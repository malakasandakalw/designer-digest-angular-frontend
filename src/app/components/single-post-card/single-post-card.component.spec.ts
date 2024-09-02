import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostCardComponent } from './single-post-card.component';

describe('SinglePostCardComponent', () => {
  let component: SinglePostCardComponent;
  let fixture: ComponentFixture<SinglePostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePostCardComponent]
    });
    fixture = TestBed.createComponent(SinglePostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
