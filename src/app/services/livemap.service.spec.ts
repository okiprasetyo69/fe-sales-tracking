import {TestBed, inject} from '@angular/core/testing';

import {LivemapService} from './livemap.service';
import {AppModule} from "../app.module";


describe('services/livemap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [LivemapService],
    });
  });

  it('should be created', inject([LivemapService], (service: LivemapService) => {
    expect(service).toBeTruthy();
  }));
});
