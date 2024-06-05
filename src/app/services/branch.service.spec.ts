import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {BranchService} from "./branch.service";


describe('services/branch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [BranchService],
    });
  });

  it('should be created', inject([BranchService], (service: BranchService) => {
    expect(service).toBeTruthy();
  }));
});
