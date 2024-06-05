import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './modal-delete.component';

@Injectable()
export class ModalDeleteService {

  constructor(
    private modalService: NgbModal,
  ) {
  }

  deleteData(id, tableElement, service, type = null, data = null) {
    const activeModal = this.modalService.open(ModalDeleteComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    activeModal.componentInstance.modalHeader = 'Are you sure ?';
    activeModal.componentInstance.dtElement = tableElement;
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.service = service;
    activeModal.componentInstance.type = type;
    if (type == 'employee') {
      console.info('Type Employee');
      activeModal.componentInstance.job_function = data.feature;
    }
  }
}
