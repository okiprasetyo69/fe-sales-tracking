import { TestBed, inject } from '@angular/core/testing';

import { SalesReportVisitPlanService } from './sales-report-visit-plan.service';

describe('SalesReportVisitPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportVisitPlanService],
    });
  });

  it('should be created', inject([SalesReportVisitPlanService], (service: SalesReportVisitPlanService) => {
    expect(service).toBeTruthy();
  }));
});
