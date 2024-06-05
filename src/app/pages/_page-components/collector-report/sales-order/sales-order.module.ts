import { NgModule } from '@angular/core';

import { routedComponents, SalesOrderRoutingModule } from './sales-order-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { SalesReportSalesOrderService } from '../../../../services/sales-report-sales-order.service';
import { SalesOrderService } from '../../../../services/sales-order.service';
import { ExcelService } from '../../../../services/excel.service';
import { FilterSalesOrderComponent } from './entry/filter-sales-order.component';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    ThemeModule,
    SalesOrderRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterSalesOrderComponent,
  ],
  providers: [
    SalesReportSalesOrderService,
    SalesOrderService,
    ExcelService,
    UserService,
    BranchService,
    DivisionsService,
  ],
  entryComponents: [
    FilterSalesOrderComponent,
  ],
})
export class SalesOrderModule {
}
