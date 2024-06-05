import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestOrderComponent } from './request-order.component';
import { RequestOrderIndexComponent } from './c/request-order-index.component';
import { RequestOrderShowComponent } from './c/request-order-show.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';

const routes: Routes = [{
  path: '',
  component: RequestOrderComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: RequestOrderIndexComponent,
      data: {
        breadcrumb: 'Request Order',
        module: 'sales',
        feature: 'request-order',
        method: 'index',
        route_code: 'sales-activities-request-order',
      },
    },
    {
      path: 'index/page',
      component: RequestOrderIndexComponent,
      data: {
        breadcrumb: 'Request Order',
        module: 'sales',
        feature: 'request-order',
        method: 'page',
        route_code: 'sales-activities-request-order',
      },
    },
    {
      path: 'view/:id',
      component: RequestOrderShowComponent,
      data: {
        breadcrumb: 'Request Order View',
        module: 'sales',
        feature: 'request-order',
        method: 'view',
        route_code: 'sales-activities-request-order',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestOrderRoutingModule {
}

export const routedComponents = [
  RequestOrderComponent,
  RequestOrderIndexComponent,
  RequestOrderShowComponent,
];
