import { NgModule } from '@angular/core';

import { PerformanceRoutingModule, routedComponents } from './performance-routing.module';
import { ThemeModule } from "../../../../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";
import { DataTablesModule } from "angular-datatables";
import { LogisticReportPerformanceService } from "../../../../services/logistic-report-performance.service";
import { ExcelService } from '../../../../services/excel.service';
import { FilterPerformanceComponent } from './entry/filter-performance.component';
import { FormInputMdModule } from "../../../_shared-components/form-input-md/form-input-md.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';

@NgModule({
  imports: [
    ThemeModule,
    PerformanceRoutingModule,
    DataTablesModule,
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    FormInputMdModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterPerformanceComponent,
  ],
  providers: [
    LogisticReportPerformanceService,
    ExcelService,
    UserService,
    BranchService,
  ],
  entryComponents: [
    FilterPerformanceComponent,
  ],
})
export class PerformanceModule {
}
