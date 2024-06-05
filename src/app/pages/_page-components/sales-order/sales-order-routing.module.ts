import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderIndexComponent } from './c/sales-order-index.component';
import { SalesOrderShowComponent } from './c/sales-order-show.component';
import { SalesOrderImportComponent } from './c/sales-order-import.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: SalesOrderComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: SalesOrderIndexComponent,
      data: {
        breadcrumb: 'Sales Order',
        module: 'sales',
        feature: 'sales-order',
        method: 'index',
        route_code: 'sales-activities-sales-order',
      },
    },
    {
      path: 'index/page',
      component: SalesOrderIndexComponent,
      data: {
        breadcrumb: 'Sales Order',
        module: 'sales',
        feature: 'sales-order',
        method: 'index',
        route_code: 'sales-activities-sales-order',
      },
    },
    {
      path: 'view/:id',
      component: SalesOrderShowComponent,
      data: {
        breadcrumb: 'Sales Order View',
        module: 'sales',
        feature: 'sales-order',
        method: 'view',
        route_code: 'sales-activities-sales-order',
      },
    },
    {
      path: 'import',
      component: SalesOrderImportComponent,
      data: {
        breadcrumb: 'Sales Order Import',
        module: 'sales',
        feature: 'sales-order',
        method: 'import',
        route_code: 'sales-activities-sales-order',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderRoutingModule {
}

export const routedComponents = [
  SalesOrderComponent,
  SalesOrderIndexComponent,
  SalesOrderShowComponent,
  SalesOrderImportComponent,
];
