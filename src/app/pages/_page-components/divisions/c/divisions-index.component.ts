import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DivisionsService } from '../../../../services/divisions.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { datatable_configs } from '../../../../configs/configs';
import { MenuService } from '../../../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'ngx-divisions-index',
  styleUrls: ['./divisions-index.component.scss'],
  templateUrl: './divisions-index.component.html',
})
export class DivisionIndexComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  datasets: Array<any> = []; // divisions have initial value as blank array
  dtOptions: any = {};
  dtParams: any;
  page_start: number = datatable_configs.page_start;
  page_length: number = datatable_configs.page_length;
  page_search: string = datatable_configs.page_search;
  page_order_col: number = datatable_configs.page_order_col;
  page_order_dir: string = datatable_configs.page_order_dir;
  startNumber: number = datatable_configs.page_start;

  constructor(
    private divisionsService: DivisionsService,
    private router: Router,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private modalService: NgbModal,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    // get menu
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

    // this.getDivisionsData();
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
        this.divisionsService.indexDatatables(dataTablesParameters)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                create_date: '',
                division_name: '',
                division_code: '',
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
        {title: 'Name', data: 'division_name', orderable: true},
        {title: 'Code', data: 'division_code', orderable: true},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  // getDivisionsData() {
  //   this.divisionsService.index()
  //     .subscribe(divisions => {
  //       // console.log(divisions.data);
  //       if (!divisions.data.length) {
  //         this.empty_divisions = true;
  //       } else {
  //         this.divisions = divisions.data;
  //         // console.log(divisions);
  //       }
  //     });
  // }

  dataEdit(id) {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/settings/divisions/edit/${id}`]).then();
  }

  dataDelete(divisions) {
    // alert(`delete ${id}`);
    this.toasterService.popAsync('success', 'Deleted divisions', 'Data has been deleted');
    this.datasets = this.datasets.filter((item) => item !== divisions);
  }

  dataView(id) {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/settings/divisions/view/${id}`]).then();
  }

  dataHapus(id) {
    this.modalDeleteService.deleteData(id, this.dtElement, this.divisionsService);
  }

  ngOnDestroy() {
    //
  }
}
