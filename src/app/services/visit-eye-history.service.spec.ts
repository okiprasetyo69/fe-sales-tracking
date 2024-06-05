import { TestBed, inject } from '@angular/core/testing';

import { VisitEyeHistoryService } from './visit-eye-history.service';

describe('VisitEyeHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitEyeHistoryService]
    });
  });

  it('should be created', inject([VisitEyeHistoryService], (service: VisitEyeHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
