import { TestBed } from '@angular/core/testing';

import { RetrivingServiceAPIDataService } from './retrieve-api-data.service';

describe('RetrivingServiceAPIDataService', () => {
  let service: RetrivingServiceAPIDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrivingServiceAPIDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
