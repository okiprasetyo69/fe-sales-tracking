import { NgModule } from '@angular/core';

import { CollectorDashboardRoutingModule, routedComponents } from './collector-dashboard-routing.module';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { CollectorDashboardService } from '../../../services/collector-dashboard.service';
import { FormInputTdModule } from '../../_shared-components/form-input-td/form-input-td.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { ChartModule } from '../../_shared-components/chart/chart.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    ThemeModule,
    CollectorDashboardRoutingModule,
    FormInputTdModule,
    FormInputMdModule,
    ChartModule,
    NgxMyDatePickerModule.forRoot(),
  ],
  declarations: [
    ...routedComponents ,
  ],
  providers: [
    CollectorDashboardService,
  ],
})
export class CollectorDashboardModule { }
