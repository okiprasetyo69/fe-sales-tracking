import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { AssetsIndexComponent } from './c/assets-index.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { AssetsEditComponent } from './c/assets-edit.component';
import { AssetsImportComponent } from './c/assets-import.component';
import { AssetService } from '../../../services/asset.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ToasterModule.forRoot(),
    AssetsRoutingModule,
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    DataTablesModule,
    NgSelectModule,
    LoaderModule,
    TextMaskModule,
    FormImportModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
  ],
  declarations: [AssetsComponent, AssetsIndexComponent, AssetsEditComponent, AssetsImportComponent],
  providers: [AssetService, ApprovalService],
})
export class AssetsModule {
}
