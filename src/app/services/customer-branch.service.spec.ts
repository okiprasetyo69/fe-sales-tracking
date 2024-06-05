import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {CustomerBranchService} from "./customer-branch.service";


describe('services/customer-branch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [CustomerBranchService
      ],
    });
  });

  it('should be created', inject([CustomerBranchService], (service: CustomerBranchService) => {
    expect(service).toBeTruthy();
  }));
});
