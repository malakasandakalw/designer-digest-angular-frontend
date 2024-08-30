import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadApplicationComponent } from './file-upload-application.component';

describe('FileUploadApplicationComponent', () => {
  let component: FileUploadApplicationComponent;
  let fixture: ComponentFixture<FileUploadApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileUploadApplicationComponent]
    });
    fixture = TestBed.createComponent(FileUploadApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
