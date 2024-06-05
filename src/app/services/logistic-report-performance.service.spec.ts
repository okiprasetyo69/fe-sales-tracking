import { TestBed, inject } from '@angular/core/testing';

import { LogisticReportPerformanceService } from './logistic-report-performance.service';

describe('LogisticReportPerformanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticReportPerformanceService]
    });
  });

  it('should be created', inject([LogisticReportPerformanceService], (service: LogisticReportPerformanceService) => {
    expect(service).toBeTruthy();
  }));
});
