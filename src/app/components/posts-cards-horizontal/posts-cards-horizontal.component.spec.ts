import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCardsHorizontalComponent } from './posts-cards-horizontal.component';

describe('PostsCardsHorizontalComponent', () => {
  let component: PostsCardsHorizontalComponent;
  let fixture: ComponentFixture<PostsCardsHorizontalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsCardsHorizontalComponent]
    });
    fixture = TestBed.createComponent(PostsCardsHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
