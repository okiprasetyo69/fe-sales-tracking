import { NgModule } from '@angular/core';

import { InvoiceRoutingModule, routedComponents } from './invoice-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { InvoiceService } from '../../../services/invoice.service';
import { BranchService } from '../../../services/branch.service';
import { IndexTableModule } from '../../_shared-components/index-table/index-table.module';

@NgModule({
  imports: [
    ThemeModule,
    InvoiceRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    HeaderDetailModule,
    FormLoadingModule,
    LoaderModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    InvoiceService,
    BranchService,
  ],
})
export class InvoiceModule {
}
