import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { datatable_configs } from '../../../../../configs/configs';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesReportOrderSalesService } from '../../../../../services/sales-report-order-sales.service';
import { OauthService } from '../../../../../services/oauth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ExcelService } from '../../../../../services/excel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterOrderSalesComponent } from '../entry/filter-order-sales.component';
import { DataTableDirective } from 'angular-datatables';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'ngx-order-sales-index',
  templateUrl: './order-sales-index.component.html',
  styleUrls: ['./order-sales-index.component.scss'],
})
export class OrderSalesIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  datasets: Array<any> = []; // branch have initial value as blank array
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col; // default sort by date
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

  profileUser;

  dataFormFilter: FormGroup;
  todayDate: any = {
    // @ts-ignore
    year: new Date().getFullYear(),
    // @ts-ignore
    month: new Date().getMonth() + 1,
    // @ts-ignore
    day: new Date().getDate(),
  };

  default_date = this.todayDate.year.toString().concat('-').concat(this.autoDigit(this.todayDate.month)).concat('-').concat(this.autoDigit(this.todayDate.day));
  dateStringTitle = 'All';

  constructor(
    private requestOrderService: SalesReportOrderSalesService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private oauthService: OauthService,
    private toasterService: ToasterService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.profileUser = this.oauthService.getProfile();
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
    this.prepareFilterForm();
  }

  prepareFilterForm() {
    this.dataFormFilter = this.fb.group({
      date_start: null,
      date_end: null,
      data_filter_by: null,
      user_id: [],
      username: [],
      branch_id: [],
      division_id: [],
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
    this.dataFormFilter.patchValue({data_filter_by: 1});
  }

  autoDigit(number) {
    return (number < 10) ? '0'.concat(number) : number;
  }

  getDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: this.page_length,
      serverSide: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParams = dataTablesParameters;
        this.requestOrderService.indexDatatables(dataTablesParameters, this.dataFormFilter)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                date: '',
                branch: '',
                division: '',
                code: '',
                customer: '',
                sales_rep: '',
                is_special_order: '',
              }] : [],
            });
          }, errors => {
            const errorMessage = 'Something wrong with error: ' +
              errors.message + '. Error detail: ' + errors.error.message;
            this.toasterService.popAsync('error', 'Error', errorMessage);
          });
      },
      columns: [
        {data: 'no', orderable: false, searchable: false},
        {data: 'date', searchable: false, orderable: true},
        {data: 'branch', orderable: true},
        {data: 'division', orderable: true},
        {data: 'code', orderable: true, searchable: true},
        {data: 'customer', searchable: true, orderable: true},
        {data: 'sales_rep', searchable: false, orderable: false},
        {data: 'is_special_order', searchable: false, orderable: true},
      ],
    };
  }

  print() {
    console.info('Print');
    let popupWin, x, table, row, i;
    i = 0;
    table = '';
    for (x of this.datasets) {
      i = i + 1;
      row = '';
      row += '<tr>';
      row += '<td>' + i + '</td>';
      row += '<td>' + x.create_date + '</td>';
      row += '<td>' + x.user.branch_name + '</td>';
      row += '<td>' + x.user.division_name + '</td>';
      row += '<td>' + x.code + '</td>';
      row += '<td>' + x.customer.name + '</td>';
      row += '<td>' + x.user.employee_name + '</td>';
      row += '<td>' + (x.is_special_order ? 'Special' : 'Reguler') + '</td>';
      row += '</tr>';
      table += row;
    }
    // document.getElementById('list_section').innerHTML;
    popupWin = window.open('', '_blank', 'width=500,toolbar=no,location=no');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title id="title"></title>
          <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css"/>
          <style type="text/css" media="print">
            @page { size: landscape; }
          </style>
        </head>
        <body>
          <h1 class="page-header">Report Request Order</h1>
          <table class="table table-bordered">
            <thead>
              <tr>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Branch</th>
                  <th>Division</th>
                  <th>No. Request Order</th>
                  <th>Customer</th>
                  <th>Sales Rep.</th>
                  <th>Order Type</th>
                </tr>
              </tr>
            </thead>
            <tbody id="list_section"></tbody>
          </table>
        </body>
      </html>
    `);
    popupWin.document.getElementById('title').innerHTML = 'Print By : ' + this.profileUser.username + ' - ' + this.profileUser.name;
    popupWin.document.getElementById('list_section').innerHTML = table;
    popupWin.print();
    popupWin.document.close();
  }

  export() {
    let x, i, row, data;
    i = 0;
    data = [];
    for (x of this.datasets) {
      i = i + 1;
      row = {
        'No': i,
        'Date': x.create_date,
        'Branch': x.user.branch_name,
        'Division': x.user.division_name,
        'No. Request Order': x.code,
        'Customer': x.customer.name,
        'Sales Rep.': x.user.employee_name,
        'Order Type': (x.is_special_order ? 'Special' : 'Reguler'),
      };
      data.push(row);
    }
    this.excelService.exportAsExcelFile(data, 'request-order');
  }

  dataFilter() {
    const activeModal = this.modalService.open(FilterOrderSalesComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.dataForm = this.dataFormFilter;

    activeModal.componentInstance.filterData.subscribe(dataFiltered => {
      this.dataFormFilter = dataFiltered;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.draw();
      });
      const default_date = this.default_date;
      const start_date = dataFiltered.controls['date_start'].value;
      const end_date = dataFiltered.controls['date_end'].value;
      const data_filter_by = dataFiltered.controls['data_filter_by'].value;

      let stringData = '';
      if (data_filter_by == 1) {
        stringData = 'All';
        this.dateStringTitle = stringData;
      } else {
        if (start_date === default_date && end_date === default_date) {
          this.dateStringTitle = 'Today'.concat(' ').concat(default_date);
        } else {
          if (start_date === default_date) {
            stringData = 'Today'.concat(' ').concat(default_date);
          } else {
            stringData = start_date;
          }
          stringData = stringData.concat(' - ');
          if (end_date === default_date) {
            stringData = stringData.concat('Today').concat(' ').concat(default_date);
          } else {
            stringData = stringData.concat(end_date);
          }
          this.dateStringTitle = stringData;
        }
      }

    });
  }

  exportExcel() {
    this.toasterService.popAsync('info', 'Start Download', 'Generating, Pleasewait...');
    this.requestOrderService.exportExcel(this.dtParams, this.dataFormFilter).subscribe(data => {
        fileSaver.saveAs(data, 'request-order-report.xlsx');
        this.toasterService.popAsync('success', 'Success', 'Ready to download');
      },
      errors => {
        let errorMessage = 'Something wrong with error: ' +
          errors.message;
        if (errors.error && errors.error.message) {
          errorMessage = errors.error.message;
        }
        console.info('ada error datatable:', errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
      },
      () => console.info('Completed file download.'));
  }

  exportPdf() {
    this.toasterService.popAsync('info', 'Start Download', 'Generating, Pleasewait...');
    this.requestOrderService.exportPdf(this.dtParams, this.dataFormFilter).subscribe(data => {
        console.info(`pdf data: ${data}`);
        fileSaver.saveAs(data, 'request-order-report.pdf');
        this.toasterService.popAsync('success', 'Success', 'Ready to download');
      },
      errors => {
        let errorMessage = 'Something wrong with error: ' +
          errors.message;
        if (errors.error && errors.error.message) {
          errorMessage = errors.error.message;
        }
        console.info('ada error datatable:', errors);
        this.toasterService.popAsync('error', 'Error', errorMessage);
      },
      () => console.info('Completed file download.'));
  }


  ngOnDestroy() {
    //
  }
}