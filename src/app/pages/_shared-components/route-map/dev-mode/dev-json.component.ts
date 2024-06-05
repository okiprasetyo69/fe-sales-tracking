import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dev-json',
  templateUrl: './dev-json.component.html',
  styleUrls: ['./dev-json.component.scss']
})
export class DevJsonComponent {
  dataRoutes: any;

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
