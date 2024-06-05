import { TestBed, inject } from '@angular/core/testing';

import { IndexTableService } from './index-table.service';

describe('IndexTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexTableService]
    });
  });

  it('should be created', inject([IndexTableService], (service: IndexTableService) => {
    expect(service).toBeTruthy();
  }));
});
