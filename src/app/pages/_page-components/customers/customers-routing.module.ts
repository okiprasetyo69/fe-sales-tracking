import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomersIndexComponent } from './c/customers-index.component';
import { CustomersEditComponent } from './c/customers-edit.component';
import { CustomersImportComponent } from './c/customers-import.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';


const routes: Routes = [{
  path: '',
  component: CustomersComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    // Sales
    // {
    //   path: 'sales/index',
    //   component: CustomersIndexComponent,
    //   data: {
    //     breadcrumb: 'Customers',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'index',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // {
    //   path: 'sales/index/page',
    //   component: CustomersIndexComponent,
    //   data: {
    //     breadcrumb: 'Customers',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'index',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // {
    //   path: 'sales/create',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Create',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'create',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // {
    //   path: 'sales/edit/:id',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Edit',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'edit',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // {
    //   path: 'sales/view/:id',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Edit',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'view',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // {
    //   path: 'sales/import',
    //   component: CustomersImportComponent,
    //   data: {
    //     breadcrumb: 'Import',
    //     module: 'sales',
    //     feature: 'customers',
    //     method: 'import',
    //     route_code: 'sales-data-customers'
    //   },
    // },
    // Logistic
    // {
    //   path: 'logistic/index',
    //   component: CustomersIndexComponent,
    //   data: {
    //     breadcrumb: 'Customers',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'index',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // {
    //   path: 'logistic/index/page',
    //   component: CustomersIndexComponent,
    //   data: {
    //     breadcrumb: 'Customers',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'index',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // {
    //   path: 'logistic/create',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Create',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'create',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // {
    //   path: 'logistic/edit/:id',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Edit',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'edit',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // {
    //   path: 'logistic/view/:id',
    //   component: CustomersEditComponent,
    //   data: {
    //     breadcrumb: 'Customers Edit',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'view',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // {
    //   path: 'logistic/import',
    //   component: CustomersImportComponent,
    //   data: {
    //     breadcrumb: 'Import',
    //     module: 'logistic',
    //     feature: 'customers',
    //     method: 'import',
    //     route_code: 'logistic-data-customers'
    //   },
    // },
    // Settings
    {
      path: 'index',
      component: CustomersIndexComponent,
      data: {
        breadcrumb: 'Index',
        module: 'settings',
        feature: 'customers',
        method: 'index',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'index/page',
      component: CustomersIndexComponent,
      data: {
        breadcrumb: 'Index',
        module: 'settings',
        feature: 'customers',
        method: 'index',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'view/:id',
      component: CustomersEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'settings',
        feature: 'customers',
        method: 'view',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: CustomersEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'settings',
        feature: 'customers',
        method: 'view',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'create',
      component: CustomersEditComponent,
      data: {
        breadcrumb: 'Customers Create',
        module: 'settings',
        feature: 'customers',
        method: 'create',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'edit/:id',
      component: CustomersEditComponent,
      data: {
        breadcrumb: 'Customers Edit',
        module: 'settings',
        feature: 'customers',
        method: 'edit',
        route_code: 'setting-data-customers',
      },
    },
    {
      path: 'import',
      component: CustomersImportComponent,
      data: {
        breadcrumb: 'Import',
        module: 'settings',
        feature: 'customers',
        method: 'import',
        route_code: 'setting-data-customers',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {
}

export const routedComponents = [
  CustomersComponent,
  CustomersIndexComponent,
  CustomersEditComponent,
  CustomersImportComponent,
];
