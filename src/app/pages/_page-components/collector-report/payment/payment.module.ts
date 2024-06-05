import { NgModule } from '@angular/core';

import { PaymentRoutingModule, routedComponents } from './payment-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { SalesReportPaymentService } from '../../../../services/sales-report-payment.service';
import { ExcelService } from '../../../../services/excel.service';
import { FilterPaymentComponent } from './entry/filter-payment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';

@NgModule({
  imports: [
    ThemeModule,
    PaymentRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterPaymentComponent,
  ],
  providers: [
    SalesReportPaymentService,
    ExcelService,
    UserService,
    BranchService,
    DivisionsService,
  ],
  entryComponents: [
    FilterPaymentComponent,
  ],
})
export class PaymentModule {
}
