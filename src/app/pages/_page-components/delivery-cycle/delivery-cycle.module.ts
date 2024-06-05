import { NgModule } from '@angular/core';

import { DeliveryCycleRoutingModule, routedComponents } from './delivery-cycle-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { FormInputTdModule } from '../../_shared-components/form-input-td/form-input-td.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { DeliveryDestinationFormComponent } from './c/delivery-destination-form.component';
import { LoaderModule } from '../../../helper/Loader.module';
import { DeliveryCycleService } from '../../../services/delivery-cycle.service';
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
    DeliveryCycleRoutingModule,
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
    ModalDeleteModule,
    FormDestinationModule,
    IndexApprovalFlagModule,
    FormImportModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
    DeliveryDestinationFormComponent,
  ],
  providers: [
    DeliveryCycleService,
    ApprovalService,
  ],
})
export class DeliveryCycleModule {
}
