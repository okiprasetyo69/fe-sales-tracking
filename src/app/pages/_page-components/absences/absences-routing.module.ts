import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { AbsenceIndexComponent } from './c/absence-index.component';
import { AbsencesComponent } from './absences.component';


const routes: Routes = [{
  path: '',
  component:AbsencesComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: '',
      redirectTo: 'index',
    },
    {
      path: 'index',
      component:AbsenceIndexComponent,
      data : {
        breadcrumb: 'Absence',
        module: 'absence',
        feature: 'absence',
        method: 'index',
        route_code: 'absences-data-daily',
      }
    },
   
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsencesRoutingModule { }

export const routedComponents = [
  AbsencesComponent,
  AbsenceIndexComponent
]