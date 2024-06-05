import { NgModule } from '@angular/core';

import { CompanyRoutingModule, routedComponents } from './company-routing.module';
import { AgmCoreModule } from '@agm/core';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import 'style-loader!angular2-toaster/toaster.css';
import { HeaderDetailModule } from '../../_shared-components/header-detail/header-detail.module';
import { DevModeModule } from '../../_shared-components/dev-mode/dev-mode.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';
import {LoaderModule} from '../../../helper/Loader.module';
import {CompanyService} from '../../../services/company.service';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    ThemeModule,
    CompanyRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    TextMaskModule,
    ToasterModule.forRoot(),
    ScrollToModule.forRoot(),
    HeaderDetailModule,
    DevModeModule,
    FormInputMdModule,
    FormLoadingModule,
    LoaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ToasterService,
    CompanyService,
  ],
})
export class CompanyModule { }
