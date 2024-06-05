import { NgModule } from '@angular/core';
import { PackingSlipRoutingModule, routedComponents } from './packing-slip-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import { LoaderModule } from "../../../helper/Loader.module";
import { PackingSlipService } from "../../../services/packing-slip.service";
import { BranchService } from "../../../services/branch.service";
import { PackingSlipImportComponent } from './c/packing-slip-import.component';
import { FormImportModule } from "../../_shared-components/form-import/form-import.module";
import {IndexTableModule} from "../../_shared-components/index-table/index-table.module";
// custom
import { FormImportConfirmModule } from "../../_shared-components/form-import-confirm/form-import-confirm.module";

@NgModule({
  imports: [
    ThemeModule,
    PackingSlipRoutingModule,
    ToasterModule.forRoot(),
    DataTablesModule,
    HeaderDetailModule,
    FormLoadingModule,
    LoaderModule,
    FormImportModule,
    IndexTableModule,
    // custom
    FormImportConfirmModule,
  ],
  declarations: [
    ...routedComponents,
    PackingSlipImportComponent,
  ],
  providers: [
    PackingSlipService,
    BranchService,
  ],
})
export class PackingSlipModule {
}
