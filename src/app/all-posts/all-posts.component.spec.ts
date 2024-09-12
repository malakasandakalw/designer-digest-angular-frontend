import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllPostsComponent } from './all-posts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For routing
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { PostsService } from 'src/services/api/posts.service';

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;
  let apiAuthServiceSpy: jasmine.SpyObj<ApiAuthService>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('ApiAuthService', ['getCurrentUser']);
    const postSpy = jasmine.createSpyObj('PostsService', ['getPosts']);

    TestBed.configureTestingModule({
      declarations: [AllPostsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule], // Import HttpClientTestingModule
      providers: [
        { provide: ApiAuthService, useValue: authSpy },
        { provide: PostsService, useValue: postSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllPostsComponent);
    component = fixture.componentInstance;

    apiAuthServiceSpy = TestBed.inject(ApiAuthService) as jasmine.SpyObj<ApiAuthService>;
    postsServiceSpy = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;

    // Mock the return value of getCurrentUser
    apiAuthServiceSpy.getCurrentUser.and.returnValue({ user: { id: 'user123', first_name: 'John', last_name: 'Doe', email: 'john@example.com', profile_picture: null } });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
