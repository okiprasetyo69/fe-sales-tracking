import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { AssetsIndexComponent } from './c/assets-index.component';
import { AssetsComponent } from './assets.component';
import { AssetsEditComponent } from './c/assets-edit.component';
import { AssetsImportComponent } from './c/assets-import.component';

const routes: Routes = [{
  path: '',
  component: AssetsComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: '',
      redirectTo: 'index',
    },
    {
      path: 'index',
      component: AssetsIndexComponent,
      data: {
        breadcrumb: 'Assets',
        module: 'assets',
        feature: 'assets',
        method: 'index',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'create',
      component: AssetsEditComponent,
      data: {
        breadcrumb: 'Create',
        module: 'assets',
        feature: 'assets',
        method: 'create',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'view/:id',
      component: AssetsEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'assets',
        feature: 'assets',
        method: 'view',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: AssetsEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'assets',
        feature: 'assets',
        method: 'view',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'edit/:id',
      component: AssetsEditComponent,
      data: {
        breadcrumb: 'Edit',
        module: 'assets',
        feature: 'assets',
        method: 'edit',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'index/page',
      component: AssetsIndexComponent,
      data: {
        breadcrumb: 'Branch',
        module: 'assets',
        feature: 'assets',
        method: 'index',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: 'import',
      component: AssetsImportComponent,
      data: {
        breadcrumb: 'Import',
        module: 'assets',
        feature: 'assets',
        method: 'import',
        route_code: 'assets-data-assets',
      },
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsRoutingModule {
}
