import { TestBed, inject } from '@angular/core/testing';

import { SalesReportPerformanceService } from './sales-report-performance.service';

describe('SalesReportPerformanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportPerformanceService]
    });
  });

  it('should be created', inject([SalesReportPerformanceService], (service: SalesReportPerformanceService) => {
    expect(service).toBeTruthy();
  }));
});
