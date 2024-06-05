import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceIndexComponent } from './c/invoice-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: InvoiceComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Report Invoice',
        module: 'collector',
        feature: 'report',
        method: 'index',
        route_code: 'collector-report-invoice',
      },
    },
    {
      path: 'index/page',
      component: InvoiceIndexComponent,
      data: {
        breadcrumb: 'Report Invoice',
        module: 'collector',
        feature: 'report',
        method: 'index',
        route_code: 'collector-report-invoice',
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
];
