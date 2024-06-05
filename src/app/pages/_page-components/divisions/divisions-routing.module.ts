import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivisionsComponent } from './divisions.component';
import { DivisionIndexComponent } from './c/divisions-index.component';
import { DivisionsEditComponent } from './c/divisions-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { DivisionsImportComponent } from './c/divisions-import.component';

const routes: Routes = [{
  path: '',
  component: DivisionsComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: DivisionIndexComponent,
      data: {
        breadcrumb: 'Divisions',
        module: 'settings',
        feature: 'divisions',
        method: 'index',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'index/page',
      component: DivisionIndexComponent,
      data: {
        breadcrumb: 'Divisions',
        module: 'settings',
        feature: 'divisions',
        method: 'index',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'create',
      component: DivisionsEditComponent,
      data: {
        breadcrumb: 'Divisions Create',
        module: 'settings',
        feature: 'divisions',
        method: 'create',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'edit/:id',
      component: DivisionsEditComponent,
      data: {
        breadcrumb: 'Divisions Edit',
        module: 'settings',
        feature: 'divisions',
        method: 'edit',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'view/:id',
      component: DivisionsEditComponent,
      data: {
        breadcrumb: 'Divisions View',
        module: 'settings',
        feature: 'divisions',
        method: 'view',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: DivisionsEditComponent,
      data: {
        breadcrumb: 'Divisions View',
        module: 'settings',
        feature: 'divisions',
        method: 'view',
        route_code: 'setting-data-division',
      },
    },
    {
      path: 'import',
      component: DivisionsImportComponent,
      data: {
        breadcrumb: 'Divisions Import',
        module: 'settings',
        feature: 'divisions',
        method: 'import',
        route_code: 'setting-data-division',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionsRoutingModule { }

export const routedComponents = [
  DivisionsComponent,
  DivisionIndexComponent,
  DivisionsEditComponent,
  DivisionsImportComponent,
];
