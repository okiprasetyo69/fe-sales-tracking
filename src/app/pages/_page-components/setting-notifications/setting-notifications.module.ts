import { NgModule } from '@angular/core';

import { SettingNotificationsRoutingModule, routedComponents } from './setting-notifications-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import {LoaderModule} from '../../../helper/Loader.module';
import {SettingNotificationsService} from '../../../services/setting-notifications.service';
import {TitleCasePipe} from '@angular/common';
import { FormLoadingModule } from '../../_shared-components/form-loading/form-loading.module';

@NgModule({
  imports: [
    ThemeModule,
    SettingNotificationsRoutingModule,
    ToasterModule.forRoot(),
    LoaderModule,
    FormLoadingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SettingNotificationsService,
    TitleCasePipe,
  ],
})
export class SettingNotificationsModule { }
