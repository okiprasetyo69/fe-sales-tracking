import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSalesComponent } from './order-sales.component';
import { OrderSalesIndexComponent } from './c/order-sales-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: OrderSalesComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: OrderSalesIndexComponent,
      data: {
        breadcrumb: 'Order Sales Report',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-order-sales',
      },
    },
    {
      path: 'index/page',
      component: OrderSalesIndexComponent,
      data: {
        breadcrumb: 'Order Sales Report',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-order-sales',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSalesRoutingModule {
}

export const routedComponents = [
  OrderSalesComponent,
  OrderSalesIndexComponent,
];
