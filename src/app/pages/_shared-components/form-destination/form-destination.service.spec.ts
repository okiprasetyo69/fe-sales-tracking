import { TestBed, inject } from '@angular/core/testing';

import { FormDestinationService } from './form-destination.service';

describe('FormDestinationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDestinationService]
    });
  });

  it('should be created', inject([FormDestinationService], (service: FormDestinationService) => {
    expect(service).toBeTruthy();
  }));
});
