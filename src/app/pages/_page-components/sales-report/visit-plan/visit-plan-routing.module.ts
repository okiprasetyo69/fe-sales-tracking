import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitPlanComponent } from './visit-plan.component';
import { VisitPlanIndexComponent } from './c/visit-plan-index.component';
import { AuthPermissionGuard } from '../../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: VisitPlanComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: VisitPlanIndexComponent,
      data: {
        breadcrumb: 'Report Visitplan',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-visit-plan',
      },
    },
    {
      path: 'index/page',
      component: VisitPlanIndexComponent,
      data: {
        breadcrumb: 'Report Visitplan',
        module: 'sales',
        feature: 'report',
        method: 'index',
        route_code: 'sales-report-visit-plan',
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
];
