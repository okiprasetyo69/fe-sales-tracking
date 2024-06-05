import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { AssetsTypeComponent } from './assets-type.component';
import { AssetsTypeIndexComponent } from './c/assets-type-index.component';

const routes: Routes = [{
  path: '',
  component: AssetsTypeComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: AssetsTypeIndexComponent,
      data: {
        breadcrumb: 'Assets',
        module: 'assets_type',
        feature: 'assets-type',
        method: 'index',
        route_code: 'assets-data-assets-type',
      },
    },
    {
      path: 'view/:id',
      component: AssetsTypeIndexComponent,
      data: {
        breadcrumb: 'View',
        module: 'assets_type',
        feature: 'assets-type',
        method: 'view',
        route_code: 'assets-data-assets-type',
      },
    },
    {
      path: 'index/page',
      component: AssetsTypeIndexComponent,
      data: {
        breadcrumb: 'Assets',
        module: 'assets',
        feature: 'assets-type',
        method: 'index',
        route_code: 'assets-data-assets-type',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsTypeRoutingModule {
}
