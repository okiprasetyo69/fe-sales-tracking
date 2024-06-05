import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ToasterService } from 'angular2-toaster';
import { DeliveryCycleService } from '../../../../services/delivery-cycle.service';
import { MenuService } from '../../../../services/menu.service';
import { DataTableDirective } from 'angular-datatables';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { IndexTableComponent, TableData } from "../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../_shared-components/index-table/component/action-button/action-button.component";

@Component({
  selector: 'ngx-delivery-cycle-index',
  templateUrl: './delivery-cycle-index.component.html',
  styleUrls: ['./delivery-cycle-index.component.scss'],
})
export class DeliveryCycleIndexComponent implements OnInit, OnDestroy {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  tableData: TableData[] = [
    new TableData('Created Date', 'create_date', 'create_date'),
    new TableData('User', 'user', 'user.name'),
    new TableData('Cycle Number', 'cycle_number', 'cycle_number'),
    new TableData('Branch Name', 'branch', 'user.branch_name'),
    new TableData('Total Customer', 'total_customer', 'total_customer', null, {
      searchable: false,
      orderable: false,
    }),
  ];

  view: ActionButton = new ActionButton('id');
  edit: ActionButton = new ActionButton('id', 'nb-edit');
  delete: ActionButton = new ActionButton('id', 'nb-trash');
  actionButton: ActionButton[] = [
    this.view,
    this.edit,
    this.delete,
  ];

  module: string;
  breadcrumb: string;
  empty_data: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deliveryService: DeliveryCycleService,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    this.module = this.route.snapshot.data['module'];
    this.breadcrumb = this.route.snapshot.data['breadcrumb'];
    this.view.output.subscribe((id) => {
      this.viewData(id);
    });
    this.edit.output.subscribe((id) => {
      this.editData(id);
    });
    this.delete.output.subscribe((id) => {
      this.deleteData(id);
    });
  }


  editData(id) {
    this.router.navigate([`/pages/logistic/delivery_cycle/edit/${id}`]).then();
  }

  viewData(id) {
    this.router.navigate([`/pages/logistic/delivery_cycle/view/${id}`]).then();
  }

  createData() {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/logistic/delivery_cycle/create`]).then();
  }

  deleteData(id) {
    this.modalDeleteService.deleteData(id, this.indexTable.dataTableDirective, this.deliveryService);
  }

  ngOnDestroy() {
    //
  }
}
