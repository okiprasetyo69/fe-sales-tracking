import { NgModule } from '@angular/core';

import { DeliveryPlanRoutingModule, routedComponents } from './delivery-plan-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { LogisticReportDeliveryPlanService } from '../../../../services/logistic-report-delivery-plan.service';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { ExcelService } from '../../../../services/excel.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FilterDeliveryPlanComponent } from './entry/filter-delivery-plan.component';
import { ActualVisit } from './c/delivery-plan-index.component';
import { BranchService } from '../../../../services/branch.service';
import { UserService } from '../../../../services/user.service';
import { PlanSummaryModule } from '../../../_shared-components/plan-summary/plan-summary.module';
import { PlanTimelineModule } from '../../../_shared-components/plan-timeline/plan-timeline.module';
import { VisitCardModule } from '../../../_shared-components/visit-card/visit-card.module';

@NgModule({
  imports: [
    ThemeModule,
    DeliveryPlanRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    PlanSummaryModule,
    PlanTimelineModule,
    VisitCardModule,
  ],
  declarations: [
    ...routedComponents,
    FilterDeliveryPlanComponent,
    ActualVisit,
  ],
  providers: [
    LogisticReportDeliveryPlanService,
    DeliveryRouteService,
    ExcelService,
    UserService,
    BranchService,
  ],
  entryComponents: [
    FilterDeliveryPlanComponent,
  ],
})
export class DeliveryPlanModule {
}
