import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentIndexComponent } from './c/payment-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: PaymentComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PaymentIndexComponent,
      data: {
        breadcrumb: 'Report Payment',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-payment',
      },
    },
    {
      path: 'index/page',
      component: PaymentIndexComponent,
      data: {
        breadcrumb: 'Report Payment',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-payment',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {
}

export const routedComponents = [
  PaymentComponent,
  PaymentIndexComponent,
];
