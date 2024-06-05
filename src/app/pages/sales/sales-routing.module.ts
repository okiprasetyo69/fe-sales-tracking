import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { UnderconstructionComponent } from '../construction-page/underconstruction.component';

const routes: Routes = [{
  path: '',
  component: SalesComponent,
  data: {
    breadcrumb: 'Sales',
  },
  children: [
    {
      path: 'dashboard',
      loadChildren: '../_page-components/sales-dashboard/sales-dashboard.module#SalesDashboardModule',
    },
    {
      path: 'visit_cycle',
      loadChildren: '../_page-components/visit-cycle/visit-cycle.module#VisitCycleModule',
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
      path: 'activities/invoice',
      loadChildren: '../_page-components/invoice/invoice.module#InvoiceModule',
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
      path: 'permission',
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
      path: 'report_performance',
      loadChildren: '../_page-components/sales-report/performance/performance.module#PerformanceModule',
    },
    {
      path: 'report_order_sales',
      loadChildren: '../_page-components/sales-report/order-sales/order-sales.module#OrderSalesModule',
    },
    {
      path: 'report_sales_order',
      loadChildren: '../_page-components/sales-report/sales-order/sales-order.module#SalesOrderModule',
    },
    {
      path: 'report_invoice',
      loadChildren: '../_page-components/sales-report/invoice/invoice.module#InvoiceModule',
    },
    {
      path: 'report_payment',
      loadChildren: '../_page-components/sales-report/payment/payment.module#PaymentModule',
    },
    {
      path: 'report_visit_plan',
      loadChildren: '../_page-components/sales-report/visit-plan/visit-plan.module#VisitPlanModule',
    },
    {
      path: 'report_alert',
      loadChildren: '../_page-components/sales-report/alert/alert.module#AlertModule',
    },
    {
      path: 'report_permission',
      loadChildren: '../_page-components/sales-report/permission/permission.module#PermissionModule',
    },
    {
      path: 'report_customer_visit',
      loadChildren: '../_page-components/customer-visit/customer-visit.module#CustomerVisitModule',
      data: {
        type: 'sales',
      },
    },
    {
      path: 'report_visit_eye_history',
      loadChildren: '../_page-components/sales-report/visit-eye-history/visit-eye-history.module#VisitEyeHistoryModule',
    },
    {
      path: 'configurations_visit_plan/index',
      component: UnderconstructionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {
}

export const routedComponents = [
  SalesComponent,
  UnderconstructionComponent,
];
