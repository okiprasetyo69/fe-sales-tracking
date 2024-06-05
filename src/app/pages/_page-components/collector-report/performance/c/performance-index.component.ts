import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { datatable_configs } from '../../../../../configs/configs';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { SalesReportPerformanceService } from '../../../../../services/sales-report-performance.service';
import { CollectorReportPerformanceService } from '../../../../../services/collector-report-performance.service';
import { OauthService } from '../../../../../services/oauth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ExcelService } from '../../../../../services/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterPerformanceComponent } from '../entry/filter-performance.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'ngx-performance-index',
  templateUrl: './performance-index.component.html',
  styleUrls: ['./performance-index.component.scss'],
})
export class PerformanceIndexComponent implements OnInit, OnDestroy {
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
  dateStringTitle = 'Today'.concat(' ').concat(this.default_date);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private collectorReportPerformanceService: CollectorReportPerformanceService,
    private oauthService: OauthService,
    private excelService: ExcelService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
  }

  autoDigit(number) {
    return (number < 10) ? '0'.concat(number) : number;
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
      user_id: [],
      username: [],
      branch_id: [],
      division_id: [],
    });
    this.dataFormFilter.patchValue({date_start: this.default_date});
    this.dataFormFilter.patchValue({date_end: this.default_date});
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
        // console.log(this.page_start);
        this.dtParams = dataTablesParameters;
        // console.log('Check param', this.dtParams);
        this.startNumber = this.dtParams['start'];
        this.collectorReportPerformanceService.indexDatatables(dataTablesParameters, this.dataFormFilter)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            // this.datasets = resp.data.data;
            const dataUser = resp.data.data;
            let x, userArrayList;
            userArrayList = [];
            for (x of dataUser) {
              userArrayList.push(x.id);
            }
            if (userArrayList.length != 0) {
              const stringUserIdList = '['.concat(userArrayList.toString()).concat(']');
              this.collectorReportPerformanceService.performance(stringUserIdList, this.dataFormFilter).subscribe(res => {
                const performanceUser = res.data;
                let y, combineData, userTempData;
                combineData = [];
                console.info('Data Performance : ', res);
                for (y of dataUser) {
                  userTempData = Object.assign(y, performanceUser[y.id]);
                  combineData.push(userTempData);
                }
                this.datasets = combineData;
                console.info('Combine Data : ', combineData);
              });
            }
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                username: '',
                division: '',
                branch: '',
                plan: '',
                visited: '',
                visit_time: '',
                driving: '',
                breaktime: '',
                alert: '',
                permissions: '',
                cancel: '',
              }] : [],
            });
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false},
        {title: 'User', data: 'username', orderable: true},
        {title: 'Division', data: 'division', orderable: true},
        {title: 'Branch', data: 'branch', orderable: true},
        {title: 'Plan', data: 'plan', orderable: false},
        {title: 'Visited', data: 'visited', orderable: false},
        {title: 'Visit Time', data: 'visit_time', orderable: false},
        {title: 'Driving', data: 'driving', orderable: false},
        {title: 'Break Time', data: 'breaktime', orderable: false},
        {title: 'Alert', data: 'alert', orderable: false},
        {title: 'Permission', data: 'permissions', orderable: false},
        {title: 'Cancel', data: 'cancel', orderable: false},
      ],
    };
  }

  print() {
    const start_date = this.dataFormFilter.controls['date_start'].value;
    const end_date = this.dataFormFilter.controls['date_end'].value;
    console.info('Print');
    let popupWin, x, table, row, i;
    i = 0;
    table = '';
    for (x of this.datasets) {
      i = i + 1;
      row = '';
      row += '<tr>';
      row += '<td>' + i + '</td>';
      row += '<td>' + x.username + '</td>';
      row += '<td>' + x.division.division_name + '</td>';
      row += '<td>' + x.branch.name + '</td>';
      row += '<td>' + x.break_time + '</td>';
      row += '<td>' + x.visited + '</td>';
      row += '<td>' + x.visit_time + '</td>';
      row += '<td>' + x.driving_time + '</td>';
      row += '<td>' + x.plan + '</td>';
      row += '<td>' + x.alert + '</td>';
      row += '<td>' + x.permission + '</td>';
      row += '<td>' + x.cancel + '</td>';
      row += '<td>' + x.invoice + '</td>';
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
          <h1 class="page-header" id="header">Report Performance Sales </h1>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>User</th>
                <th>Division</th>
                <th>Branch</th>
                <th>Break Time</th>
                <th>Visited</th>
                <th>Stop Time</th>
                <th>Driving</th>
                <th>Plan</th>
                <th>Alert</th>
                <th>Permissions</th>
                <th>Cancel</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody id="list_section"></tbody>
          </table>
        </body>
      </html>
    `);
    popupWin.document.getElementById('title').innerHTML = 'Print By : ' + this.profileUser.username + ' - ' + this.profileUser.name;
    popupWin.document.getElementById('list_section').innerHTML = table;
    const header = popupWin.document.getElementById('header');
    header.insertAdjacentHTML('beforeend', (start_date == end_date) ? start_date : (start_date.concat(' - ').concat(end_date)));
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
        'No.': i,
        'User': x.username,
        'Division': x.division.division_name,
        'Branch': x.branch.name,
        'Break Time': x.break_time,
        'Visited': x.visited,
        'Stop Time': x.visit_time,
        'Driving': x.driving_time,
        'Plan': x.plan,
        'Alert': x.alert,
        'Permissions': x.permission,
        'Cancel': x.cancel,
        'Invoice': x.invoice,
      };
      data.push(row);
    }
    this.excelService.exportAsExcelFile(data, 'collector-performance');
  }

  dataFilter() {
    const activeModal = this.modalService.open(FilterPerformanceComponent, {
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

      let stringData = '';
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
    });


  }

  ngOnDestroy() {
    //
  }
}
