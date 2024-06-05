import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivemapComponent } from './livemap.component';
import { LivemapIndexComponent } from './c/livemap-index.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: LivemapComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: LivemapIndexComponent,
      data: {
        breadcrumb: 'Livemap',
        module: 'livemap',
        feature: 'livemap',
        method: 'index',
        route_code: 'livemap',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivemapRoutingModule {
}

export const routedComponents = [
  LivemapComponent,
  LivemapIndexComponent,
];
