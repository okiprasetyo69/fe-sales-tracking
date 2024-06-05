import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {CustomerService} from "./customer.service";


describe('services/customer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CustomerService
      ],
    });
  });

  it('should be created', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
