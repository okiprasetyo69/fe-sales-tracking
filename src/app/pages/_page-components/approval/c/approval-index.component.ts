import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { datatable_configs, prefix_list } from '../../../../configs/configs';
import { DataTableDirective } from 'angular-datatables';
import { ApprovalService } from '../../../../services/approval.service';
import { ToasterService } from 'angular2-toaster';
import { MenuService } from '../../../../services/menu.service';
import { Location } from '@angular/common';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-approval-index',
  templateUrl: './approval-index.component.html',
  styleUrls: ['./approval-index.component.scss'],
})
export class ApprovalIndexComponent implements OnInit, OnDestroy {

  prefix_data: any;
  prefix_list = prefix_list;

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
  confirmation_type: string = '';
  isLoadingApproval: boolean = false;
  data_id: any;
  type: any;

  @ViewChild("modal_delete")
  private confirmModal: TemplateRef<any>;
  dialog: NgbModalRef | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private approvalService: ApprovalService,
    private toasterService: ToasterService,
    private menuService: MenuService,
    private location: Location,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.route.queryParams.subscribe(params => {
      this.prefix_data = this.prefix_list.find((x) => x.module === params['module']);
    });

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
        this.approvalService.indexDatatables(dataTablesParameters, this.prefix_data.module, this.prefix_data.prefix)
          .pipe(untilDestroyed(this))
          .subscribe(resp => {
            this.datasets = resp.data.data;
            console.info('datasets');
            console.info(this.datasets);
            callback({
              recordsTotal: resp.data.total,
              recordsFiltered: resp.data.total_filter,
              data: !!resp.data.total ? [{
                no: '',
                create_date: '',
                data_id: '',
                type: '',
                created_by: '',
                is_approved: '',
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
        {title: 'Data ID', data: 'data_id', orderable: false},
        {title: 'Type', data: 'type', orderable: true},
        {title: 'Created by', data: 'created_by', orderable: false},
        {title: 'Status', data: 'is_approved', orderable: true},
        {title: 'Action', data: 'action', orderable: false},
      ],
    };
  }

  // type: edit, create, delete
  doApprove(data_id, type) {
    this.isLoadingApproval = true;
    const param = {type_approve: type};
    this.approvalService.approve(data_id, this.prefix_data.prefix, param)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.closeModal();
        this.isLoadingApproval = false;
        this.toasterService.popAsync('success', 'Success', results.message);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.draw();
        });

      }, errors => {
        this.closeModal();
        this.isLoadingApproval = false;
        console.info(errors);
        const errorMessage = errors.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
      });
  }

  // type: edit, create, delete
  doReject(data_id, type) {
    this.isLoadingApproval = true;
    const param = {type_approve: type};
    this.approvalService.reject(data_id, this.prefix_data.prefix, param)
      .pipe(untilDestroyed(this))
      .subscribe(results => {
        this.closeModal();
        this.isLoadingApproval = false;
        this.toasterService.popAsync('success', 'Success', results.message);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.draw();
        });
      }, errors => {
        this.closeModal();
        this.isLoadingApproval = false;
        console.info(errors);
        const errorMessage = errors.error.message;
        this.toasterService.popAsync('error', 'Error', errorMessage);
      });
  }

  dataView(id, type) {
    const get_prefix = this.prefix_list.find((x) => x.prefix === this.prefix_data.prefix);
    let url;
    if (type === 'new_data') {
      url = get_prefix.view_url + '_approval/' + id;
    } else {
      url = get_prefix.view_url + '/' + id;
    }

    // this.router.navigate([url]);
    window.open(`#/${url}`);

  }

  confirmation(data_id, type, confirmation_type) {
    console.info('Masuk Modal Service Delete Data');
    this.confirmation_type = confirmation_type;
    this.dialog = this.modalService.open(this.confirmModal, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });
    this.data_id = data_id;
    this.type = type;
  }

  closeModal() {
    this.dialog.close();
    this.dialog.dismiss();
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    //
  }
}
