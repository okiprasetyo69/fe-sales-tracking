import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';
import { PermissionComponent } from './permission.component';
import { PermissionIndexComponent } from './c/permission-index.component';

const routes: Routes = [{
  path: '',
  component: PermissionComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Logistic Permission Report',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-permission',
      },
    },
    {
      path: 'index/page',
      component: PermissionIndexComponent,
      data: {
        breadcrumb: 'Logistic Permission Report',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-permission',
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