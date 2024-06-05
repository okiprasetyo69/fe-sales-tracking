import { TestBed, inject } from '@angular/core/testing';

import { SalesReportAlertService } from './sales-report-alert.service';

describe('SalesReportAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesReportAlertService]
    });
  });

  it('should be created', inject([SalesReportAlertService], (service: SalesReportAlertService) => {
    expect(service).toBeTruthy();
  }));
});
