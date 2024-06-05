import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {CompanyService} from "./company.service";


describe('services/company', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CompanyService
      ],
    });
  });

  it('should be created', inject([CompanyService], (service: CompanyService) => {
    expect(service).toBeTruthy();
  }));
});
