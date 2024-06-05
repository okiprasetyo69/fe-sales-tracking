import { TestBed, inject } from '@angular/core/testing';

import { SalesReportPaymentService } from './sales-report-payment.service';

describe('SalesReportPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportPaymentService]
    });
  });

  it('should be created', inject([SalesReportPaymentService], (service: SalesReportPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
