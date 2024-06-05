import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackingSlipComponent } from './packing-slip.component';
import { PackingSlipIndexComponent } from './c/packing-slip-index.component';
import { PackingSlipShowComponent } from './c/packing-slip-show.component';
import { PackingSlipImportComponent } from './c/packing-slip-import.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: PackingSlipComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: PackingSlipIndexComponent,
      data: {
        breadcrumb: 'Packing Slip',
        module: 'logictic',
        feature: 'packing-slip',
        method: 'index',
        route_code: 'logistic-activities-packing-slip',
      },
    },
    {
      path: 'view/:id',
      component: PackingSlipShowComponent,
      data: {
        breadcrumb: 'Packing Slip View',
        module: 'logictic',
        feature: 'packing-slip',
        method: 'view',
        route_code: 'logistic-activities-packing-slip',
      },
    },
    {
      path: 'index/page',
      component: PackingSlipIndexComponent,
      data: {
        breadcrumb: 'Packing Slip',
        module: 'logictic',
        feature: 'packing-slip',
        method: 'index',
        route_code: 'logistic-activities-packing-slip',
      },
    },
    {
      path: 'import',
      component: PackingSlipImportComponent,
      data: {
        breadcrumb: 'Import',
        module: 'logistic',
        feature: 'packing-slip',
        method: 'import',
        route_code: 'logistic-activities-packing-slip',
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
  PackingSlipShowComponent,
];
