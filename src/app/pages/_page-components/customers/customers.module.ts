import { NgModule } from '@angular/core';
import { CustomersRoutingModule, routedComponents } from './customers-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { AgmCoreModule } from '@agm/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { DataTablesModule } from 'angular-datatables';
import { CustomerService } from '../../../services/customer.service';
import { LoaderModule } from '../../../helper/Loader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinessActivity } from './c/customers-edit.component';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../../../../environments/environment';
// custom
import { FormImportConfirmModule } from '../../_shared-components/form-import-confirm/form-import-confirm.module';
import { CustomersImportComponent } from './c/customers-import.component';
import { PackingSlipService } from '../../../services/packing-slip.service';
import { FilterCustomerComponent } from './entry/filter-customer.component'
import { ExcelService } from '../../../services/excel.service';
import { UserService } from '../../../services/user.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';


@NgModule({
  imports: [
    ThemeModule,
    CustomersRoutingModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    DataTablesModule,
    LoaderModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
    NgSelectModule,
    FormImportConfirmModule,
    NgxMyDatePickerModule.forRoot(), 
  ],
  declarations: [
    ...routedComponents,
    BusinessActivity,
    CustomersImportComponent,
    FilterCustomerComponent,
  ],
  providers: [
    CustomerService,
    ApprovalService,
    // CustomerBranchService,
    PackingSlipService,
    ExcelService,
    UserService,
  ],
  entryComponents:[
    FilterCustomerComponent
  ]
})
export class CustomersModule {
}
