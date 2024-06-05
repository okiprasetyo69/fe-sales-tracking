import { NgModule } from '@angular/core';

import { InvoiceRoutingModule, routedComponents } from './invoice-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { SalesReportInvoiceService } from '../../../../services/sales-report-invoice.service';
import { InvoiceService } from '../../../../services/invoice.service';
import { ExcelService } from '../../../../services/excel.service';
import { FilterInvoiceComponent } from './entry/filter-invoice.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';

@NgModule({
  imports: [
    ThemeModule,
    InvoiceRoutingModule,
    DataTablesModule,
    ToasterModule.forRoot(),
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterInvoiceComponent,
  ],
  providers: [
    SalesReportInvoiceService,
    InvoiceService,
    ExcelService,
    UserService,
    BranchService,
    DivisionsService,
  ],
  entryComponents: [
    FilterInvoiceComponent,
  ],
})
export class InvoiceModule {
}
