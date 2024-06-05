import { Component, OnDestroy, OnInit } from '@angular/core';
import { datatable_configs } from "../../../../configs/configs";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { Location } from "@angular/common";
import { MenuService } from "../../../../services/menu.service";
import { AssetTypeService } from "../../../../services/asset-type.service";
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-assets-type-index',
  templateUrl: './assets-type-index.component.html',
  styleUrls: ['./assets-type-index.component.scss'],
})
export class AssetsTypeIndexComponent implements OnInit, OnDestroy {
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
    private assetTypeService: AssetTypeService,
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
      searching: false,
      processing: true,
      displayStart: this.page_start,
      order: [[this.page_order_col, this.page_order_dir]],
      search: {search: this.page_search},
      ajax: (dataTablesParameters: any, callback) => {
        // console.log(this.page_start);
        this.dtParams = dataTablesParameters;
        // console.log("Check param", this.dtParams);
        this.startNumber = this.dtParams['start'];
        this.assetTypeService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            console.info(resp);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                // code: '',
                name: '',
                status: '',
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
        // {title: 'Asset Code', data: 'code', orderable: true},
        {title: 'Assets Type', data: 'name', orderable: true},
        {title: 'Status', data: 'status', orderable: false},
      ],
    };
  }

  ngOnDestroy() {
    //
  }
}
