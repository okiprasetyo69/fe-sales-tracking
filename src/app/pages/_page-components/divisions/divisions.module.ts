import { NgModule } from '@angular/core';
import { DivisionsRoutingModule, routedComponents } from './divisions-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { DataTablesModule } from 'angular-datatables';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { DivisionsService } from '../../../services/divisions.service';
import { TextMaskModule } from 'angular2-text-mask';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';

@NgModule({
  imports: [
    ThemeModule,
    DivisionsRoutingModule,
    ToasterModule.forRoot(),
    DevModeModule,
    FormInputMdModule,
    DataTablesModule,
    FormLoadingModule,
    LoaderModule,
    TextMaskModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    DivisionsService,
    ApprovalService,
  ],
})
export class DivisionsModule {
}
