import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { PermissionComponent } from './permission.component';
import { PermissionIndexComponent } from './c/permission-index.component';
import { PermissionShowComponent } from './c/permission-show.component';

const routes: Routes = [{
  path: '',
  component: PermissionComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'sales/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'sales',
        feature: 'permission',
        method: 'index',
        route_code: 'sales-activities-permission',
      },
    },
    {
      path: 'sales/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'sales',
        feature: 'permission',
        method: 'index',
        route_code: 'sales-activities-permission',
      },
    },
    {
      path: 'sales/show/:id',
      component: PermissionShowComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'sales',
        feature: 'permission',
        method: 'view',
        route_code: 'sales-activities-permission',
      },
    },
    {
      path: 'sales/log/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'sales',
        feature: 'permission_log',
        method: 'index',
        route_code: 'sales-activities-permission',
      },
    },
    {
      path: 'sales/log/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'sales',
        feature: 'permission_log',
        method: 'index',
        route_code: 'sales-activities-permission',
      },
    },
    // custom collector
    {
      path: 'collector/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'collector',
        feature: 'permission',
        method: 'index',
        route_code: 'collector-activities-permission',
      },
    },
    {
      path: 'collector/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'collector',
        feature: 'permission',
        method: 'index',
        route_code: 'collector-activities-permission',
      },
    },
    {
      path: 'collector/show/:id',
      component: PermissionShowComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'collector',
        feature: 'permission',
        method: 'view',
        route_code: 'collector-activities-permission',
      },
    },
    {
      path: 'collector/log/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'collector',
        feature: 'permission_log',
        method: 'index',
        route_code: 'collector-activities-permission',
      },
    },
    {
      path: 'collector/log/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'collector',
        feature: 'permission_log',
        method: 'index',
        route_code: 'collector-activities-permission',
      },
    },
    // 

    {
      path: 'logistic/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'logistic',
        feature: 'permission',
        method: 'index',
        route_code: 'logistic-activities-permission',
      },
    },
    {
      path: 'logistic/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'logistic',
        feature: 'permission',
        method: 'index',
        route_code: 'logistic-activities-permission',
      },
    },
    {
      path: 'logistic/show/:id',
      component: PermissionShowComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'logistic',
        feature: 'permission',
        method: 'view',
        route_code: 'logistic-activities-permission',
      },
    },
    {
      path: 'logistic/log/index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'logistic',
        feature: 'permission_log',
        method: 'index',
        route_code: 'logistic-activities-permission',
      },
    },
    {
      path: 'logistic/log/index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Permission',
        module: 'logistic',
        feature: 'permission_log',
        method: 'index',
        route_code: 'logistic-activities-permission',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PermissionRoutingModule {
}

export const routedComponents = [
  PermissionComponent,
  PermissionIndexComponent,
];
