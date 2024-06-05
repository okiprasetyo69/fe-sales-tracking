import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderIndexComponent } from './c/sales-order-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: SalesOrderComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: SalesOrderIndexComponent,
      data: {
        breadcrumb: 'Sales Order Report',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-sales-order',
      },
    },
    {
      path: 'index/page',
      component: SalesOrderIndexComponent,
      data: {
        breadcrumb: 'Sales Order Report',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-sales-order',
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
];
