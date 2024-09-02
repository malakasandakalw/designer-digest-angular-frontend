import { TestBed } from '@angular/core/testing';

import { PersonalRouteGuardService } from './personal-route-guard.service';

describe('PersonalRouteGuardService', () => {
  let service: PersonalRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
