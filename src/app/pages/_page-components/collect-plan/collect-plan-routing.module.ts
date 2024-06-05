import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectPlanComponent } from './collect-plan.component';
import { CollectPlanIndexComponent } from './c/collect-plan-index.component';
import { CollectPlanGenerateComponent } from './c/collect-plan-generate.component';
import { CollectPlanEditComponent } from './c/collect-plan-edit.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: CollectPlanComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: CollectPlanIndexComponent,
      data: {
        breadcrumb: 'Collect Plan',
        module: 'collector',
        feature: 'collect-plan',
        method: 'index',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'index/page',
      component: CollectPlanIndexComponent,
      data: {
        breadcrumb: 'Collect Plan',
        module: 'collector',
        feature: 'collect-plan',
        method: 'index',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'generate',
      component: CollectPlanGenerateComponent,
      data: {
        breadcrumb: 'Collect Plan Generate',
        module: 'collector',
        feature: 'collect-plan',
        method: 'generate',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'create',
      component: CollectPlanEditComponent,
      data: {
        breadcrumb: 'Collect Plan Create',
        module: 'collector',
        feature: 'collect-plan',
        method: 'create',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'edit/:id',
      component: CollectPlanEditComponent,
      data: {
        breadcrumb: 'Collect Plan Edit',
        module: 'collector',
        feature: 'collect-plan',
        method: 'edit',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'view/:id',
      component: CollectPlanEditComponent,
      data: {
        breadcrumb: 'Collect Plan Edit',
        module: 'collector',
        feature: 'collect-plan',
        method: 'view',
        route_code: 'collector-activities-visit-plan',
      }
    },
    {
      path: 'view_approval/:id_approval',
      component: CollectPlanEditComponent,
      data: {
        breadcrumb: 'Collect Plan Edit',
        module: 'collector',
        feature: 'collect-plan',
        method: 'view',
        route_code: 'collector-activities-visit-plan',
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectPlanRoutingModule {
}

export const routedComponents = [
  CollectPlanComponent,
  CollectPlanIndexComponent,
  CollectPlanGenerateComponent,
  CollectPlanEditComponent,
];
