import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeIndexComponent } from './c/employee-index.component';
import { EmployeeEditComponent } from './c/employee-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { EmployeeImportComponent } from './c/employee-import.component';

const routes: Routes = [{
  path: '',
  component: EmployeeComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'sales/index',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Sales',
        module: 'employee',
        feature: 'sales',
        method: 'index',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/index/page',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Sales',
        module: 'employee',
        feature: 'sales',
        method: 'index',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/create',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Sales Create',
        module: 'employee',
        feature: 'sales',
        method: 'create',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/edit/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Sales Edit',
        module: 'employee',
        feature: 'sales',
        method: 'edit',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/view/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Sales View',
        module: 'employee',
        feature: 'sales',
        method: 'view',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/view_approval/:id_approval',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Sales View',
        module: 'employee',
        feature: 'sales',
        method: 'view',
        route_code: 'sales-data-representative',
      },
    },
    {
      path: 'sales/import',
      component: EmployeeImportComponent,
      data: {
        breadcrumb: 'Sales Import',
        module: 'employee',
        feature: 'sales',
        method: 'import',
        route_code: 'sales-data-representative',
      },
    },

    // custom collector
    {
      path: 'collector/index',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Collector',
        module: 'employee',
        feature: 'collector',
        method: 'index',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/index/page',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Collector',
        module: 'employee',
        feature: 'collector',
        method: 'index',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/create',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Collector Create',
        module: 'employee',
        feature: 'collector',
        method: 'create',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/edit/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Collector Edit',
        module: 'employee',
        feature: 'collector',
        method: 'edit',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/view/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Collector View',
        module: 'employee',
        feature: 'collector',
        method: 'view',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/view_approval/:id_approval',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Collector View',
        module: 'employee',
        feature: 'collector',
        method: 'view',
        route_code: 'collector-data-representative',
      },
    },
    {
      path: 'collector/import',
      component: EmployeeImportComponent,
      data: {
        breadcrumb: 'Collector Import',
        module: 'employee',
        feature: 'collector',
        method: 'import',
        route_code: 'collector-data-representative',
      },
    },
    // 

    {
      path: 'supervisor/index',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Supervisor',
        module: 'employee',
        feature: 'supervisor',
        method: 'index',
        route_code: 'setting-user-admin',
      },
    },
    {
      path: 'supervisor/index/page',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Supervisor',
        module: 'employee',
        feature: 'supervisor',
        method: 'index',
        route_code: 'setting-user-admin',

      },
    },
    {
      path: 'supervisor/create',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor Create',
        module: 'employee',
        feature: 'supervisor',
        method: 'create',
        route_code: 'setting-user-admin',
      },
    },
    {
      path: 'supervisor/edit/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor Edit',
        module: 'employee',
        feature: 'supervisor',
        method: 'edit',
        route_code: 'setting-user-admin',

      },
    },
    {
      path: 'supervisor/view/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor View',
        module: 'employee',
        feature: 'supervisor',
        method: 'view',
        route_code: 'setting-user-admin',
      },
    },
    {
      path: 'supervisor/view_approval/:id_approval',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor View',
        module: 'employee',
        feature: 'supervisor',
        method: 'view',
        route_code: 'setting-user-admin',
      },
    },
    {
      path: 'supervisor/import',
      component: EmployeeImportComponent,
      data: {
        breadcrumb: 'Supervisor Import',
        module: 'employee',
        feature: 'supervisor',
        method: 'import',
        route_code: 'setting-user-admin',
      },
    },
    {
      path: 'logistic/index',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Supervisor',
        module: 'employee',
        feature: 'logistic',
        method: 'index',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/index/page',
      component: EmployeeIndexComponent,
      data: {
        breadcrumb: 'Supervisor',
        module: 'employee',
        feature: 'logistic',
        method: 'index',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/create',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor Create',
        module: 'employee',
        feature: 'logistic',
        method: 'create',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/edit/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor Edit',
        module: 'employee',
        feature: 'logistic',
        method: 'edit',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/view/:id',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor View',
        module: 'employee',
        feature: 'logistic',
        method: 'view',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/view_approval/:id_approval',
      component: EmployeeEditComponent,
      data: {
        breadcrumb: 'Supervisor View',
        module: 'employee',
        feature: 'logistic',
        method: 'view',
        route_code: 'logistic-data-crew',
      },
    },
    {
      path: 'logistic/import',
      component: EmployeeImportComponent,
      data: {
        breadcrumb: 'Logistic Import',
        module: 'employee',
        feature: 'logistic',
        method: 'import',
        route_code: 'logistic-data-crew',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }

export const routedComponents = [
  EmployeeComponent,
  EmployeeIndexComponent,
  EmployeeEditComponent,
];
