import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { PermissionAlertComponent } from './permission-alert.component';
import { PermissionAlertIndexComponent } from './c/permission-alert-index.component';

const routes: Routes = [{
  path: '',
  component: PermissionAlertComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert',
        method: 'index',
        route_code: '',
      },
    },
    {
      path: 'index/page',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert',
        method: 'index',
        route_code: '',
      },
    },
    {
      path: 'log/index',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert_log',
        method: 'index',
        route_code: '',
      },
    },
    {
      path: 'log/index/page',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert_log',
        method: 'index',
        route_code: '',
      },
    },
    {
      path: 'alert/index',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert',
        method: 'index',
        route_code: '',
      },
    },
    {
      path: 'alert/index/page',
      component: PermissionAlertIndexComponent,
      data: {
        breadcrumb: 'Permission & Alert',
        module: 'sales',
        feature: 'permission_alert',
        method: 'index',
        route_code: '',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PermissionAlertRoutingModule { }

export const routedComponents = [
  PermissionAlertComponent,
  PermissionAlertIndexComponent,
];
