import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerVisitShowComponent } from './c/customer-visit-show.component';
import { CustomerVisitComponent } from './customer-visit.component';

const routes: Routes = [{
  path: '',
  component: CustomerVisitComponent,
  children: [
    {
      path: 'index',
      component: CustomerVisitShowComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerVisitRoutingModule {
}
