import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentIndexComponent } from './c/payment-index.component';
import { PaymentShowComponent } from './c/payment-show.component';
import { PaymentImportComponent } from './c/payment-import.component';
import { PaymentConfirmationIndexComponent } from './c/payment-confirmation-index.component';
import { PaymentConfirmationShowComponent } from './c/payment-confirmation-show.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { ReceiptCheckerFormComponent } from './c/receipt-checker-form.component';

const routes: Routes = [{
  path: '',
  component: PaymentComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment',
        module: 'sales',
        feature: 'payment',
        method: 'index',
        route_code: 'sales-activities-payment',
      },
    },
    // {
    //   path: 'index/confirmation',
    //   component: PaymentConfirmationIndexComponent,
    //   data: {
    //     breadcrumb: 'Payment Confirmation',
    //     module: 'sales',
    //     feature: 'payment',
    //     method: 'index',
    //   },
    // },
    {
      path: 'view/:id',
      component: PaymentShowComponent,
      data: {
        breadcrumb: 'Payment View',
        module: 'sales',
        feature: 'payment',
        method: 'view',
        route_code: 'sales-activities-payment',
      },
    },
    {
      path: 'view/confirmation/:id',
      component: PaymentConfirmationShowComponent,
      data: {
        breadcrumb: 'Payment View',
        module: 'sales',
        feature: 'payment',
        method: 'view',
        route_code: 'sales-activities-payment',
      },
    },
    {
      path: 'import',
      component: PaymentImportComponent,
      data: {
        breadcrumb: 'Payment Import',
        module: 'sales',
        feature: 'payment',
        method: 'import',
        route_code: 'sales-activities-payment',
      },
    },
    {
      path: 'index/page',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment',
        module: 'sales',
        feature: 'payment',
        method: 'index',
        route_code: 'sales-activities-payment',
      },
    },
    {
      path: 'index/confirmation/page',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment Confirmation',
        module: 'sales',
        feature: 'payment',
        method: 'index',
        route_code: 'sales-activities-payment',
      },
    },
    {
      path: 'receipt_checker/index',
      component: ReceiptCheckerFormComponent,
      data: {
        breadcrumb: 'Payment Receipt Checker',
        module: 'sales',
        feature: 'payment',
        method: 'index',
        route_code: 'sales-activities-payment',
      },
    },
    // custom collector
    {
      path: 'index',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment',
        module: 'collector',
        feature: 'payment',
        method: 'index',
        route_code: 'collector-activities-payment',
      },
    },
    // {
    //   path: 'index/confirmation',
    //   component: PaymentConfirmationIndexComponent,
    //   data: {
    //     breadcrumb: 'Payment Confirmation',
    //     module: 'sales',
    //     feature: 'payment',
    //     method: 'index',
    //   },
    // },
    {
      path: 'view/:id',
      component: PaymentShowComponent,
      data: {
        breadcrumb: 'Payment View',
        module: 'collector',
        feature: 'payment',
        method: 'view',
        route_code: 'collector-activities-payment',
      },
    },
    {
      path: 'view/confirmation/:id',
      component: PaymentConfirmationShowComponent,
      data: {
        breadcrumb: 'Payment View',
        module: 'collector',
        feature: 'payment',
        method: 'view',
        route_code: 'collector-activities-payment',
      },
    },
    {
      path: 'import',
      component: PaymentImportComponent,
      data: {
        breadcrumb: 'Payment Import',
        module: 'collector',
        feature: 'payment',
        method: 'import',
        route_code: 'collector-activities-payment',
      },
    },
    {
      path: 'index/page',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment',
        module: 'collector',
        feature: 'payment',
        method: 'index',
        route_code: 'collector-activities-payment',
      },
    },
    {
      path: 'index/confirmation/page',
      component: PaymentConfirmationIndexComponent,
      data: {
        breadcrumb: 'Payment Confirmation',
        module: 'collector',
        feature: 'payment',
        method: 'index',
        route_code: 'collector-activities-payment',
      },
    },
    {
      path: 'receipt_checker/index',
      component: ReceiptCheckerFormComponent,
      data: {
        breadcrumb: 'Payment Receipt Checker',
        module: 'collector',
        feature: 'payment',
        method: 'index',
        route_code: 'collector-activities-payment',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }

export const routedComponents = [
  PaymentComponent,
  PaymentIndexComponent,
  PaymentShowComponent,
  PaymentImportComponent,
  PaymentConfirmationIndexComponent,
  PaymentConfirmationShowComponent,
  ReceiptCheckerFormComponent,
];
