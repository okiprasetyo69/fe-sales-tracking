import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {DivisionsService} from "./divisions.service";


describe('services/divisions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [DivisionsService
      ],
    });
  });

  it('should be created', inject([DivisionsService], (service: DivisionsService) => {
    expect(service).toBeTruthy();
  }));
});
