import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogisticComponent } from './logistic.component';

const routes: Routes = [{
  path: '',
  component: LogisticComponent,
  data: {
    breadcrumb: 'Logistic',
  },
  children: [
    {
      path: 'dashboard',
      loadChildren: '../_page-components/logistic-dashboard/logistic-dashboard.module#LogisticDashboardModule',
    },
    {
      path: 'delivery_cycle',
      loadChildren: '../_page-components/delivery-cycle/delivery-cycle.module#DeliveryCycleModule',
    },
    {
      path: 'activities/request_order',
      loadChildren: '../_page-components/request-order/request-order.module#RequestOrderModule',
    },
    {
      path: 'activities/sales_order',
      loadChildren: '../_page-components/sales-order/sales-order.module#SalesOrderModule',
    },
    {
      path: 'activities/packing_slip',
      loadChildren: '../_page-components/packing-slip/packing-slip.module#PackingSlipModule',
    },
    {
      path: 'activities/payment',
      loadChildren: '../_page-components/payment/payment.module#PaymentModule',
    },
    {
      path: 'activities/visit_plan',
      loadChildren: '../_page-components/visit-plan/visit-plan.module#VisitPlanModule',
    },
    {
      path: 'activities/permission',
      loadChildren: '../_page-components/permission/permission.module#PermissionModule',
    },
    {
      path: 'activities/alert',
      loadChildren: '../_page-components/alert/alert.module#AlertModule',
    },
    {
      path: 'activities/permission_alert',
      loadChildren: '../_page-components/permission-alert/permission-alert.module#PermissionAlertModule',
    },
    {
      path: 'activities/delivery_route',
      loadChildren: '../_page-components/delivery-route/delivery-route.module#DeliveryRouteModule',
    },
    {
      path: 'report_performance',
      loadChildren: '../_page-components/logistic-report/performance/performance.module#PerformanceModule',
    },
    {
      path: 'report_packing_slip',
      loadChildren: '../_page-components/logistic-report/packing-slip/packing-slip.module#PackingSlipModule',
    },
    {
      path: 'report_delivery_plan',
      loadChildren: '../_page-components/logistic-report/delivery-plan/delivery-plan.module#DeliveryPlanModule',
    },
    {
      path: 'report_permission',
      loadChildren: '../_page-components/logistic-report/permission/permission.module#PermissionModule',
    },
    {
      path: 'report_alert',
      loadChildren: '../_page-components/logistic-report/alert/alert.module#AlertModule',
    },
    {
      path: 'report_customer_delivery',
      loadChildren: '../_page-components/customer-visit/customer-visit.module#CustomerVisitModule',
      data: {
        type: 'logistic',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticRoutingModule {
}

export const routedComponents = [
  LogisticComponent,
];
