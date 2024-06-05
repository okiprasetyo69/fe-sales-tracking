import { NgModule } from '@angular/core';

import { routedComponents, VisitPlanRoutingModule } from './visit-plan-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { SalesReportVisitPlanService } from '../../../../services/sales-report-visit-plan.service';
import { FormDestinationModule } from '../../../_shared-components/form-destination/form-destination.module';
import { ExcelService } from '../../../../services/excel.service';
import { ActualVisit, DifferenceTime } from './c/visit-plan-index.component';
import { FilterVisitPlanComponent } from './entry/filter-visit-plan.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';
import { PlanSummaryModule } from '../../../_shared-components/plan-summary/plan-summary.module';
import { DevModeModule } from '../../../_shared-components/dev-mode/dev-mode.module';
import { PlanTimelineModule } from '../../../_shared-components/plan-timeline/plan-timeline.module';
import { VisitCardModule } from '../../../_shared-components/visit-card/visit-card.module';

@NgModule({
  imports: [
    ThemeModule,
    VisitPlanRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    FormDestinationModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    PlanSummaryModule,
    DevModeModule,
    PlanTimelineModule,
    VisitCardModule,
  ],
  declarations: [
    ...routedComponents,
    DifferenceTime,
    ActualVisit,
    FilterVisitPlanComponent,
  ],
  providers: [
    SalesReportVisitPlanService,
    ExcelService,
    BranchService,
    DivisionsService,
  ], entryComponents: [
    FilterVisitPlanComponent,
  ],
})
export class VisitPlanModule {
}
