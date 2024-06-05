import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TitleCasePipe } from '@angular/common';

// import { SalesRoutingModule, routedComponents } from './sales-routing.module';
import { CollectorRoutingModule, routedComponents } from './collector-routing.module';
import { AssetTypeService } from '../../services/asset-type.service';
import { CustomerService } from '../../services/customer.service';
import { DestinationCycleService } from '../../services/destination-cycle.service';
import { GroupCycleService } from '../../services/group-cycle.service';
import { VisitCycleService } from '../../services/visit-cycle.service';
import { JobFunctionService } from '../../services/job-function.service';
import { ContactService } from '../../services/contact.service';
import { EmployeeService } from '../../services/employee.service';
import { BranchService } from '../../services/branch.service';
import { CompanyService } from '../../services/company.service';
import { RequestOrderService } from '../../services/request-order.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { UserService } from '../../services/user.service';
import { InvoiceService } from '../../services/invoice.service';
import { PaymentService } from '../../services/payment.service';
import { VisitPlanService } from '../../services/visit-plan.service';
// import { VisitCollectPlanService } from '../../services/visitcollect-plan.service';

@NgModule({
  imports: [
    ThemeModule,
    CollectorRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    TitleCasePipe,
    AssetTypeService,
    CustomerService,
    ContactService,
    JobFunctionService,
    VisitCycleService,
    GroupCycleService,
    DestinationCycleService,
    EmployeeService,
    BranchService,
    CompanyService,
    RequestOrderService,
    SalesOrderService,
    UserService,
    InvoiceService,
    PaymentService,
    VisitPlanService,
  ],
})
export class CollectorModule {
}
