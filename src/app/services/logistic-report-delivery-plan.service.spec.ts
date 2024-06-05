import { TestBed, inject } from '@angular/core/testing';

import { LogisticReportDeliveryPlanService } from './logistic-report-delivery-plan.service';

describe('LogisticReportDeliveryPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticReportDeliveryPlanService],
    });
  });

  it('should be created', inject([LogisticReportDeliveryPlanService], (service: LogisticReportDeliveryPlanService) => {
    expect(service).toBeTruthy();
  }));
});
