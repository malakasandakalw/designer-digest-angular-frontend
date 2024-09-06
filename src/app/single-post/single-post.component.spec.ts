import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostComponentPublic } from './single-post.component';

describe('SinglePostComponentPublic', () => {
  let component: SinglePostComponentPublic;
  let fixture: ComponentFixture<SinglePostComponentPublic>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePostComponentPublic]
    });
    fixture = TestBed.createComponent(SinglePostComponentPublic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
