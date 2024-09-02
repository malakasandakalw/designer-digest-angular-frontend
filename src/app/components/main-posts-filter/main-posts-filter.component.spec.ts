import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPostsFilterComponent } from './main-posts-filter.component';

describe('MainPostsFilterComponent', () => {
  let component: MainPostsFilterComponent;
  let fixture: ComponentFixture<MainPostsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainPostsFilterComponent]
    });
    fixture = TestBed.createComponent(MainPostsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
