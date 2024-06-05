import { TestBed, inject } from '@angular/core/testing';

import { LogisticReportAlertService } from './logistic-report-alert.service';

describe('LogisticReportAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticReportAlertService]
    });
  });

  it('should be created', inject([LogisticReportAlertService], (service: LogisticReportAlertService) => {
    expect(service).toBeTruthy();
  }));
});
