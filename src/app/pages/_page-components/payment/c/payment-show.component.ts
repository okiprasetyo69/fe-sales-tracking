import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PaymentService } from '../../../../services/payment.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-payment-show',
  templateUrl: './payment-show.component.html',
  styleUrls: ['./payment-show.component.scss'],
})
export class PaymentShowComponent implements OnInit, OnDestroy {
  datasets: Array<any> = [];
  dataItems: Array<any> = [];
  id: number;
  isLoadingGeneral: boolean = true;
  total = 0;
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // get data detail
      this.paymentService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
            // console.log(resp.data);
            if (!resp.data) {
              this.location.back();
            } else {
              this.datasets = resp.data;
              this.dataItems = resp.data.product;
              let totalProduct = 0, myData;
              for (myData of resp.data.product){
                totalProduct += myData.quantity * myData.unit_price;
              }
              this.total = totalProduct;
              console.info(resp.data);
              this.isLoadingGeneral = false;
            }
          },
          errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
            setTimeout(() => {
              this.location.back();
            }, 2000);
          });
    });
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    //
  }
}
