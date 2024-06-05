import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitEyeHistoryComponent } from "./visit-eye-history.component";
import { VisitEyeHistoryIndexComponent } from "./c/visit-eye-history-index.component";

const routes: Routes = [{
  path: '',
  component: VisitEyeHistoryComponent,
  children: [
    {
      path: 'index',
      component: VisitEyeHistoryIndexComponent,
    },
    {
      path: 'index/page',
      component: VisitEyeHistoryIndexComponent,
    },
    {
      path: '',
      redirectTo: 'index',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitEyeHistoryRoutingModule {
}
