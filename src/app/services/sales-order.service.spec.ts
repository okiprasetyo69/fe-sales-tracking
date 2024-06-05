import {TestBed, inject} from '@angular/core/testing';

import {SalesOrderService} from './sales-order.service';
import {AppModule} from "../app.module";


describe('services/sales-order', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [SalesOrderService],
    });
  });

  it('should be created', inject([SalesOrderService], (service: SalesOrderService) => {
    expect(service).toBeTruthy();
  }));
});
