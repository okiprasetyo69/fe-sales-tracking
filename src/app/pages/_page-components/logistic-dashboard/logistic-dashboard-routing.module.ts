import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticDashboardComponent } from './logistic-dashboard.component';
import { LogisticDashboardIndexComponent } from './c/logistic-dashboard-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: LogisticDashboardComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: LogisticDashboardIndexComponent,
      data: {
        breadcrumb: 'Logistic Dashboard',
        module: 'logistic',
        feature: 'logistic-dashboard',
        method: 'index',
        route_code: 'logistic-dashboard',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticDashboardRoutingModule {
}

export const routedComponents = [
  LogisticDashboardComponent,
  LogisticDashboardIndexComponent,
];
