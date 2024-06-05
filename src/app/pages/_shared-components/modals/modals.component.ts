import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent {

  modalHeader: string;
  modalContent = `Test With Nothing`;

  constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }

}
