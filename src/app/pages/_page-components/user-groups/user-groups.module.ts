import { NgModule } from '@angular/core';

import { routedComponents, UserGroupsRoutingModule } from './user-groups-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { DataTablesModule } from 'angular-datatables';
import { FormInputTdModule } from '../../_shared-components/form-input-td/form-input-td.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoaderModule } from '../../../helper/Loader.module';
import { UserGroupService } from '../../../services/user-group.service';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { ApprovalService } from '../../../services/approval.service';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';

@NgModule({
  imports: [
    ThemeModule,
    UserGroupsRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    FormInputTdModule,
    DevModeModule,
    FormLoadingModule,
    NgSelectModule,
    LoaderModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UserGroupService,
    ApprovalService,
  ],
})
export class UserGroupsModule {
}
