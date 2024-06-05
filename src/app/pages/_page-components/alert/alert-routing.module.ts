import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthPermissionGuard} from '../../../guards/auth-permission.guard';
import {AlertComponent} from './alert.component';
import {AlertIndexComponent} from './c/alert-index.component';

const routes: Routes = [{
  path: '',
  component: AlertComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'sales/index',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'sales',
        feature: 'alert',
        method: 'index',
        route_code: 'sales-activities-alert',
      },
    },
    {
      path: 'sales/index/page',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'sales',
        feature: 'alert',
        method: 'index',
        route_code: 'sales-activities-alert',
      },
    },
    // custom collector
    {
      path: 'collector/index',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'collector',
        feature: 'alert',
        method: 'index',
        route_code: 'collector-activities-alert',
      },
    },
    {
      path: 'collector/index/page',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'collector',
        feature: 'alert',
        method: 'index',
        route_code: 'collector-activities-alert',
      },
    },
    // 
    {
      path: 'logistic/index',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'logistic',
        feature: 'alert',
        method: 'index',
        route_code: 'logistic-activities-alert',
      },
    },
    {
      path: 'logistic/index/page',
      component: AlertIndexComponent,
      data: {
        breadcrumb: 'Alert',
        module: 'logistic',
        feature: 'alert',
        method: 'index',
        route_code: 'logistic-activities-alert',
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
