import { NgModule } from '@angular/core';

import { PackingSlipRoutingModule, routedComponents } from './packing-slip-routing.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { LogisticReportPackingSlipService } from '../../../../services/logistic-report-packing-slip.service';
import { ExcelService } from '../../../../services/excel.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { FilterPackingSlipComponent } from './entry/filter-packing-slip.component';

@NgModule({
  imports: [
    ThemeModule,
    PackingSlipRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterPackingSlipComponent,
  ],
  providers: [
    LogisticReportPackingSlipService,
    ExcelService,
    UserService,
    BranchService,
  ],
  entryComponents: [
    FilterPackingSlipComponent,
  ],
})
export class PackingSlipModule {
}
