import { NgModule } from '@angular/core';

import { LogisticDashboardRoutingModule, routedComponents } from './logistic-dashboard-routing.module';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { ChartModule } from '../../_shared-components/chart/chart.module';
import { LogisticDashboardService } from '../../../services/logistic-dashboard.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    ThemeModule,
    LogisticDashboardRoutingModule,
    NgxMyDatePickerModule.forRoot(),
    ChartModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    LogisticDashboardService,
  ],
})
export class LogisticDashboardModule {
}
