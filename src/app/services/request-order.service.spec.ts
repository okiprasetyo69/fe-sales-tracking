import {TestBed, inject} from '@angular/core/testing';

import {RequestOrderService} from './request-order.service';
import {AppModule} from "../app.module";


describe('services/request-order', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [RequestOrderService],
    });
  });

  it('should be created', inject([RequestOrderService], (service: RequestOrderService) => {
    expect(service).toBeTruthy();
  }));
});
