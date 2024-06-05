import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationsGeneralComponent } from './configurations-general.component';
import { ConfigurationsGeneralIndexComponent } from './c/configurations-general-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: ConfigurationsGeneralComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'view',
      component: ConfigurationsGeneralIndexComponent,
      data: {
        breadcrumb: 'General',
        module: 'settings',
        feature: 'configurations-general',
        method: 'view',
        route_code: 'setting-config-general',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationsGeneralRoutingModule { }

export const routedComponents = [
  ConfigurationsGeneralComponent,
  ConfigurationsGeneralIndexComponent,
];
