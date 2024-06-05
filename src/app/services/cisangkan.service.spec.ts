import { TestBed, inject } from '@angular/core/testing';

import { CisangkanService } from './cisangkan.service';

describe('CisangkanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CisangkanService]
    });
  });

  it('should be created', inject([CisangkanService], (service: CisangkanService) => {
    expect(service).toBeTruthy();
  }));
});
