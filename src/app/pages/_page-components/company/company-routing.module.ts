import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyShowComponent } from './c/company-show.component';
import { CompanyEditComponent } from './c/company-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'show',
      component: CompanyShowComponent,
      data: {
        breadcrumb: 'CompanyNameFull',
        module: 'settings',
        feature: 'company',
        method: 'show',
        route_code: 'setting-data-company-info',
      },
    },
    // {
    //   path: 'create',
    //   component: CompanyCreateComponent,
    //   data: {
    //     breadcrumb: 'CompanyNameFull Create',
    //     module: 'settings',
    //     feature: 'company',
    //     method: 'create',
    //   },
    // },
    {
      path: 'edit',
      component: CompanyEditComponent,
      data: {
        breadcrumb: 'CompanyNameFull Edit',
        module: 'settings',
        feature: 'company',
        method: 'edit',
        route_code: 'setting-data-company-info',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }

export const routedComponents = [
  CompanyComponent,
  CompanyShowComponent,
  CompanyEditComponent,
];
