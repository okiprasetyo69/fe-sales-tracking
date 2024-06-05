import { NgModule } from '@angular/core';
import { AlertRoutingModule, routedComponents } from './alert-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { ToasterModule } from 'angular2-toaster';
import { SalesReportAlertService } from '../../../../services/sales-report-alert.service';
import { ExcelService } from '../../../../services/excel.service';
import { FilterAlertComponent } from './entry/filter-alert.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';

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
    SalesReportAlertService,
    ExcelService,
    UserService,
    BranchService,
    DivisionsService,
  ],
  entryComponents: [
    FilterAlertComponent,
  ],
})
export class AlertModule {
}
