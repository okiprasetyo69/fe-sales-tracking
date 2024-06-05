import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformanceComponent } from './performance.component';
import { PerformanceIndexComponent } from './c/performance-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: PerformanceComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PerformanceIndexComponent,
      data: {
        breadcrumb: 'Report Performance',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-performance',
      },
    },
    {
      path: 'index/page',
      component: PerformanceIndexComponent,
      data: {
        breadcrumb: 'Report Performance',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-performance',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceRoutingModule {
}

export const routedComponents = [
  PerformanceComponent,
  PerformanceIndexComponent,
];
