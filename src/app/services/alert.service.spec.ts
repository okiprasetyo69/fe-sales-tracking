import {TestBed, inject} from '@angular/core/testing';

import {AppModule} from "../app.module";
import {AlertService} from "./alert.service";


describe('services/alert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [AlertService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
