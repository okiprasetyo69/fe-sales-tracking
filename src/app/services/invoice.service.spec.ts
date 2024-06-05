import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {InvoiceService} from "./invoice.service";


describe('services/invoice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [InvoiceService],
    });
  });

  it('should be created', inject([InvoiceService], (service: InvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
