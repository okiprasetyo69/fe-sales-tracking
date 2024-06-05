import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './_page-components/dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ErrorPageModule } from './error-page/error-page.module';
import { ToasterModule } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { LoaderModule } from '../helper/Loader.module';
import { ApiService } from '../services/api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { TrackingDeliveryComponent } from './_page-components/sales-dashboard/f/tracking-delivery/tracking-delivery.component';
// import { PerformanceDataComponent } from './_page-components/sales-dashboard/e/performance-data/performance-data.component';
// import { VerticalBarStackedComponent } from './_shared-components/chart/vertical-bar-stacked/vertical-bar-stacked.component';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ErrorPageModule,
    ToasterModule.forRoot(),
    LoaderModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,


    // TrackingDeliveryComponent,
    // PerformanceDataComponent,
  ],
  providers: [
    ApiService,
  ],
})
export class PagesModule {
}
