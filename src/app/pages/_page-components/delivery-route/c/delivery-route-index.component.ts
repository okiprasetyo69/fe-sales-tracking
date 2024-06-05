import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { Location } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { ModalDeleteService } from '../../../_shared-components/modal-delete/modal-delete.service';
import { DeliveryPlan, DeliveryPlanModel } from '@Model/response-plan';
import { IndexTableComponent, TableData } from "../../../_shared-components/index-table/index-table.component";
import { ActionButton } from "../../../_shared-components/index-table/component/action-button/action-button.component";

@Component({
  selector: 'ngx-delivery-route-index',
  templateUrl: './delivery-route-index.component.html',
  styleUrls: ['./delivery-route-index.component.scss'],
})
export class DeliveryRouteIndexComponent implements OnInit, OnDestroy {
  @ViewChild(IndexTableComponent)
  indexTable: IndexTableComponent;

  endPoint: string = '/delivery/plan';
  replacement: string = '/pages/logistic/activities/delivery_route/index/page';
  tableData: TableData[] = [
    new TableData('Create Date', 'create_date', 'create_date'),
    new TableData('Plan Id', 'id', 'id'),
    new TableData('Delivery Date', 'date', 'date'),
    new TableData('User', 'user', 'user.name'),
    new TableData('User Code', 'username', 'user.username'),
    new TableData('Branch', 'branch', 'user.branch_name'),
    new TableData('Start - End Branch', 'start_branch', 'all', (x) => {
      const deliveryPlanModel: DeliveryPlanModel = x;
      const deliveryPlan: DeliveryPlan = new DeliveryPlan(deliveryPlanModel);
      let result = 'Custom Location';
      if (!deliveryPlan.isOrNotStartStopFromBranch()) {
        result = deliveryPlan.start_route_branch.name + ' + ' + deliveryPlan.end_route_branch.name;
      }
      return result;
    }, {
      searchable: false,
      orderable: false,
    }),
  ];

  view: ActionButton = new ActionButton('id');
  edit: ActionButton = new ActionButton('all', 'nb-edit', (x) => {
    const deliveryPlanModel: DeliveryPlanModel = x;
    const deliveryPlan: DeliveryPlan = new DeliveryPlan(deliveryPlanModel);
    return deliveryPlan.isAvailable();
  });
  delete: ActionButton = new ActionButton('all', 'nb-trash', (x) => {
    const deliveryPlanModel: DeliveryPlanModel = x;
    const deliveryPlan: DeliveryPlan = new DeliveryPlan(deliveryPlanModel);
    return deliveryPlan.isAvailable();
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
    private deliveryRouteService: DeliveryRouteService,
    private modalDeleteService: ModalDeleteService,
  ) {
  }

  ngOnInit() {
    this.view.output.subscribe((id) => {
      this.dataView(id);
    });
    this.edit.output.subscribe((x) => {
      const deliveryPlanModel: DeliveryPlanModel = x;
      const deliveryPlan: DeliveryPlan = new DeliveryPlan(deliveryPlanModel);
      this.dataEdit(deliveryPlan.id);
    });
    this.delete.output.subscribe((x) => {
      const deliveryPlanModel: DeliveryPlanModel = x;
      const deliveryPlan: DeliveryPlan = new DeliveryPlan(deliveryPlanModel);
      this.deleteData(deliveryPlan.id);
    });
  }

  dataView(id) {
    this.router.navigate([`/pages/logistic/activities/delivery_route/view/${id}`]).then();
  }

  dataEdit(id) {
    this.router.navigate([`/pages/logistic/activities/delivery_route/edit/${id}`]).then();
  }

  deleteData(id) {
    this.modalDeleteService.deleteData(id, this.indexTable.dataTableDirective, this.deliveryRouteService);
  }

  ngOnDestroy() {
    //
  }
}
