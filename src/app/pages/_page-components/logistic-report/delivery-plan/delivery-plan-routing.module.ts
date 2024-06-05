import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryPlanComponent } from './delivery-plan.component';
import { DeliveryPlanIndexComponent } from './c/delivery-plan-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: DeliveryPlanComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: DeliveryPlanIndexComponent,
      data: {
        breadcrumb: 'Report Delivery Route',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-delivery-plan',
      },
    },
    {
      path: 'index/page',
      component: DeliveryPlanIndexComponent,
      data: {
        breadcrumb: 'Report Delivery Route',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-delivery-plan',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryPlanRoutingModule {
}

export const routedComponents = [
  DeliveryPlanComponent,
  DeliveryPlanIndexComponent,
];
