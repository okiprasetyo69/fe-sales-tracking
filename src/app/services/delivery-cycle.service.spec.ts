import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {DeliveryCycleService} from "./delivery-cycle.service";


describe('services/delivery-cycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [DeliveryCycleService
      ],
    });
  });

  it('should be created', inject([DeliveryCycleService], (service: DeliveryCycleService) => {
    expect(service).toBeTruthy();
  }));
});
