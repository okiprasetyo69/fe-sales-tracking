import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectorDashboardComponent } from './collector-dashboard.component';
import { CollectorDashboardIndexComponent } from './c/collector-dashboard-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

// custom page
// import { CollectorDashboardIndexComponent } from './c/collector-dashboard-index.component';

const routes: Routes = [{
  path: '',
  component: CollectorDashboardComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: CollectorDashboardIndexComponent,
      data: {
        breadcrumb: 'Collector Dashboard',
        module: 'collector',
        feature: 'collector-dashboard',
        method: 'index',
        route_code: 'collector-dashboard',
      },
    },
    // {
    //   path: 'detail/:job_function',
    //   component: CollectorDashboardIndexComponentDetail,
    //   data: {
    //     breadcrumb: 'Detail performance',
    //     module: 'collector',
    //     feature: 'collector-dashboard',
    //     method: 'index',
    //     route_code: 'collector-dashboard',
    //   },
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectorDashboardRoutingModule {
}

export const routedComponents = [
  CollectorDashboardComponent,
  CollectorDashboardIndexComponent,
  // CollectorDashboardIndexComponentDetail,
];
