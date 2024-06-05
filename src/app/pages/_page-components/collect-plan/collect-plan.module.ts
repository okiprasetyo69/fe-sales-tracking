import {NgModule} from '@angular/core';
import {routedComponents, CollectPlanRoutingModule} from './collect-plan-routing.module';
import {ThemeModule} from '../../../@theme/theme.module';
import {AgmCoreModule} from '@agm/core';
import {ToasterModule} from 'angular2-toaster';
import {FormLoadingModule} from '../../_shared-components/form-loading/form-loading.module';
import {DataTablesModule} from 'angular-datatables';
import {HeaderDetailModule} from '../../_shared-components/header-detail/header-detail.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormInputMdModule} from '../../_shared-components/form-input-md/form-input-md.module';
import {NgDatepickerModule} from 'ng2-datepicker';
import {TextMaskModule} from 'angular2-text-mask';
import {DevModeModule} from '../../_shared-components/dev-mode/dev-mode.module';
import {CustomerName} from './c/collect-plan-edit.component';
import {UserService} from '../../../services/user.service';
import {LoaderModule} from '../../../helper/Loader.module';
import {VisitPlanService} from '../../../services/visit-plan.service';
// import {VisitCollectPlanService} from '../../../services/visitcollect-plan.service';
import {CustomerService} from '../../../services/customer.service';
import {BranchService} from '../../../services/branch.service';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {FormInputTdModule} from '../../_shared-components/form-input-td/form-input-td.module';
import {ModalDeleteModule} from '../../_shared-components/modal-delete/modal-delete.module';
import {FormDestinationModule} from '../../_shared-components/form-destination/form-destination.module';
import {IndexApprovalFlagModule} from '../../_shared-components/index-approval-flag/index-approval-flag.module';
import {RouteMapModule} from '../../_shared-components/route-map/route-map.module';
import {ApprovalService} from '../../../services/approval.service';
import {HelperModule} from '../../../helper/helper.module';
import {SalesReportVisitPlanService} from '../../../services/sales-report-visit-plan.service';
import {environment} from '../../../../environments/environment';
import {IndexTableModule} from '../../_shared-components/index-table/index-table.module';
import {InvoiceComponent} from './entry/invoice.component';

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    // VisitPlanRoutingModule,
    CollectPlanRoutingModule,
    HeaderDetailModule,
    FormLoadingModule,
    DataTablesModule,
    NgSelectModule,
    FormInputMdModule,
    FormInputTdModule,
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
    ...routedComponents,
    CustomerName,
    InvoiceComponent,
  ],
  providers: [
    UserService,
    VisitPlanService,
    CustomerService,
    BranchService,
    ApprovalService,
    SalesReportVisitPlanService,
  ],
  entryComponents: [
    InvoiceComponent,
  ],
})
export class CollectPlanModule {
}
