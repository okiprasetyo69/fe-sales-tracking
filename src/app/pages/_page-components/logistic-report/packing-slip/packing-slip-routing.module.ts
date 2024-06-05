import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackingSlipComponent } from './packing-slip.component';
import { PackingSlipIndexComponent } from './c/packing-slip-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: PackingSlipComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PackingSlipIndexComponent,
      data: {
        breadcrumb: 'Report Packing Slip',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-packing-slip',
      },
    },
    {
      path: 'index/page',
      component: PackingSlipIndexComponent,
      data: {
        breadcrumb: 'Report Packing Slip',
        module: 'logistic',
        feature: 'report',
        method: 'index',
        route_code: 'logistic-report-packing-slip',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackingSlipRoutingModule {
}

export const routedComponents = [
  PackingSlipComponent,
  PackingSlipIndexComponent,
];
