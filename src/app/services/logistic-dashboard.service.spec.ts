import { TestBed, inject } from '@angular/core/testing';

import { LogisticDashboardService } from './logistic-dashboard.service';

describe('LogisticDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogisticDashboardService]
    });
  });

  it('should be created', inject([LogisticDashboardService], (service: LogisticDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
