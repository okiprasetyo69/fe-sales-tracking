import { TestBed, inject } from '@angular/core/testing';

import { ModalDeleteService } from './modal-delete.service';

describe('ModalDeleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalDeleteService]
    });
  });

  it('should be created', inject([ModalDeleteService], (service: ModalDeleteService) => {
    expect(service).toBeTruthy();
  }));
});
