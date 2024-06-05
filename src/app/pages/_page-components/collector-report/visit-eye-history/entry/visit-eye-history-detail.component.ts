import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerSimple } from "@Model/response-customer";

@Component({
  selector: 'ngx-visit-eye-history-detail',
  templateUrl: './visit-eye-history-detail.component.html',
  styleUrls: ['./visit-eye-history-detail.component.scss'],
})
export class VisitEyeHistoryDetailComponent implements OnInit {
  customer: CustomerSimple;

  constructor(
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
  }


  closeModal() {
    this.activeModal.close();
    this.activeModal.dismiss();
  }

}
