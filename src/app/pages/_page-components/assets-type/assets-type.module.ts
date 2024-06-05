import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsTypeRoutingModule } from './assets-type-routing.module';
import { AssetsTypeComponent } from './assets-type.component';
import { AssetsTypeIndexComponent } from './c/assets-type-index.component';
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { DataTablesModule } from "angular-datatables";
import { FormInputMdModule } from "../../_shared-components/form-input-md/form-input-md.module";
import { FormLoadingModule } from "../../_shared-components/form-loading/form-loading.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DevModeModule } from "../../_shared-components/dev-mode/dev-mode.module";
import { LoaderModule } from "../../../helper/Loader.module";
import { ThemeModule } from "../../../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";
import { AssetTypeService } from "../../../services/asset-type.service";

@NgModule({
  imports: [
    CommonModule,
    AssetsTypeRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    DataTablesModule,
    LoaderModule,
  ],
  declarations: [AssetsTypeComponent, AssetsTypeIndexComponent],
  providers: [AssetTypeService],
})
export class AssetsTypeModule { }
