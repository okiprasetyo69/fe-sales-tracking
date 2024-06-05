import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesDashboardComponent } from './sales-dashboard.component';
import { SalesDashboardIndexComponent } from './c/sales-dashboard-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

// custom page
// import { SalesDashboardVisitDetail } from './d/visit-detail.component';
// import { SalesDashboardSalesPerformance } from './e/performance-detail.component';
// import { PerformanceDataComponent } from './e/performance-data/performance-data.component';
// import { TrackingDeliveryComponent } from './f/tracking-delivery/tracking-delivery.component';


const routes: Routes = [{
  path: '',
  component: SalesDashboardComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: SalesDashboardIndexComponent,
      data: {
        breadcrumb: 'Sales Dashboard',
        module: 'sales',
        feature: 'sales-dashboard',
        method: 'index',
        route_code: 'sales-dashboard',
      },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesDashboardRoutingModule {
}

export const routedComponents = [
  SalesDashboardComponent,
  SalesDashboardIndexComponent,
  // SalesDashboardIndexComponentDetail,
  // SalesDashboardVisitDetail,
  // SalesDashboardSalesPerformance,
  // PerformanceDataComponent,
  // TrackingDeliveryComponent
];

// export const entryComponents = [PerformanceDataComponent];a