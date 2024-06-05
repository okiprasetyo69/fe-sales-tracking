import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { UserGroupService } from '../../../../services/user-group.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { datatable_configs } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-user-groups-index',
  templateUrl: './user-groups-index.component.html',
  styleUrls: ['./user-groups-index.component.scss'],
})
export class UserGroupsIndexComponent implements OnInit, OnDestroy {
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

  constructor(
    private groupService: UserGroupService,
    private toasterService: ToasterService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);
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
        // console.log(dataTablesParameters);
        this.dtParams = dataTablesParameters;
        this.startNumber = this.dtParams['start'];
        this.groupService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{no: '', create_date: '', code: '', group_name: '', action: ''}] : [],
            });
          });
      },
      columns: [
        {title: 'No', data: 'no', searchable: false, orderable: false},
        {title: 'Created Date', data: 'create_date', searchable: true, orderable: true},
        {title: 'Group Code', data: 'code', searchable: true, orderable: true},
        {title: 'Group Name', data: 'group_name', searchable: true, orderable: true},
        {title: 'Action', data: 'action', searchable: false, orderable: false},
      ],
    };
  }

  dataView(id) {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/settings/user_groups/view/${id}`]).then();
  }

  dataEdit(id) {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/settings/user_groups/edit/${id}`]).then();
  }

  dataDelete(id) {
    this.modalDeleteService.deleteData(id, this.dtElement, this.groupService);
  }

  ngOnDestroy() {
    //
  }
}
