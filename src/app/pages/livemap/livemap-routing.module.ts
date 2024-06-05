import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivemapComponent } from './livemap.component';

const routes: Routes = [{
  path: '',
  component: LivemapComponent,
  data: {
    breadcrumb: 'Livemap',
  },
  children: [
    {
      path: 'map',
      loadChildren: '../_page-components/livemap/livemap.module#LivemapModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivemapRoutingModule { }

export const routedComponents = [
  LivemapComponent,
];
