import { TestBed } from '@angular/core/testing';

import { DesignerRouteGuardService } from './designer-route-guard.service';

describe('DesignerRouteGuardService', () => {
  let service: DesignerRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesignerRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
