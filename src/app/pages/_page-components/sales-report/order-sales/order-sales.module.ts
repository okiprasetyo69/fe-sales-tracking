import { NgModule } from '@angular/core';

import { OrderSalesRoutingModule, routedComponents } from './order-sales-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { SalesReportOrderSalesService } from '../../../../services/sales-report-order-sales.service';
import { RequestOrderService } from '../../../../services/request-order.service';
import { ExcelService } from '../../../../services/excel.service';
import { FilterOrderSalesComponent } from './entry/filter-order-sales.component';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { DivisionsService } from '../../../../services/divisions.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    ThemeModule,
    OrderSalesRoutingModule,
    DataTablesModule,
    ToasterModule.forRoot(),
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterOrderSalesComponent,
  ],
  providers: [
    SalesReportOrderSalesService,
    RequestOrderService,
    ExcelService,
    UserService,
    BranchService,
    DivisionsService,
  ], entryComponents: [
    FilterOrderSalesComponent,
  ],
})
export class OrderSalesModule {
}
