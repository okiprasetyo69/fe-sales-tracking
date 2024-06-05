import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectorComponent } from './collector.component';
// import { UnderconstructionComponent } from '../construction-page/underconstruction.component';

const routes: Routes = [{
  path: '',
  component: CollectorComponent,
  data: {
    breadcrumb: 'Collector',
  },
  children: [
    {
      path: 'dashboard',
      loadChildren: '../_page-components/collector-dashboard/collector-dashboard.module#CollectorDashboardModule',
    },
    // {
    //   path: 'visit_cycle',
    //   loadChildren: '../_page-components/visit-cycle/visit-cycle.module#VisitCycleModule',
    // },
    // {
    //   path: 'activities/request_order',
    //   loadChildren: '../_page-components/request-order/request-order.module#RequestOrderModule',
    // },
    // {
    //   path: 'activities/collector_order',
    //   loadChildren: '../_page-components/collector-order/collector-order.module#CollectorOrderModule',
    // },
    {
      path: 'activities/invoice',
      loadChildren: '../_page-components/invoice/invoice.module#InvoiceModule',
    },
    // {
    //   path: 'activities/payment',
    //   loadChildren: '../_page-components/payment/payment.module#PaymentModule',
    // },
    {
      path: 'activities/collect_plan',
      loadChildren: '../_page-components/collect-plan/collect-plan.module#CollectPlanModule',
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
      loadChildren: '../_page-components/collector-report/performance/performance.module#PerformanceModule',
    },
    // {
    //   path: 'report_order_collector',
    //   loadChildren: '../_page-components/collector-report/order-collector/order-collector.module#OrderCollectorModule',
    // },
    // {
    //   path: 'report_collector_order',
    //   loadChildren: '../_page-components/collector-report/collector-order/collector-order.module#CollectorOrderModule',
    // },
    {
      path: 'report_invoice',
      loadChildren: '../_page-components/collector-report/invoice/invoice.module#InvoiceModule',
    },
    // {
    //   path: 'report_payment',
    //   loadChildren: '../_page-components/collector-report/payment/payment.module#PaymentModule',
    // },
    {
      path: 'report_visit_plan',
      loadChildren: '../_page-components/collector-report/visit-plan/visit-plan.module#VisitPlanModule',
    },
    {
      path: 'report_permission',
      loadChildren: '../_page-components/collector-report/permission/permission.module#PermissionModule',
    },
    {
      path: 'report_alert',
      loadChildren: '../_page-components/collector-report/alert/alert.module#AlertModule',
    },
    {
      path: 'report_customer_visit',
      loadChildren: '../_page-components/customer-visit/customer-visit.module#CustomerVisitModule',
      data: {
        type: 'collector',
      },
    },
    {
      path: 'report_visit_eye_history',
      loadChildren: '../_page-components/collector-report/visit-eye-history/visit-eye-history.module#VisitEyeHistoryModule',
    },
    // {
    //   path: 'configurations_visit_plan/index',
    //   component: UnderconstructionComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorRoutingModule {
}

export const routedComponents = [
  CollectorComponent,
  // UnderconstructionComponent,
];
