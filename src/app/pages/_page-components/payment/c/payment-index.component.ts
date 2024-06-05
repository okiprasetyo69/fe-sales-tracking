/**
 * Deprecated !!!!!!!!!!!!!!
 */


import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../../services/payment.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { datatable_configs } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-payment-index',
  styleUrls: ['./payment-index.component.scss'],
  templateUrl: './payment-index.component.html',
})

export class PaymentIndexComponent implements OnInit, OnDestroy {
  datasets: Array<any> = []; // branch have initial value as blank array
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col;
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.route.queryParams.subscribe(params => {
      if (!!params.length) {
        this.page_start = +params['start'];
        this.page_length = +params['length'];
        this.page_search = params['search'];
        this.page_order_col = +params['order_col'];
        this.page_order_dir = params['order_dir'];
      }
      this.getDatatable();
    });
  }

  getDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      searching: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParams = dataTablesParameters;
        this.startNumber = this.dtParams['start'];
        this.paymentService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              // tslint:disable-next-line:max-line-length
              data: !!resp.data.total ? [{
                no: '',
                payment_date: '',
                code: '',
                customer_code: '',
                branch: '',
                division: '',
                sales_rep: '',
                status: '',
                action: '',
              }] : [],
            });
          }, errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false},
        {title: 'Date', data: 'payment_date', orderable: true},
        {title: 'Payment no', data: 'code', orderable: true},
        {title: 'Customer code', data: 'customer_code', orderable: true},
        {title: 'Branch', data: 'branch', orderable: true},
        {title: 'Division', data: 'division', orderable: true},
        {title: 'Sales Rep', data: 'sales_rep', orderable: true},
        {title: 'Status', data: 'status', orderable: true},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  dataShow(id) {
    this.router.navigate([`/pages/sales/activities/payment/view/${id}`]).then();
  }

  ngOnDestroy() {
    //
  }
}
