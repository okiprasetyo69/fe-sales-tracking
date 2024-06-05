import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { PermissionRoutingModule, routedComponents } from './permission-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { DataTablesModule } from 'angular-datatables';
import { PermissionService } from '../../../services/permission.service';
import { LoaderModule } from '../../../helper/Loader.module';
import { PermissionShowComponent } from './c/permission-show.component';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { AgmCoreModule } from '@agm/core';
import { VisitPlanService } from '../../../services/visit-plan.service';
import { HeaderService } from '../../../services/header.service';
import { RouteMapModule } from '../../_shared-components/route-map/route-map.module';
import { DeliveryRouteService } from '../../../services/delivery-route.service';
import { environment } from '../../../../environments/environment';
import {IndexTableModule} from "../../_shared-components/index-table/index-table.module";

@NgModule({
  imports: [
    ThemeModule,
    PermissionRoutingModule,
    ToasterModule.forRoot(),
    DevModeModule,
    DataTablesModule,
    LoaderModule,
    HeaderDetailModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    RouteMapModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
    PermissionShowComponent,
  ],
  providers: [
    PermissionService,
    VisitPlanService,
    DeliveryRouteService,
    HeaderService,
  ],
})
export class PermissionModule {
}
