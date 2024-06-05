import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../../@theme/theme.module';
import { PermissionRoutingModule, routedComponents } from './permission-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { DevModeModule } from '../../../_shared-components/dev-mode/dev-mode.module';
import { DataTablesModule } from 'angular-datatables';
import { LoaderModule } from '../../../../helper/Loader.module';
import { VisitPlanService } from '../../../../services/visit-plan.service';
import { LogisticReportPermissionService } from '../../../../services/logistic-report-permission.service';
import { DeliveryRouteService } from '../../../../services/delivery-route.service';
import { ExcelService } from '../../../../services/excel.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserService } from '../../../../services/user.service';
import { BranchService } from '../../../../services/branch.service';
import { FilterPermissionComponent } from './entry/filter-permission.component';

@NgModule({
  imports: [
    ThemeModule,
    PermissionRoutingModule,
    ToasterModule.forRoot(),
    DevModeModule,
    DataTablesModule,
    LoaderModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
    FilterPermissionComponent,
  ],
  providers: [
    LogisticReportPermissionService,
    VisitPlanService,
    DeliveryRouteService,
    ExcelService,
    UserService,
    BranchService,
  ],
  entryComponents: [
    FilterPermissionComponent,
  ],
})
export class PermissionModule {
}
