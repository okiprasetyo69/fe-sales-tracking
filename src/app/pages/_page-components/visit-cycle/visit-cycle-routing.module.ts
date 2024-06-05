import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitCycleComponent } from './visit-cycle.component';
import { VisitCycleIndexComponent } from './c/visit-cycle-index.component';
import { VisitCycleEditComponent } from './c/visit-cycle-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { VisitCycleImportComponent } from './c/visit-cycle-import.component';

const routes: Routes = [{
  path: '',
  component: VisitCycleComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: VisitCycleIndexComponent,
      data: {
        breadcrumb: 'Visit Cycle',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'index',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'index/page',
      component: VisitCycleIndexComponent,
      data: {
        breadcrumb: 'Visit Cycle',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'index',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'import',
      component: VisitCycleImportComponent,
      data: {
        breadcrumb: 'Visit Cycle Import',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'import',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'create',
      component: VisitCycleEditComponent,
      data: {
        breadcrumb: 'Visit Cycle Create',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'create',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'edit/:id',
      component: VisitCycleEditComponent,
      data: {
        breadcrumb: 'Visit Cycle Edit',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'edit',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'view/:id',
      component: VisitCycleEditComponent,
      data: {
        breadcrumb: 'Visit Cycle View',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'view',
        route_code: 'sales-data-visit-cycle',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: VisitCycleEditComponent,
      data: {
        breadcrumb: 'Visit Cycle View',
        module: 'sales',
        feature: 'visit-cycle',
        method: 'view',
        route_code: 'sales-data-visit-cycle',
      },
    },
    // {
    //   path: 'plan/index',
    //   component: VisitCycleIndexComponent,
    //   data: {
    //     breadcrumb: 'Visit Plan',
    //     module: 'sales',
    //     feature: 'visit-plan',
    //     method: 'index',
    //   },
    // },
    // {
    //   path: 'plan/edit',
    //   component: VisitCycleCreateComponent,
    //   data: {
    //     breadcrumb: 'Visit Plan Edit',
    //     module: 'sales',
    //     feature: 'visit-plan',
    //     method: 'edit',
    //   },
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitCycleRoutingModule {
}

export const routedComponents = [
  VisitCycleComponent,
  VisitCycleIndexComponent,
  VisitCycleEditComponent,
  VisitCycleImportComponent,
];
