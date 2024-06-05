import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceIndexComponent } from './c/invoice-index.component';
import { InvoiceShowComponent } from './c/invoice-show.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: InvoiceComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Invoice',
        module: 'sales',
        feature: 'invoice',
        method: 'index',
        route_code: 'sales-activities-invoice',
      },
    },
    {
      path: 'view/:id',
      component: InvoiceShowComponent,
      data: {
        breadcrumb: 'Invoice View',
        module: 'sales',
        feature: 'invoice',
        method: 'view',
        route_code: 'sales-activities-invoice',
      },
    },
    {
      path: 'index/page',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Invoice',
        module: 'sales',
        feature: 'invoice',
        method: 'index',
        route_code: 'sales-activities-invoice',
      },
    },
    // 
    {
      path: 'index',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Invoice',
        module: 'collector',
        feature: 'invoice',
        method: 'index',
        route_code: 'collector-activities-invoice',
      },
    },
    {
      path: 'view/:id',
      component: InvoiceShowComponent,
      data: {
        breadcrumb: 'Invoice View',
        module: 'collector',
        feature: 'invoice',
        method: 'view',
        route_code: 'collector-activities-invoice',
      },
    },
    {
      path: 'index/page',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Invoice',
        module: 'collector',
        feature: 'invoice',
        method: 'index',
        route_code: 'collector-activities-invoice',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {
}

export const routedComponents = [
  InvoiceComponent,
  InvoiceIndexComponent,
  InvoiceShowComponent,
];
