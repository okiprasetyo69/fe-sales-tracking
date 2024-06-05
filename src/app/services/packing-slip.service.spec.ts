import {TestBed, inject} from '@angular/core/testing';

import {PackingSlipService} from './packing-slip.service';
import {AppModule} from "../app.module";


describe('services/packing-slip', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [PackingSlipService],
    });
  });

  it('should be created', inject([PackingSlipService], (service: PackingSlipService) => {
    expect(service).toBeTruthy();
  }));
});
