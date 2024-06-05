import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { AlertRoutingModule, routedComponents } from './alert-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { DataTablesModule } from 'angular-datatables';
import { LoaderModule } from '../../../helper/Loader.module';
import { AlertService } from '../../../services/alert.service';
import { HeaderService } from '../../../services/header.service';
import {IndexTableModule} from "../../_shared-components/index-table/index-table.module";

@NgModule({
  imports: [
    ThemeModule,
    AlertRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    LoaderModule,
    IndexTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    AlertService,
    HeaderService,
  ],
})
export class AlertModule {
}
