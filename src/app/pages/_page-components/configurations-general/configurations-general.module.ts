import { NgModule } from '@angular/core';

import { ConfigurationsGeneralRoutingModule, routedComponents } from './configurations-general-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import 'style-loader!angular2-toaster/toaster.css';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import {ConfigurationsGeneralService} from "../../../services/configurations-general.service";
import {LoaderModule} from "../../../helper/Loader.module";
import { NgxMyDatePickerModule } from "ngx-mydatepicker";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    ThemeModule,
    ConfigurationsGeneralRoutingModule,
    ToasterModule.forRoot(),
    InlineEditorModule,
    DevModeModule,
    LoaderModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ConfigurationsGeneralService,
  ],
})
export class ConfigurationsGeneralModule { }
