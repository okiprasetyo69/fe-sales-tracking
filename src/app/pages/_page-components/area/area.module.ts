import { NgModule } from '@angular/core';

import { AreaRoutingModule, routedComponents } from './area-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { AgmCoreModule } from '@agm/core';
import 'style-loader!angular2-toaster/toaster.css';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { DataTablesModule } from 'angular-datatables';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { AreaService } from '../../../services/area.service';
import { LoaderModule } from '../../../helper/Loader.module';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { ApprovalService } from '../../../services/approval.service';
import { environment } from '../../../../environments/environment';


@NgModule({
  imports: [
    ThemeModule,
    AreaRoutingModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    DevModeModule,
    DataTablesModule,
    FormInputMdModule,
    FormLoadingModule,
    ColorPickerModule,
    LoaderModule,
    ModalDeleteModule,
    IndexApprovalFlagModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    AreaService,
    ApprovalService,
  ],
})
export class AreaModule {
}
