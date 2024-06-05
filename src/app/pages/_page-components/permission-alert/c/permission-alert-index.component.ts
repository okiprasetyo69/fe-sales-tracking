import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { datatable_configs } from '../../../../configs/configs';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MenuService } from '../../../../services/menu.service';
import { PermissionAlertService } from '../../../../services/permission-alert.service';

@Component({
  selector: 'ngx-permission-alert-index',
  templateUrl: './permission-alert-index.component.html',
  styleUrls: ['./permission-alert-index.component.scss'],
})
export class PermissionAlertIndexComponent implements OnInit, OnDestroy {
  // feature: string;
  is_log: boolean = false;
  showApprovalButton: boolean = false;
  dataForm: any;
  dataToggle: any;
  dataAllToggle: any;
  datasets: Array<any> = []; // divisions have initial value as blank array
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = 2;
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

  constructor(
    private permAlertService: PermissionAlertService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private menuService: MenuService,
  ) { }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    // console.info(this.route.snapshot);

    if (this.route.snapshot.data['feature'] === 'permission_alert') {
      console.info('permission alert');
      this.is_log = false;
    } else {
      console.info('permission alert log');
      this.is_log = true;
    }

    this.route.queryParams
      .subscribe(params => {
        if (!!params.length) {
          this.page_start = +params['start'];
          this.page_length = +params['length'];
          this.page_search = params['search'];
          this.page_order_col = +params['order_col'];
          this.page_order_dir = params['order_dir'];
        }
        if (this.is_log) {
          this.getDatatableLog();
        } else {
          this.getDatatable();
        }
        console.info('ng on init permission alert');
      });

    this.dataForm = {};

    this.dataToggle = {
      ids: [],
    };

    this.dataAllToggle = {};

