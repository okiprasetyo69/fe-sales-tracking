import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalComponent } from './approval.component';
import { ApprovalIndexComponent } from './c/approval-index.component';
// import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { ApprovalDashboardIndexComponent } from './c/approval-dashboard-index.component';

const routes: Routes = [{
  path: '',
  component: ApprovalComponent,
  // canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: ApprovalIndexComponent,
    },
    {
      path: 'index/page',
      component: ApprovalIndexComponent,
    },
    {
      path: 'dashboard',
      component: ApprovalDashboardIndexComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovalRoutingModule { }

export const routedComponents = [
  ApprovalComponent,
  ApprovalIndexComponent,
  ApprovalDashboardIndexComponent,
];
