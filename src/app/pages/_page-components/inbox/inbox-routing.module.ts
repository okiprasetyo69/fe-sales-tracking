import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component';
import { InboxIndexComponent } from './c/inbox-index.component';

const routes: Routes = [{
  path: '',
  component: InboxComponent,
  children: [
    {
      path: 'index',
      component: InboxIndexComponent,
    },
    {
      path: 'index/page',
      component: InboxIndexComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {
}

export const routedComponents = [
  InboxComponent,
  InboxIndexComponent,
];
