import { TestBed, inject } from '@angular/core/testing';

import { CollectorDashboardService } from './collector-dashboard.service';

describe('CollectorDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectorDashboardService]
    });
  });

  it('should be created', inject([CollectorDashboardService], (service: CollectorDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
