import { Component, Input, OnInit } from '@angular/core';
import { DeliveryPlanReport, ImageModel, VisitPlanReport } from '@Model/response-plan';
import { PlanSummaryClass } from '@Model/response-plan-summary';

@Component({
  selector: 'ngx-visit-card-item',
  templateUrl: './visit-card-item.component.html',
  styleUrls: ['./visit-card-item.component.scss'],
})
export class VisitCardItemComponent implements OnInit {
  @Input() listImage: ImageModel[] = [];
  @Input() plan: PlanSummaryClass;
  @Input() messageEmpty: string = 'Empty';

  isPlanNull: boolean = true;
  countIsExist: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (typeof this.plan != 'undefined') {
      if (this.plan != null) {
        this.isPlanNull = false;
        this.countIsExist = this.listImage.filter(x => x.customer_code == this.plan.customer_code).length >= 1;
      }
    }
  }

  openNewTab(base64) {
    const newTab = window.open();
    newTab.document.body.innerHTML = '<img src="' + base64 + '">';
  }
}
