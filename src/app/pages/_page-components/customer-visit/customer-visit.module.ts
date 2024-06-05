import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerVisitRoutingModule } from './customer-visit-routing.module';
import { CustomerVisitShowComponent } from './c/customer-visit-show.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { CustomerVisitFilterComponent } from './modal/customer-visit-filter.component';
import { AgmCoreModule } from '@agm/core';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CustomerVisitComponent } from './customer-visit.component';
import { CustomerVisitService } from '../../../services/customer-visit.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { environment } from '../../../../environments/environment';
import {IndexTableService} from "../../_shared-components/index-table/index-table.service";

@NgModule({
  imports: [
    ThemeModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    CommonModule,
    CustomerVisitRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    AgmJsMarkerClustererModule,
  ],
  declarations: [
    CustomerVisitShowComponent,
    CustomerVisitFilterComponent,
    CustomerVisitComponent,
  ],
  providers: [
    CustomerVisitService,
    IndexTableService,
  ],
  entryComponents: [
    CustomerVisitFilterComponent,
  ],
})
export class CustomerVisitModule {
}
