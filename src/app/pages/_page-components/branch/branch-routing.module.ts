import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch.component';
import { BranchEditComponent } from './c/branch-edit.component';
import { BranchIndexComponent } from './c/branch-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { BranchImportComponent } from './c/branch-import.component';

const routes: Routes = [{
  path: '',
  component: BranchComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: BranchIndexComponent,
      data: {
        breadcrumb: 'Branch',
        module: 'settings',
        feature: 'branch',
        method: 'index',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'create',
      component: BranchEditComponent,
      data: {
        breadcrumb: 'Create',
        module: 'settings',
        feature: 'branch',
        method: 'create',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'view/:id',
      component: BranchEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'settings',
        feature: 'branch',
        method: 'view',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: BranchEditComponent,
      data: {
        breadcrumb: 'View',
        module: 'settings',
        feature: 'branch',
        method: 'view',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'edit/:id',
      component: BranchEditComponent,
      data: {
        breadcrumb: 'Edit',
        module: 'settings',
        feature: 'branch',
        method: 'edit',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'index/page',
      component: BranchIndexComponent,
      data: {
        breadcrumb: 'Branch',
        module: 'settings',
        feature: 'branch',
        method: 'index',
        route_code: 'setting-data-branches',
      },
    },
    {
      path: 'import',
      component: BranchImportComponent,
      data: {
        breadcrumb: 'Branch',
        module: 'settings',
        feature: 'branch',
        method: 'import',
        route_code: 'setting-data-branches',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule { }

export const routedComponents = [
  BranchComponent,
  BranchIndexComponent,
  BranchEditComponent,
  BranchImportComponent,
];
