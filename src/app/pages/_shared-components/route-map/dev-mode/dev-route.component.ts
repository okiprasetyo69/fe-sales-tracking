import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-dev-route',
  templateUrl: './dev-route.component.html',
  styleUrls: ['./dev-route.component.scss']
})
export class DevRouteComponent {
  latitude: number = 0;
  longitude: number = 0;
  route = [];

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
