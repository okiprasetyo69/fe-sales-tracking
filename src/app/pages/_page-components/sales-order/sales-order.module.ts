import { NgModule } from '@angular/core';

import { SalesOrderRoutingModule, routedComponents } from './sales-order-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from '../../../helper/Loader.module';
import { SalesOrderService } from '../../../services/sales-order.service';
import { FormImportModule } from '../../_shared-components/form-import/form-import.module';
import { IndexTableModule } from '../../_shared-components/index-table/index-table.module';
import { SalesOrderIndexComponent } from "./c/sales-order-index.component";

@NgModule({
  imports: [
    ThemeModule,
    SalesOrderRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    HeaderDetailModule,
    FormLoadingModule,
    LoaderModule,
    FormImportModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    SalesOrderIndexComponent,
  ],
  providers: [
    SalesOrderService,
  ],
})
export class SalesOrderModule {
}
