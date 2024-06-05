import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencesComponent } from './absences.component';
import { AbsenceIndexComponent } from '../_page-components/absences/c/absence-index.component';

const routes: Routes = [{
  path: '',
  component: AbsencesComponent,
  data: {
    breadcrumb: 'Absences',
  },
  children: [
    {
      path: 'daily',
      loadChildren: '../_page-components/absences/absences.module#AbsencesModule',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsencesRoutingModule { }

export const routedComponents = [
  AbsencesComponent
]

