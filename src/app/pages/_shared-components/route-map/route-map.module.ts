import {NgModule} from '@angular/core';
import {GetPointName, RouteMapComponent} from './route-map.component';
import {AgmCoreModule} from '@agm/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {DevModeComponent} from './dev-mode/dev-mode.component';
import {DevRouteComponent} from './dev-mode/dev-route.component';
import {DevJsonComponent} from './dev-mode/dev-json.component';
import {RouteMapService} from './route-map.service';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
  ],
  declarations: [
    RouteMapComponent,
    DevModeComponent,
    DevRouteComponent,
    DevJsonComponent,
    GetPointName,
  ],
  exports: [RouteMapComponent],
  entryComponents: [
    DevModeComponent,
    DevRouteComponent,
    DevJsonComponent,
  ],
  providers: [
    RouteMapService,
  ],
})
export class RouteMapModule {
}
