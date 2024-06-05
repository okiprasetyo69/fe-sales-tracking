import { TestBed, inject } from '@angular/core/testing';

import { DeliveryRouteService } from './delivery-route.service';

describe('DeliveryRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryRouteService]
    });
  });

  it('should be created', inject([DeliveryRouteService], (service: DeliveryRouteService) => {
    expect(service).toBeTruthy();
  }));
});
