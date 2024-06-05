import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryCycleComponent } from './delivery-cycle.component';
import { DeliveryCycleIndexComponent } from './c/delivery-cycle-index.component';
import { DeliveryCycleEditComponent } from './c/delivery-cycle-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { DeliveryCycleImportComponent } from './c/delivery-cycle-import.component';

const routes: Routes = [{
  path: '',
  component: DeliveryCycleComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: DeliveryCycleIndexComponent,
      data: {
        breadcrumb: 'Delivery Cycle',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'index',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'index/page',
      component: DeliveryCycleIndexComponent,
      data: {
        breadcrumb: 'Delivery Cycle',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'index',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'import',
      component: DeliveryCycleImportComponent,
      data: {
        breadcrumb: 'Delivery Cycle Import',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'import',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'create',
      component: DeliveryCycleEditComponent,
      data: {
        breadcrumb: 'Delivery Cycle Create',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'create',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'edit/:id',
      component: DeliveryCycleEditComponent,
      data: {
        breadcrumb: 'Delivery Cycle Edit',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'edit',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'view/:id',
      component: DeliveryCycleEditComponent,
      data: {
        breadcrumb: 'Delivery Cycle View',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'view',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: DeliveryCycleEditComponent,
      data: {
        breadcrumb: 'Delivery Cycle View',
        module: 'logistic',
        feature: 'delivery-cycle',
        method: 'view',
        route_code: 'logistic-data-delivery-cycle',
      },
    },
    // {
    //   path: 'plan/index',
    //   component: DeliveryCycleIndexComponent,
    //   data: {
    //     breadcrumb: 'Delivery Plan',
    //     module: 'logistic',
    //     feature: 'delivery-plan',
    //     method: 'index',
    //   },
    // },
    // {
    //   path: 'plan/edit',
    //   component: DeliveryCycleCreateComponent,
    //   data: {
    //     breadcrumb: 'Delivery Plan Edit',
    //     module: 'logistic',
    //     feature: 'delivery-plan',
    //     method: 'edit',
    //   },
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryCycleRoutingModule { }

export const routedComponents = [
  DeliveryCycleComponent,
  DeliveryCycleIndexComponent,
  DeliveryCycleEditComponent,
  DeliveryCycleImportComponent,
];
