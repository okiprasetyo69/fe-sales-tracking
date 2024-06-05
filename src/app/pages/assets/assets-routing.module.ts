import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets.component';

const routes: Routes = [{
  path: '',
  component: AssetsComponent,
  data: {
    breadcrumb: 'Assets',
  },
  children: [
    {
      path: 'assets',
      loadChildren: '../_page-components/assets/assets.module#AssetsModule',
    },
    {
      path: 'assets_type',
      loadChildren: '../_page-components/assets-type/assets-type.module#AssetsTypeModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule {
}
