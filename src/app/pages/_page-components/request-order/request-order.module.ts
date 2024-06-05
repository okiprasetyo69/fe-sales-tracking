import { NgModule } from '@angular/core';

import { RequestOrderRoutingModule, routedComponents } from './request-order-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { CommonModule } from '@angular/common';
import { LoaderModule } from '../../../helper/Loader.module';
import { RequestOrderService } from '../../../services/request-order.service';
import { IndexTableModule } from '../../_shared-components/index-table/index-table.module';

@NgModule({
  imports: [
    ThemeModule,
    RequestOrderRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    HeaderDetailModule,
    FormLoadingModule,
    CommonModule,
    LoaderModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    RequestOrderService,
  ],
})
export class RequestOrderModule {
}
