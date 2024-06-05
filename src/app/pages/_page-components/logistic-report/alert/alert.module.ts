import { NgModule } from '@angular/core';

import { AlertRoutingModule, routedComponents } from './alert-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { LogisticReportAlertService } from '../../../../services/logistic-report-alert.service';
import { SalesReportAlertService } from '../../../../services/sales-report-alert.service';
import { ExcelService } from '../../../../services/excel.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { BranchService } from '../../../../services/branch.service';
import { UserService } from '../../../../services/user.service';
import { FilterAlertComponent } from './entry/filter-alert.component';

@NgModule({
  imports: [
    ThemeModule,
    AlertRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterAlertComponent,
  ],
  providers: [
    LogisticReportAlertService,
    SalesReportAlertService,
    ExcelService,
    UserService,
    BranchService,
  ],
  entryComponents: [
    FilterAlertComponent,
  ],
})
export class AlertModule {
}
