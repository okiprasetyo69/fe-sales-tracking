import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './area.component';
import { AreaIndexComponent } from './c/area-index.component';
import { AreaEditComponent } from './c/area-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: AreaComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: AreaIndexComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'index',
        route_code: 'setting-config-area',
      },
    },
    {
      path: 'index/page',
      component: AreaIndexComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'index',
        route_code: 'setting-config-area',
      },
    },
    {
      path: 'create',
      component: AreaEditComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'create',
        route_code: 'setting-config-area',
      },
    },
    {
      path: 'edit/:id',
      component: AreaEditComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'edit',
        route_code: 'setting-config-area',
      },
    },
    {
      path: 'view/:id',
      component: AreaEditComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'view',
        route_code: 'setting-config-area',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: AreaEditComponent,
      data: {
        breadcrumb: 'Area',
        module: 'settings',
        feature: 'area',
        method: 'view',
        route_code: 'setting-config-area',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule { }

export const routedComponents = [
  AreaComponent,
  AreaIndexComponent,
  AreaEditComponent,
];
