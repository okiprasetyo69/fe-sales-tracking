import { TestBed, inject } from '@angular/core/testing';

import { RouteMapService } from './route-map.service';

describe('RouteMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteMapService]
    });
  });

  it('should be created', inject([RouteMapService], (service: RouteMapService) => {
    expect(service).toBeTruthy();
  }));
});
