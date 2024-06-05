import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import {
  DeliveryPlanReport,
  ImageModel,
  PlanModel,
  PlanReport,
  PlanSummaryType,
  VisitPlanReport,
} from '@Model/response-plan';
import { VisitCardService } from './visit-card.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlanSummaryClass } from '@Model/response-plan-summary';

@Component({
  selector: 'ngx-visit-card',
  templateUrl: './visit-card.component.html',
  styleUrls: ['./visit-card.component.scss'],
})
export class VisitCardComponent implements OnInit {

  @Input() PlanSummaryType: PlanSummaryType;
  @Input() Plan: VisitPlanReport | DeliveryPlanReport;

  PlanReport: PlanReport;

  listImageVisit: ImageModel[] = [];
  listImageCompetitor: ImageModel[] = [];

  listVisitCard: PlanSummaryClass[] = [];

  loading: boolean = false;

  /** addtional data for search customer name */
  destination: any;
  destination_new: any;

  constructor(
    private visitCardService: VisitCardService,
    private _sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    if (typeof this.Plan != 'undefined') {
      if (this.Plan != null) {
        this.PlanReport = new PlanReport(this.Plan);
        if (typeof this.PlanSummaryType != 'undefined') {
          if (this.PlanSummaryType != null) {
            this.loading = true;
            this.visitCardService.show(this.PlanSummaryType, this.Plan).subscribe((planSummary) => {
              this.loading = false;
              this.listVisitCard = planSummary.data.data;
              this.listImageVisit = this.PlanReport.getListVisitImage(planSummary.data.data, this._sanitizer);
              this.listImageCompetitor = this.PlanReport.getListCompetitorImage(planSummary.data.data, this._sanitizer);
              this.destination = this.Plan.destination;
              this.destination_new = this.Plan.destination_new;
            }, error => {
              this.loading = false
            });
          }
        }
      }
    }
  }
}

@Pipe({name: 'CustomerName'})
export class CustomerName implements PipeTransform {
  transform(customer_code: string, plan: PlanModel): string {
    const resultCustomer = plan.destination.find(x => x.customer_code === customer_code);
    var customerName = (resultCustomer) ? resultCustomer.customer_name : null;
    if(customerName === null){
      const resultCustomer = plan.destination_new.find(x => x.customer_code === customer_code);
      var customerName = (resultCustomer) ? resultCustomer.customer_name: null;
    }
    return customerName;
  }
}


