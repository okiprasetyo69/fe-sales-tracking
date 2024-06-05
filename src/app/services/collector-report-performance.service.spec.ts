import { TestBed, inject } from '@angular/core/testing';

import { CollectorReportPerformanceService } from './collector-report-performance.service';

describe('CollectorReportPerformanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectorReportPerformanceService]
    });
  });

  it('should be created', inject([CollectorReportPerformanceService], (service: CollectorReportPerformanceService) => {
    expect(service).toBeTruthy();
  }));
});
