import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupsIndexComponent } from './c/user-groups-index.component';
import { UserGroupsEditComponent } from './c/user-groups-edit.component';
import { UserGroupsComponent } from './user-groups.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: UserGroupsComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: UserGroupsIndexComponent,
      data: {
        breadcrumb: 'User Groups',
        module: 'settings',
        feature: 'user-groups',
        method: 'index',
        route_code: 'setting-user-group',
      },
    },
    {
      path: 'index/page',
      component: UserGroupsIndexComponent,
      data: {
        breadcrumb: 'User Groups',
        module: 'settings',
        feature: 'user-groups',
        method: 'index',
        route_code: 'setting-user-group',
      },
    },
    {
      path: 'create',
      component: UserGroupsEditComponent,
      data: {
        breadcrumb: 'User Group Create',
        module: 'settings',
        feature: 'user-groups',
        method: 'create',
        route_code: 'setting-user-group',
      },
    },
    {
      path: 'edit/:id',
      component: UserGroupsEditComponent,
      data: {
        breadcrumb: 'User Group Edit',
        module: 'settings',
        feature: 'user-groups',
        method: 'edit',
        route_code: 'setting-user-group',
      },
    },
    {
      path: 'view/:id',
      component: UserGroupsEditComponent,
      data: {
        breadcrumb: 'User Group View',
        module: 'settings',
        feature: 'user-groups',
        method: 'view',
        route_code: 'setting-user-group',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: UserGroupsEditComponent,
      data: {
        breadcrumb: 'User Group View',
        module: 'settings',
        feature: 'user-groups',
        method: 'view',
        route_code: 'setting-user-group',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserGroupsRoutingModule { }

export const routedComponents = [
  UserGroupsComponent,
  UserGroupsIndexComponent,
  UserGroupsEditComponent,
];
