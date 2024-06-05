import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { datatable_configs } from '../../../../../configs/configs';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesReportAlertService } from '../../../../../services/sales-report-alert.service';
import { OauthService } from '../../../../../services/oauth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ExcelService } from '../../../../../services/excel.service';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterAlertComponent } from '../entry/filter-alert.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'ngx-alert-index',
  templateUrl: './alert-index.component.html',
  styleUrls: ['./alert-index.component.scss'],
})
export class AlertIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  datasets: Array<any> = [];
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col;
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
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private salesReportAlertService: SalesReportAlertService,
    private oauthService: OauthService,
    private excelService: ExcelService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
    this.profileUser = this.oauthService.getProfile();
    this.route.queryParams
      .subscribe(params => {
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
      searching: true,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        this.dtParams = dataTablesParameters;
        this.startNumber = this.dtParams['start'];
        this.salesReportAlertService.indexDatatables(dataTablesParameters, this.dataFormFilter)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            console.info(resp);
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                date: '',
                user_name: '',
                branch_name: '',
                division_name: '',
                description: '',
              }] : [],
            });
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false, width: '5%'},
        {title: 'Date', data: 'date', orderable: true},
        {title: 'User', data: 'user_name', orderable: false},
        {title: 'Branch', data: 'branch_name', orderable: false},
        {title: 'Division', data: 'division_name', orderable: false},
        {title: 'Description', data: 'description', orderable: false},
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
      row += '<td>' + x.date + '</td>';
      row += '<td>' + x.create_user.name + '</td>';
      row += '<td>' + x.create_user.branch_name + '</td>';
      row += '<td>' + x.create_user.division_name + '</td>';
      row += '<td>' + x.notes + '</td>';
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
          <h1 class="page-header">Report Alert</h1>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>User</th>
                <th>Branch</th>
                <th>Division</th>
                <th>Description</th>
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
        'Date': x.date,
        'User': x.create_user.name,
        'Branch': x.create_user.branch_name,
        'Division': x.create_user.division_name,
        'Description': x.notes,
      };
      data.push(row);
    }
    this.excelService.exportAsExcelFile(data, 'sales-alert');
  }

  dataFilter() {
    const activeModal = this.modalService.open(FilterAlertComponent, {
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
    this.salesReportAlertService.exportExcel(this.dtParams, this.dataFormFilter).subscribe(data => {
        fileSaver.saveAs(data, 'alert-report.xlsx');
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
    this.salesReportAlertService.exportPdf(this.dtParams, this.dataFormFilter).subscribe(data => {
        console.info(`pdf data: ${data}`);
        fileSaver.saveAs(data, 'alert-report.pdf');
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
