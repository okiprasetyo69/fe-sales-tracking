import { TestBed, inject } from '@angular/core/testing';

import { SalesReportInvoiceService } from './sales-report-invoice.service';

describe('SalesReportInvoiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportInvoiceService]
    });
  });

  it('should be created', inject([SalesReportInvoiceService], (service: SalesReportInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
