import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingNotificationsComponent } from './setting-notifications.component';
import { SettingNotificationsIndexComponent } from './c/setting-notifications-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

// const routes: Routes = [{
//   path: '',
//   component: SettingNotificationsIndexComponent,
//   canActivateChild: [AuthPermissionGuard],
//   data: {
//     breadcrumb: 'Notifications Setting',
//     module: 'settings',
//     feature: 'setting-notifications',
//     method: 'index',
//   },
// }];

const routes: Routes = [{
  path: '',
  component: SettingNotificationsComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'sales',
      component: SettingNotificationsIndexComponent,
      data: {
        breadcrumb: 'Notifications Setting Sales',
        module: 'settings',
        feature: 'sales',
        method: 'index',
        route_code: 'setting-notif-sales',
      },
    },
    {
      path: 'logistic',
      component: SettingNotificationsIndexComponent,
      data: {
        breadcrumb: 'Notifications Setting Logistic',
        module: 'settings',
        feature: 'logistic',
        method: 'index',
        route_code: 'setting-notif-logistic',
      },
    },
    {
      path: 'routing',
      component: SettingNotificationsIndexComponent,
      data: {
        breadcrumb: 'Notifications Setting Routing',
        module: 'settings',
        feature: 'routing',
        method: 'index',
        route_code: 'setting-notif-routing',
      },
    },
    {
      path: 'asset',
      component: SettingNotificationsIndexComponent,
      data: {
        breadcrumb: 'Notifications Setting Asset',
        module: 'settings',
        feature: 'asset',
        method: 'index',
        route_code: 'setting-notif-asset',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingNotificationsRoutingModule { }

export const routedComponents = [
  SettingNotificationsComponent,
  SettingNotificationsIndexComponent,
];
