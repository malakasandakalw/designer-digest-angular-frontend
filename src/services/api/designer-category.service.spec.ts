import { TestBed } from '@angular/core/testing';

import { DesignerCategoryService } from './designer-category.service';

describe('DesignerCategoryService', () => {
  let service: DesignerCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignerCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
