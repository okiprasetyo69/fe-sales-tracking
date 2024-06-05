import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { SalesOrderService } from '../../../../services/sales-order.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-sales-order-show',
  templateUrl: './sales-order-show.component.html',
  styleUrls: ['./sales-order-show.component.scss'],
})
export class SalesOrderShowComponent implements OnInit, OnDestroy {
  datasets: Array<any> = [];
  dataItems: Array<any> = [];
  id: number;
  isLoadingGeneral: boolean = true;
  total = 0;

  constructor(
    private soService: SalesOrderService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // id is using code

      // get data detail
      this.soService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
          console.info(resp.data);
          if (!resp.data) {
            this.location.back();
          } else {
            this.datasets = resp.data;
            this.dataItems = resp.data.product;
          }
          let totalProduct = 0;
          let myData;
          for (myData of resp.data.product) {
            totalProduct += myData.quantity * myData.unit_price;
          }
          this.total = totalProduct;
          console.info(totalProduct, ' = ', this.total);
          this.isLoadingGeneral = false;
        },
        errors => {
          this.toasterService.popAsync('error', 'Error', errors.error.message);
          setTimeout(() => {
            this.location.back();
          }, 4000);
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
