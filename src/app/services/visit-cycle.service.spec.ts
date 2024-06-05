import {TestBed, inject} from '@angular/core/testing';

import {VisitCycleService} from './visit-cycle.service';
import {AppModule} from "../app.module";


describe('services/visit-cycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [VisitCycleService],
    });
  });

  it('should be created', inject([VisitCycleService], (service: VisitCycleService) => {
    expect(service).toBeTruthy();
  }));
});
