import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitPlanComponent } from './visit-plan.component';
import { VisitPlanIndexComponent } from './c/visit-plan-index.component';
import { VisitPlanGenerateComponent } from './c/visit-plan-generate.component';
import { VisitPlanEditComponent } from './c/visit-plan-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: VisitPlanComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: VisitPlanIndexComponent,
      data: {
        breadcrumb: 'Visit Plan',
        module: 'sales',
        feature: 'visit-plan',
        method: 'index',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'index/page',
      component: VisitPlanIndexComponent,
      data: {
        breadcrumb: 'Visit Plan',
        module: 'sales',
        feature: 'visit-plan',
        method: 'index',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'generate',
      component: VisitPlanGenerateComponent,
      data: {
        breadcrumb: 'Visit Plan Generate',
        module: 'sales',
        feature: 'visit-plan',
        method: 'generate',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'create',
      component: VisitPlanEditComponent,
      data: {
        breadcrumb: 'Visit Plan Create',
        module: 'sales',
        feature: 'visit-plan',
        method: 'create',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'edit/:id',
      component: VisitPlanEditComponent,
      data: {
        breadcrumb: 'Visit Plan Edit',
        module: 'sales',
        feature: 'visit-plan',
        method: 'edit',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'view/:id',
      component: VisitPlanEditComponent,
      data: {
        breadcrumb: 'Visit Plan Edit',
        module: 'sales',
        feature: 'visit-plan',
        method: 'view',
        route_code: 'sales-activities-visit-plan',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: VisitPlanEditComponent,
      data: {
        breadcrumb: 'Visit Plan Edit',
        module: 'sales',
        feature: 'visit-plan',
        method: 'view',
        route_code: 'sales-activities-visit-plan',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitPlanRoutingModule {
}

export const routedComponents = [
  VisitPlanComponent,
  VisitPlanIndexComponent,
  VisitPlanGenerateComponent,
  VisitPlanEditComponent,
];
