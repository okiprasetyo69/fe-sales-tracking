import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { PermissionAlertRoutingModule, routedComponents } from './permission-alert-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { DataTablesModule } from 'angular-datatables';
import {LoaderModule} from "../../../helper/Loader.module";
import {PermissionAlertService} from "../../../services/permission-alert.service";

@NgModule({
  imports: [
    ThemeModule,
    PermissionAlertRoutingModule,
    ToasterModule.forRoot(),
    DevModeModule,
    DataTablesModule,
    LoaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    PermissionAlertService,
  ],
})
export class PermissionAlertModule { }
