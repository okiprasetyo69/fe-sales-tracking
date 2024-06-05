import {TestBed, inject} from '@angular/core/testing';

import {PaymentService} from './payment.service';
import {AppModule} from "../app.module";


describe('services/payment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PaymentService],
    });
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});
