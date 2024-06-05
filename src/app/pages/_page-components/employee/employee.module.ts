import { NgModule } from '@angular/core';

import { EmployeeRoutingModule, routedComponents } from './employee-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeService } from '../../../services/employee.service';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { EmployeeImportComponent } from './c/employee-import.component';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';
import { EmployeeSalesConversion } from "./c/employee-index.component";
import { IndexTableModule } from "../../_shared-components/index-table/index-table.module";

@NgModule({
  imports: [
    ThemeModule,
    EmployeeRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    FormInputMdModule,
    DevModeModule,
    FormLoadingModule,
    LoaderModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
    EmployeeImportComponent,
    EmployeeSalesConversion,
  ],
  providers: [
    EmployeeService,
    ApprovalService,
  ],
})
export class EmployeeModule {
}
