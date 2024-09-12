import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: PublicResetPasswordComponent;
  let fixture: ComponentFixture<PublicResetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PublicResetPasswordComponent]
    });
    fixture = TestBed.createComponent(PublicResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
