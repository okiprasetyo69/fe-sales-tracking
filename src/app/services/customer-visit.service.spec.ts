import { TestBed, inject } from '@angular/core/testing';

import { CustomerVisitService } from './customer-visit.service';

describe('CustomerVisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerVisitService]
    });
  });

  it('should be created', inject([CustomerVisitService], (service: CustomerVisitService) => {
    expect(service).toBeTruthy();
  }));
});