    this.permAlertService.test_request()
      .subscribe(res => {
        console.info('get test request');
        console.info(res);
      }, errors => {
        console.info('error get test request');
        console.info(errors);
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
        this.permAlertService.indexDatatables(dataTablesParameters)
          .subscribe(resp => {
            console.info(resp);
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{check: '', no: '', date: '', time: '', user_code: '', status: '', description: ''}] : [],
            });
          });
        this.dataToggle = this.permAlertService.dataToggle;
        this.dataForm = this.permAlertService.dataForm;
        this.dataAllToggle = this.permAlertService.dataAllToggle;
      },
      columns: [
        { data: 'check', orderable: false, width: '5%' },
        { title: 'No', data: 'no', orderable: false, width: '5%' },
        { title: 'Date', data: 'date', orderable: true },
        { title: 'Time', data: 'time', orderable: false },
        { title: 'User', data: 'user_code', orderable: false },
        { title: 'Status', data: 'status', orderable: false },
        { title: 'Description', data: 'description', orderable: false },
      ],
    };
  }

  getDatatableLog() {
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
        this.permAlertService.indexDatatablesLog(dataTablesParameters)
          .subscribe(resp => {
            console.info(resp);
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{check: '', no: '', date: '', time: '', user_code: '', status: '', description: ''}] : [],
            });
          });
        this.dataToggle = this.permAlertService.dataToggle;
        this.dataForm = this.permAlertService.dataForm;
        this.dataAllToggle = this.permAlertService.dataAllToggle;
      },
      columns: [
        { title: 'No', data: 'no', orderable: false, width: '5%' },
        { title: 'Date', data: 'date', orderable: true },
        { title: 'Time', data: 'time', orderable: false },
        { title: 'User', data: 'user_code', orderable: false },
        { title: 'Status', data: 'status', orderable: false },
        { title: 'Description', data: 'description', orderable: false },
      ],
    };
  }

  toggleCheck(val) {
    // console.info(this.startNumber);
    // console.info(val);
    this.dataAllToggle[this.startNumber] = val;

    // mark the index
    let i;
    const n = this.datasets.length;
    for (i = 0; i < n; ++i) {
      this.dataForm[this.datasets[i].id] = val;
      console.info(i);
      console.info(this.datasets[i]);
    }

    // store ids on variable
    const m = this.datasets.length;
    for (i = 0; i < m; ++i) {
      this.dataToggle['ids'] = this.dataToggle['ids'].filter((item) => item !== this.datasets[i].id);
    }

    if (val) {
      for (i = 0; i < m; ++i) {
        this.dataToggle['ids'].push(this.datasets[i].id);
      }
    }

    // keep all value on data service so that when user go to another page, the data will still available
    this.permAlertService.set_dataform(this.dataForm);
    this.permAlertService.set_datatoggle(this.dataToggle);
    this.permAlertService.set_dataAllToggle(this.dataAllToggle);

    // show button or not?
    this.approvalButtonControl();
  }

  toggleItemCheck(val, index, id) {
    this.dataForm[id] = val;

    if (val) {
      this.dataToggle['ids'].push(id);
    } else {
      this.dataToggle['ids'] = this.dataToggle['ids'].filter((item) => item !== id);
    }
    this.permAlertService.set_dataform(this.dataForm);
    this.permAlertService.set_datatoggle(this.dataToggle);

    // show button or not?
    this.approvalButtonControl();
  }

  approvalButtonControl() {
    // show button if some ids checked
    if (this.dataToggle['ids'].length > 0) {
      this.showApprovalButton = true;
    } else {
      this.showApprovalButton = false;
    }
  }

  ngOnDestroy() {
    this.dataForm = {};

    this.dataToggle = {
      ids: [],
    };

    this.dataAllToggle = {};
    this.permAlertService.set_dataform(this.dataForm);
    this.permAlertService.set_datatoggle(this.dataToggle);
    this.permAlertService.set_dataAllToggle(this.dataAllToggle);
    // alert('destroy');
  }

  rejectButtonAction() {
    if (window.confirm('Are sure you want to delete this item ?')) {
      // put your delete method logic here
      this.afterButtonAction();
      // alert('reject!');
    }
  }

  approveButtonAction() {
    // alert('approved!');
    this.afterButtonAction();
  }

  afterButtonAction() {
    this.dataForm = {};
    this.dataToggle['ids'] = [];
    this.dataAllToggle = {};
    this.permAlertService.set_dataform(this.dataForm);
    this.permAlertService.set_datatoggle(this.dataToggle);
    this.permAlertService.set_dataAllToggle(this.dataAllToggle);
  }

  afterButtonAction__() {
    // console.info('after action');

    let i;
    const n = this.datasets.length;

    // clone
    const old_datasets = Object.assign({}, this.datasets);
    // const old_dataform = Object.assign({}, this.dataForm);
    // // const old_dataform = this.dataForm.slice();
    // // const old_datatoggle = this.dataToggle.slice();
    // const old_datatoggle = Object.assign({}, this.dataToggle);

    // remove data from index list
    console.info(n);
    for (i = 0; i < n; ++i) {
      // if (this.dataForm['ids'][i] === true) {
      //   this.datasets = this.datasets.filter((item) => item !== old_datasets[i]);
      // }
      // console.info(this.datasets[i]['id']);
      // console.info(this.dataForm[this.datasets[i]['id']]);
      if (this.dataForm[old_datasets[i]['id']] === true) {
        console.info('enter true');
        this.datasets = this.datasets.filter((item) => item !== old_datasets[i]);
      }
    }

    // data nulled
    // console.info(old_dataform['ids'].length - old_datatoggle['ids'].length);
    // for (i = 0; i < (old_dataform['ids'].length - old_datatoggle['ids'].length); ++i) {
    //   this.dataForm['ids'][i] = null;
    // }
    this.dataForm = {};
    this.dataToggle['ids'] = [];

    this.permAlertService.set_dataform(this.dataForm);
    this.permAlertService.set_datatoggle(this.dataToggle);
    this.permAlertService.set_dataAllToggle(this.dataAllToggle);
  }

  toggleMode() {
    console.info(this.is_log);
    if (!this.is_log) {
      this.router.navigate(['/pages/sales/activities/permission_alert/log/index']);
      this.is_log = true;
    } else {
      this.router.navigate(['/pages/sales/activities/permission_alert/index']);
    }
  }
}
