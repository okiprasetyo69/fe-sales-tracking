import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { AreaService } from '../../../../services/area.service';
import { datatable_configs } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-area-index',
  styleUrls: ['./area-index.component.scss'],
  templateUrl: './area-index.component.html',
})
export class AreaIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

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
    private areaService: AreaService,
    private router: Router,
    private toasterService: ToasterService,
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
        this.dtParams = dataTablesParameters;
        this.startNumber = this.dtParams['start'];
        this.areaService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            console.info(this.datasets);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                create_date: '',
                name: '',
                description: '',
                marker_color: '',
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
        {title: 'Created Date', data: 'create_date', orderable: true},
        {title: 'Name', data: 'name', orderable: true},
        {title: 'Description', data: 'description', orderable: false},
        // {title: 'Marker Color', data: 'marker_color', orderable: false},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  dataView(id) {
    this.router.navigate([`/pages/settings/area/view/${id}`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/settings/area/edit/${id}`]).then();
  }

  // dataDelete(data) {
  //   this.toasterService.popAsync('success', 'Deleted data', 'Data has been deleted');
  //   this.datasets = this.datasets.filter((item) => item !== data);
  // }

  dataHapus(id) {
    this.modalDeleteService.deleteData(id, this.dtElement, this.areaService);
  }

  ngOnDestroy() {
    //
  }
}
