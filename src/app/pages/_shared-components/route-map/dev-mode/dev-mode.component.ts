import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dev-mode',
  templateUrl: './dev-mode.component.html',
  styleUrls: ['./dev-mode.component.scss']
})
export class DevModeComponent {
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
