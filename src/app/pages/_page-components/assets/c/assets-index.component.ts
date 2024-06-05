import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { datatable_configs } from '../../../../configs/configs';
import { ToasterService } from 'angular2-toaster';
import { Location } from '@angular/common';
import { AssetService } from '../../../../services/asset.service';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-assets-index',
  templateUrl: './assets-index.component.html',
  styleUrls: ['./assets-index.component.scss'],
})
export class AssetsIndexComponent implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private assetService: AssetService,
    private modalService: NgbModal,
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
        // console.log(this.page_start);
        this.dtParams = dataTablesParameters;
        // console.log("Check param", this.dtParams);
        this.startNumber = this.dtParams['start'];
        this.assetService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            console.info(resp);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                create_date: '',
                asset_code: '',
                description: '',
                type: '',
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
        {title: 'Created Date', data: 'create_date', orderable: true},
        {title: 'Asset Code', data: 'asset_code', orderable: false},
        {title: 'Description', data: 'description', orderable: false},
        {title: 'Type', data: 'type', orderable: false},
        {title: 'Status', data: 'status', orderable: false},
        {title: 'Actions', data: 'action', orderable: false},
      ],
    };
  }

  dataView(id) {
    this.router.navigate([`/pages/assets/assets/view/${id}`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/assets/assets/edit/${id}`]).then();
  }

  dataHapus(id) {
    this.modalDeleteService.deleteData(id, this.dtElement, this.assetService);
  }

  ngOnDestroy() {
    //
  }
}
