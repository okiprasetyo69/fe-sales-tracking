import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertComponent } from './alert.component';
import { AlertIndexComponent } from './c/alert-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: AlertComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Report Alert',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-alert',
      },
    },
    {
      path: 'index/page',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Report Alert',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-alert',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertRoutingModule {
}

export const routedComponents = [
  AlertComponent,
  AlertIndexComponent,
];
