import { NgModule } from '@angular/core';

import { BranchRoutingModule, routedComponents } from './branch-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { DataTablesModule } from 'angular-datatables';
import { TextMaskModule } from 'angular2-text-mask';
import 'style-loader!angular2-toaster/toaster.css';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { NbMenuService } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../../../helper/Loader.module';
import { BranchService } from '../../../services/branch.service';
import { DivisionsService } from '../../../services/divisions.service';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    ThemeModule,
    BranchRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    ToasterModule.forRoot(),
    ScrollToModule.forRoot(),
    DataTablesModule,
    TextMaskModule,
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    NgSelectModule,
    FormsModule,
    LoaderModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ToasterService,
    NbMenuService,
    BranchService,
    DivisionsService,
    ApprovalService,
  ],
})
export class BranchModule {
}
