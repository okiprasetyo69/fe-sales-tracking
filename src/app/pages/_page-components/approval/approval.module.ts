import { NgModule } from '@angular/core';

import { ApprovalRoutingModule, routedComponents } from './approval-routing.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { ApprovalService } from '../../../services/approval.service';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    ThemeModule,
    ApprovalRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    FormLoadingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ApprovalService,
    NgbActiveModal,
  ],
})
export class ApprovalModule { }
