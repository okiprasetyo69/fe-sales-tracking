import {TestBed, inject} from '@angular/core/testing';

import {ApiService} from './api.service';
import {AppModule} from "../app.module";


describe('services/api', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
