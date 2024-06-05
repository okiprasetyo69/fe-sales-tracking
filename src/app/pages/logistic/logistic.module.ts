import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TitleCasePipe } from '@angular/common';

import { LogisticRoutingModule, routedComponents } from './logistic-routing.module';
import { AssetTypeService } from '../../services/asset-type.service';
import { CustomerService } from '../../services/customer.service';
import { DestinationCycleService } from '../../services/destination-cycle.service';
import { GroupCycleService } from '../../services/group-cycle.service';
import { DeliveryCycleService } from '../../services/delivery-cycle.service';
import { JobFunctionService } from '../../services/job-function.service';
import { ContactService } from '../../services/contact.service';
import { EmployeeService } from '../../services/employee.service';
import { BranchService } from '../../services/branch.service';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';
import { PackingSlipService } from '../../services/packing-slip.service';
import { DeliveryRouteService } from '../../services/delivery-route.service';
// import { CustomerBranchService } from '../../services/customer-branch.service';
// import { RequestOrderService } from '../../services/request-order.service';
// import { SalesOrderService } from '../../services/sales-order.service';
// import { InvoiceService } from '../../services/invoice.service';
// import { PaymentService } from '../../services/payment.service';
// import { PermissionAlertService } from '../../services/permission-alert.service';
// import { VisitPlanService } from '../../services/visit-plan.service';
// import { AlertService } from '../../services/alert.service';
// import { PermissionService } from '../../services/permission.service';
// import { ToasterModule, ToasterService } from 'angular2-toaster';
// import { TextMaskModule } from 'angular2-text-mask';
// import { InlineEditorModule } from '@qontu/ngx-inline-editor';
// import { AgmCoreModule } from '@agm/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  imports: [
    ThemeModule,
    LogisticRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA43tzA95U9pmSDcnaFQcRQxBGyz-8qvSc',
    //   libraries: ['places'],
    // }),
    // FormsModule,
    // ReactiveFormsModule,
    // ScrollToModule.forRoot(),
    // TextMaskModule,
    // InlineEditorModule,
    // ToasterModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    TitleCasePipe,
    AssetTypeService,
    CustomerService,
    // CustomerBranchService,
    ContactService,
    JobFunctionService,
    DeliveryCycleService,
    GroupCycleService,
    DestinationCycleService,
    EmployeeService,
    BranchService,
    CompanyService,
    UserService,
    // PermissionAlertService,
    // PermissionService,
    // AlertService,
    DeliveryRouteService,
    PackingSlipService,
  ],
})
export class LogisticModule {
}
