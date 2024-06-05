import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRouteRoutingModule } from './delivery-route-routing.module';
import { DeliveryRouteComponent } from './delivery-route.component';
import { DeliveryRouteIndexComponent } from './c/delivery-route-index.component';
import { UserService } from '../../../services/user.service';
import { BranchService } from '../../../services/branch.service';
import { CustomerService } from '../../../services/customer.service';
import { VisitPlanService } from '../../../services/visit-plan.service';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DataTablesModule } from 'angular-datatables';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';
import { TextMaskModule } from 'angular2-text-mask';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { ToasterModule } from 'angular2-toaster';
import { DeliveryRouteService } from '../../../services/delivery-route.service';
import { DeliveryRouteEditComponent } from './c/delivery-route-edit.component';
import { DeliveryRouteGenerateComponent } from './c/delivery-route-generate.component';
import { CustomerName } from './c/delivery-route-edit.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ModalDeleteModule } from '../../_shared-components/modal-delete/modal-delete.module';
import { FormDestinationModule } from '../../_shared-components/form-destination/form-destination.module';
import { IndexApprovalFlagModule } from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import { RouteMapModule } from '../../_shared-components/route-map/route-map.module';
import { AssetService } from '../../../services/asset.service';
import { ApprovalService } from '../../../services/approval.service';
import { HelperModule } from '../../../helper/helper.module';
import { environment } from '../../../../environments/environment';
import { IndexTableModule } from "../../_shared-components/index-table/index-table.module";

@NgModule({
  imports: [
    CommonModule,
    DeliveryRouteRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    HeaderDetailModule,
    FormLoadingModule,
    DataTablesModule,
    NgSelectModule,
    FormInputMdModule,
    NgDatepickerModule,
    TextMaskModule,
    DevModeModule,
    LoaderModule,
    NgxMyDatePickerModule.forRoot(),
    ModalDeleteModule,
    FormDestinationModule,
    IndexApprovalFlagModule,
    RouteMapModule,
    HelperModule,
    IndexTableModule,
  ],
  declarations: [
    DeliveryRouteComponent,
    DeliveryRouteIndexComponent,
    DeliveryRouteEditComponent,
    DeliveryRouteGenerateComponent,
    CustomerName,
  ],
  providers: [
    UserService,
    VisitPlanService,
    DeliveryRouteService,
    CustomerService,
    BranchService,
    AssetService,
    ApprovalService,
  ],
})
export class DeliveryRouteModule {
}
