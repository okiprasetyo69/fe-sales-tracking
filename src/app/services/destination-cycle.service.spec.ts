import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {DestinationCycleService} from "./destination-cycle.service";


describe('services/destination-cycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [DestinationCycleService
      ],
    });
  });

  it('should be created', inject([DestinationCycleService], (service: DestinationCycleService) => {
    expect(service).toBeTruthy();
  }));
});
