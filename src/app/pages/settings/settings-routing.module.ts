import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [{
  path: '',
  component: SettingsComponent,
  data: {
    breadcrumb: 'Settings',
  },
  children: [
    {
      path: 'company',
      loadChildren: '../_page-components/company/company.module#CompanyModule',
    },
    {
      path: 'branch',
      loadChildren: '../_page-components/branch/branch.module#BranchModule',
    },
    {
      path: 'divisions',
      loadChildren: '../_page-components/divisions/divisions.module#DivisionsModule',
    },
    {
      path: 'user_groups',
      loadChildren: '../_page-components/user-groups/user-groups.module#UserGroupsModule',
    },
    {
      path: 'user',
      loadChildren: '../_page-components/user/user.module#UserModule',
    },
    {
      path: 'notifications',
      loadChildren: '../_page-components/setting-notifications/setting-notifications.module#SettingNotificationsModule',
    },
    {
      path: 'configurations_general',
      loadChildren:
        '../_page-components/configurations-general/configurations-general.module#ConfigurationsGeneralModule',
    },
    {
      path: 'area',
      loadChildren:
        '../_page-components/area/area.module#AreaModule',
    },
    {
      path: 'customers',
      loadChildren:
        '../_page-components/customers/customers.module#CustomersModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

export const routedComponents = [
  SettingsComponent,
];
