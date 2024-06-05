import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitEyeHistoryRoutingModule } from './visit-eye-history-routing.module';
import { VisitEyeHistoryComponent } from './visit-eye-history.component';
import { VisitEyeHistoryIndexComponent } from './c/visit-eye-history-index.component';
import { AgmCoreModule } from "@agm/core";
import { environment } from "../../../../../environments/environment";
import { ThemeModule } from "../../../../@theme/theme.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { VisitEyeHistoryService } from "../../../../services/visit-eye-history.service";
import { IndexTableModule } from "../../../_shared-components/index-table/index-table.module";
import { VisitEyeHistoryDetailComponent } from './entry/visit-eye-history-detail.component';
import { VisitEyeHistoryFilterComponent } from './entry/visit-eye-history-filter.component';

@NgModule({
  imports: [
    ThemeModule,
    NgSelectModule,
    CommonModule,
    VisitEyeHistoryRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    IndexTableModule,
  ],
  declarations: [VisitEyeHistoryComponent, VisitEyeHistoryIndexComponent, VisitEyeHistoryDetailComponent, VisitEyeHistoryFilterComponent],
  entryComponents: [
    VisitEyeHistoryDetailComponent,
    VisitEyeHistoryFilterComponent,
  ],
  providers: [
    VisitEyeHistoryService,
  ],
})
export class VisitEyeHistoryModule {
}
