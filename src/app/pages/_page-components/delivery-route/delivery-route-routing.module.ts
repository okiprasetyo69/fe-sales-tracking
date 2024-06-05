import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryRouteComponent } from './delivery-route.component';
import { AuthPermissionGuard } from '../../../guards/auth-permission.guard';
import { DeliveryRouteIndexComponent } from './c/delivery-route-index.component';
import { DeliveryRouteGenerateComponent } from './c/delivery-route-generate.component';
import { DeliveryRouteEditComponent } from './c/delivery-route-edit.component';

const routes: Routes = [{
  path: '',
  component: DeliveryRouteComponent,
  canActivateChild: [AuthPermissionGuard],
  children: [
    {
      path: 'index',
      component: DeliveryRouteIndexComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'index',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'index/page',
      component: DeliveryRouteIndexComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'index',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'generate',
      component: DeliveryRouteGenerateComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'generate',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'create',
      component: DeliveryRouteEditComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'create',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'edit/:id',
      component: DeliveryRouteEditComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'edit',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'view/:id',
      component: DeliveryRouteEditComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'view',
        route_code: 'logistic-activities-delivery-route',
      },
    },
    {
      path: 'view_approval/:id_approval',
      component: DeliveryRouteEditComponent,
      data: {
        breadcrumb: 'Delivery Route',
        module: 'logistic',
        feature: 'delivery-route',
        method: 'view',
        route_code: 'logistic-activities-delivery-route',
      },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRouteRoutingModule {
}
