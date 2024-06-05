import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormDestinationComponent, DestinationName, AddressCustomer, ParseError} from './form-destination.component';
import {ThemeModule} from '../../../@theme/theme.module';
import {ToasterModule} from 'angular2-toaster';
import {AgmCoreModule} from '@agm/core';
import {FormInputMdModule} from '../form-input-md/form-input-md.module';
import {FormInputTdModule} from '../form-input-td/form-input-td.module';
import {DevModeModule} from '../dev-mode/dev-mode.module';
import {FormDestinationService} from './form-destination.service';
import {BranchService} from '../../../services/branch.service';
import {CustomerService} from '../../../services/customer.service';
import {RouteMapModule} from '../route-map/route-map.module';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    FormInputMdModule,
    FormInputTdModule,
    RouteMapModule,
    DevModeModule,
  ],
  declarations: [
    FormDestinationComponent,
    DestinationName,
    AddressCustomer,
    ParseError,
  ],
  exports: [
    FormDestinationComponent,
  ],
  providers: [
    FormDestinationService,
    BranchService,
    CustomerService,
  ],
})
export class FormDestinationModule {
}
