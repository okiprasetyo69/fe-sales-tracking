import { NgModule } from '@angular/core';

import { routedComponents, VisitCycleRoutingModule } from './visit-cycle-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { FormInputTdModule } from '../../_shared-components/form-input-td/form-input-td.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { UserService } from '../../../services/user.service';
import { VisitCycleService } from '../../../services/visit-cycle.service';
import { CustomerService } from '../../../services/customer.service';
import { BranchService } from '../../../services/branch.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { FormDestinationModule } from '../../_shared-components/form-destination/form-destination.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { environment } from '../../../../environments/environment';
import {IndexTableModule} from "../../_shared-components/index-table/index-table.module";

@NgModule({
  imports: [
    ThemeModule,
    VisitCycleRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    FormInputTdModule,
    FormInputMdModule,
    FormLoadingModule,
    DevModeModule,
    LoaderModule,
    NgSelectModule,
    ModalDeleteModule,
    FormDestinationModule,
    IndexApprovalFlagModule,
    FormImportModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserService,
    VisitCycleService,
    CustomerService,
    BranchService,
    ApprovalService,
  ],
})
export class VisitCycleModule {
}
