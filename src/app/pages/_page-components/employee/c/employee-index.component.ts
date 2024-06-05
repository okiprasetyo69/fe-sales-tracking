import { Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { EmployeeService } from '../../../../services/employee.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MenuService } from '../../../../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { Collector, EmployeeSales } from "@Model/response-employee";
import { IndexTableComponent, TableData } from "../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../_shared-components/index-table/component/action-button/action-button.component";

@Component({
  selector: 'ngx-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.scss'],
})
export class EmployeeIndexComponent implements OnInit, OnDestroy {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  endPoint: string = '';
  replacement: string = '';
  tableData: TableData[] = [
    new TableData('Create Date', 'create_date', 'create_date'),
    new TableData('NIP', 'nip', 'nip'),
    new TableData('Name', 'name', 'name'),
    new TableData('Mobile', 'mobile', 'phone', null, {
      searchable: false,
      orderable: false,
    }),
    new TableData('Job Function', 'job_function', 'all', (data) => {
      let result = "";
      if (data.job_function == 'sales') {
        const employee: EmployeeSales = data;
        result = "Sales";
        const collectorType: Collector = Collector.fromEmployeeSales(employee);
        if (collectorType.value == 1) {
          result = "Sales + Collector";
        } else if (collectorType.value == 2) {
          result = "Collector";
        }
      } else if (data.job_function == 'supervisor') {
        const isSupervisorSales = (data.is_supervisor_sales == 1) ? '[Sales]' : '';
        const isSupervisorLogistic = (data.is_supervisor_logistic == 1) ? '[Logistic]' : '';
        result = "Supervisor ".concat(isSupervisorSales).concat(isSupervisorLogistic);
      } else {
        result = data.job_function.toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      }
      return result;
    }, {
      orderable: false,
      searchable: false,
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

  feature: string; // will consists: sales, administrator, or logistic

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toasterService: ToasterService,
    private location: Location,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private modalService: NgbModal,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    // get menu
    this.menuService.getMenuReloaded(this.route.snapshot.data['route_code']);

    this.feature = this.route.snapshot.data['feature'];
    this.replacement = `pages/employee/${this.feature}/index/page`;
    this.endPoint = `/employee/${this.feature}`;
    this.view.output.subscribe((id) => {
      this.dataView(id);
    });
    this.edit.output.subscribe((id) => {
      this.dataEdit(id);
    });
    this.delete.output.subscribe((id) => {
      this.dataHapus(id);
    });
  }

  dataCreate() {
    this.router.navigate([`/pages/employee/${this.feature}/create`]).then();
  }

  dataImport() {
    this.router.navigate([`/pages/employee/${this.feature}/import`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/employee/${this.feature}/edit/${id}`]).then();
  }

  dataView(id) {
    // alert(`go to ${id}`);
    this.router.navigate([`/pages/employee/${this.feature}/view/${id}`]).then();
  }

  dataHapus(id) {
    const data = {
      feature: this.feature,
    };
    this.modalDeleteService.deleteData(id, this.indexTable.dataTableDirective, this.employeeService, 'employee', data);
  }

  ngOnDestroy() {
    //
  }
}

@Pipe({name: "EmployeeSales"})
export class EmployeeSalesConversion implements PipeTransform {
  transform(value: any): any {
    const employee: EmployeeSales = value;
    let result = "Sales";
    const collectorType: Collector = Collector.fromEmployeeSales(employee);
    if (collectorType.value == 1) {
      result = "Sales + Collector";
    } else if (collectorType.value == 2) {
      result = "Collector";
    }
    return result;
  }

}
