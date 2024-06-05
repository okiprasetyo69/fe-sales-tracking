import { TestBed, inject } from '@angular/core/testing';

import { SalesReportSalesOrderService } from './sales-report-sales-order.service';

describe('SalesReportSalesOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportSalesOrderService]
    });
  });

  it('should be created', inject([SalesReportSalesOrderService], (service: SalesReportSalesOrderService) => {
    expect(service).toBeTruthy();
  }));
});
