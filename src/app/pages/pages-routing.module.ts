import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './_page-components/dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthPermissionGuard } from '../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {
        breadcrumb: 'Dashboard',
        module: 'pages',
        feature: 'dashboard',
        method: 'index',
        route_code: 'dashboard',
      },
    },
    {
      path: 'inbox',
      loadChildren: './_page-components/inbox/inbox.module#InboxModule',
    },
    {
      path: 'settings',
      loadChildren: './settings/settings.module#SettingsModule',
    },
    {
      path: 'sales',
      loadChildren: './sales/sales.module#SalesModule',
    },
    {
      path: 'collector',
      loadChildren: './collector/collector.module#CollectorModule',
    },
    {
      path: 'logistic',
      loadChildren: './logistic/logistic.module#LogisticModule',
    },
    
    {
      path: 'absences',
      //loadChildren: './_page-components/absences/absences.module#AbsencesModule',
      loadChildren: './absences/absences.module#AbsencesModule',
    },
    
    {
      path: 'assets',
      loadChildren: './assets/assets.module#AssetsModule',
    },
    {
      path: 'livemap',
      loadChildren: './livemap/livemap.module#LivemapModule',
    },
    {
      path: 'employee',
      loadChildren: './_page-components/employee/employee.module#EmployeeModule',
    },
    {
      path: 'permission',
      loadChildren: './_page-components/permission/permission.module#PermissionModule',
    },
    {
      path: 'alert',
      loadChildren: './_page-components/alert/alert.module#AlertModule',
    },
    {
      path: 'error_page',
      component: ErrorPageComponent,
    },
    {
      path: 'approval',
      loadChildren: './_page-components/approval/approval.module#ApprovalModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
