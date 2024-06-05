import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {DeliveryPlanService} from "./delivery-plan.service";


describe('services/delivery-plan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [DeliveryPlanService,
      ],
    });
  });

  it('should be created', inject([DeliveryPlanService], (service: DeliveryPlanService) => {
    expect(service).toBeTruthy();
  }));
});
