import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { InvoiceService } from '../../../../services/invoice.service';
import { MenuService } from '../../../../services/menu.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.scss'],
})
export class InvoiceShowComponent implements OnInit, OnDestroy {
  datasets: Array<any> = [];
  dataItems: Array<any> = [];
  id: number;
  isLoadingGeneral: boolean = true;
  totalPrice: number = 0;
  paymentAmount: number = 0;
  invoiceAmount: number = 0;
  dataCustomer = [];
  dataUser = [];
  pic;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: ToasterService,
    private menuService: MenuService,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      // get data detail
      this.invoiceService.show(this.id)
        .pipe(untilDestroyed(this))
        .subscribe(resp => {
          // console.log(resp.data);
          if (!resp.data) {
            this.location.back();
          } else {
            this.datasets = resp.data;
            this.dataItems = resp.data.product;
            this.dataCustomer = resp.data.customer;
            this.isLoadingGeneral = false;
            console.info(resp);
            let x;
            for (x of resp.data.product) {
              const price = (x.quantity * x.unit_price);
              this.totalPrice += price;
            }
            this.pic = resp.data.customer.contacts[0].name
            this.paymentAmount = resp.data.payment_amount;
            this.invoiceAmount = resp.data.invoice_amount;
            this.dataUser = resp.data.user;
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
