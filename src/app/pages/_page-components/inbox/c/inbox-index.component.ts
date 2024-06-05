import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { datatable_configs } from '../../../../configs/configs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Location } from '@angular/common';
import { InboxService } from '../../../../services/inbox.service';
import { MenuService } from '../../../../services/menu.service';
import { HeaderService } from '../../../../services/header.service';

@Component({
  selector: 'ngx-inbox-index',
  templateUrl: './inbox-index.component.html',
  styleUrls: ['./inbox-index.component.scss'],
})
export class InboxIndexComponent implements OnInit, OnDestroy {

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

  koneksiSocket;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private inboxService: InboxService,
    private headerService: HeaderService,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded();
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
    this.koneksiSocket = this.headerService.getInbox().subscribe(() => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.draw();
      });
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
        // console.log(this.page_start);
        this.dtParams = dataTablesParameters;
        // console.log("Check param", this.dtParams);
        this.startNumber = this.dtParams['start'];
        this.inboxService.indexDatatables(dataTablesParameters)
          .subscribe(resp => {
            this.datasets = resp.data.data;
            console.info(resp);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                create_date: '',
                name: '',
                branch: '',
                title: '',
                message: '',
                category: '',
                action: '',
              }] : [],
            });
          });
      },
      columns: [
        {title: 'No', data: 'no', orderable: false},
        {title: 'Created Date', data: 'create_date', orderable: true},
        {title: 'From', data: 'name', orderable: false},
        {title: 'Branch', data: 'branch', orderable: false},
        {title: 'Title', data: 'title', orderable: true},
        {title: 'Message', data: 'message', orderable: true},
        {title: 'Category', data: 'category', orderable: true},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  dataView(id) {
    this.router.navigate([`/pages/assets/assets/view/${id}`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/assets/assets/edit/${id}`]).then();
  }

  ngOnDestroy(): void {
    this.koneksiSocket.unsubscribe();
  }

  view(res) {
    console.info(res);
    const from = res.from;
    const category = res.category;
    let url;
    url = '/pages/';
    if (typeof from != 'undefined') {
      const job_function = from.job_function;
      if (category == 'alert') {
        url += 'alert/';
      } else {
        url += 'permission/';
      }
      if (job_function == 'sales') {
        url += 'sales/index';
      } else {
        url += 'logistic/index';
      }
      console.info('URL nya : ', url);
      this.router.navigate([url]).then();
    }
  }
}
