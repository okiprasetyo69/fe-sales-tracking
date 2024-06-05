import { TestBed, inject } from '@angular/core/testing';

import { SalesReportOrderSalesService } from './sales-report-order-sales.service';

describe('SalesReportOrderSalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportOrderSalesService]
    });
  });

  it('should be created', inject([SalesReportOrderSalesService], (service: SalesReportOrderSalesService) => {
    expect(service).toBeTruthy();
  }));
});
