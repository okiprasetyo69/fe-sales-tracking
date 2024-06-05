import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {GroupCycleService} from "./group-cycle.service";


describe('services/group-cycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [GroupCycleService],
    });
  });

  it('should be created', inject([GroupCycleService], (service: GroupCycleService) => {
    expect(service).toBeTruthy();
  }));
});
