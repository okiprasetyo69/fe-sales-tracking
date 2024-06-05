import { TestBed, inject } from '@angular/core/testing';

import { VisitCardService } from './visit-card.service';

describe('VisitCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitCardService]
    });
  });

  it('should be created', inject([VisitCardService], (service: VisitCardService) => {
    expect(service).toBeTruthy();
  }));
});
