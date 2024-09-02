import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadVacancyComponent } from './file-upload-vacancy.component';

describe('FileUploadVacancyComponent', () => {
  let component: FileUploadVacancyComponent;
  let fixture: ComponentFixture<FileUploadVacancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileUploadVacancyComponent]
    });
    fixture = TestBed.createComponent(FileUploadVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
