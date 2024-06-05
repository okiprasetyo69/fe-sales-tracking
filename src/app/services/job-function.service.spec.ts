import {TestBed, inject} from '@angular/core/testing';

import {JobFunctionService} from './job-function.service';
import {AppModule} from "../app.module";


describe('services/job-function', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [JobFunctionService],
    });
  });

  it('should be created', inject([JobFunctionService], (service: JobFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
