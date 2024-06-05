import { NgModule } from '@angular/core';

import { ContactsRoutingModule, routedComponents } from './contacts-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import {LoaderModule} from "../../../helper/Loader.module";
import {CustomerService} from "../../../services/customer.service";
import {ContactService} from "../../../services/contact.service";

@NgModule({
  imports: [
    ThemeModule,
    ContactsRoutingModule,
    ToasterModule.forRoot(),
    LoaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CustomerService,
    ContactService,
  ],
})
export class ContactsModule { }
