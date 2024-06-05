import { TestBed, inject } from '@angular/core/testing';

import { LogisticReportPackingSlipService } from './logistic-report-packing-slip.service';

describe('LogisticReportPackingSlipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticReportPackingSlipService]
    });
  });

  it('should be created', inject([LogisticReportPackingSlipService], (service: LogisticReportPackingSlipService) => {
    expect(service).toBeTruthy();
  }));
});
