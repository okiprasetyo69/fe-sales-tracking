import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivemapRoutingModule, routedComponents } from './livemap-routing.module';
import { LivemapIndexComponent } from './c/livemap-index.component';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { AgmCoreModule } from '@agm/core';
import { LoaderModule } from '../../../helper/Loader.module';
import { LivemapService } from '../../../services/livemap.service';
import { OauthService } from '../../../services/oauth.service';
import { VisitPlanService } from '../../../services/visit-plan.service';
import { DeliveryRouteService } from '../../../services/delivery-route.service';
import { RouteMapModule } from '../../_shared-components/route-map/route-map.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    LivemapRoutingModule,
    DevModeModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    LoaderModule,
    RouteMapModule,
    NgSelectModule,
  ],
  declarations: [
    ...routedComponents,
    LivemapIndexComponent,
  ],
  providers: [
    LivemapService,
    OauthService,
    VisitPlanService,
    DeliveryRouteService,
  ],
})
export class LivemapModule {
}
