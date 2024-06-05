import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ToasterService } from 'angular2-toaster';
import { VisitPlanService } from '../../../../services/visit-plan.service';
import { MenuService } from '../../../../services/menu.service';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { VisitPlan, VisitPlanModel } from '@Model/response-plan';
import { IndexTableComponent, TableData } from '../../../_shared-components/index-table/index-table.component';
import { ActionButton } from '../../../_shared-components/index-table/component/action-button/action-button.component';

@Component({
  selector: 'ngx-visit-plan-index',
  templateUrl: './visit-plan-index.component.html',
  styleUrls: ['./visit-plan-index.component.scss'],
})
export class VisitPlanIndexComponent implements OnInit, OnDestroy {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  endPoint: string = '/visit/plan';
  replacement: string = '/pages/sales/activities/visit_plan/index/page';
  tableData: TableData[] = [
    new TableData('Create Date', 'create_date', 'create_date'),
    new TableData('Plan Id', 'id', 'id'),
    new TableData('Visit Date', 'date', 'date'),
    new TableData('User', 'user', 'user.name'),
    new TableData('User Code', 'username', 'user.username'),
    new TableData('Branch', 'branch', 'user.branch_name'),
    new TableData('Division', 'division', 'user.division_name'),
    new TableData('Start - End Branch', 'start_branch', 'all', (x) => {
      const visitModel: VisitPlanModel = x;
      const visitPlan: VisitPlan = new VisitPlan(visitModel);
      let result = 'Custom Location';
      if (!visitPlan.isOrNotStartStopFromBranch()) {
        result = visitPlan.start_route_branch.name + ' + ' + visitPlan.end_route_branch.name;
      }
      return result;
    }, {
      searchable: false,
      orderable: false,
    }),
  ];

  view: ActionButton = new ActionButton('id');
  edit: ActionButton = new ActionButton('all', 'nb-edit', (x) => {
    const visitModel: VisitPlanModel = x;
    const visitPlan: VisitPlan = new VisitPlan(visitModel);
    return visitPlan.isAvailable();
  });
  delete: ActionButton = new ActionButton('all', 'nb-trash', (x) => {
    const visitModel: VisitPlanModel = x;
    const visitPlan: VisitPlan = new VisitPlan(visitModel);
    return visitPlan.isAvailable();
  });

  actionButton: ActionButton[] = [
    this.view,
    this.edit,
    this.delete,
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
    private location: Location,
    private menuService: MenuService,
    private visitPlanService: VisitPlanService,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    this.view.output.subscribe((id) => {
      this.dataView(id);
    });
    this.edit.output.subscribe((x) => {
      const visitModel: VisitPlanModel = x;
      const visitPlan: VisitPlan = new VisitPlan(visitModel);
      this.dataEdit(visitPlan.id);
    });
    this.delete.output.subscribe((x) => {
      const visitModel: VisitPlanModel = x;
      const visitPlan: VisitPlan = new VisitPlan(visitModel);
      this.dataHapus(visitPlan.id);
    });
  }

  dataView(id) {
    this.router.navigate([`/pages/sales/activities/visit_plan/view/${id}`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/sales/activities/visit_plan/edit/${id}`]).then();
  }

  dataHapus(id) {
    this.modalDeleteService.deleteData(id, this.indexTable.dataTableDirective, this.visitPlanService);
  }

  ngOnDestroy() {
    //
  }
}
