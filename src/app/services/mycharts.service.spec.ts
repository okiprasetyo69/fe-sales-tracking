import { TestBed, inject } from '@angular/core/testing';

import { MychartsService } from './mycharts.service';

describe('MychartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MychartsService]
    });
  });

  it('should be created', inject([MychartsService], (service: MychartsService) => {
    expect(service).toBeTruthy();
  }));
});
