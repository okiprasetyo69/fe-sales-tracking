import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { MenuService } from '../../../services/menu.service';
import { NbMenuService, NbPopoverModule } from '@nebular/theme';
import { ChartModule } from '../../_shared-components/chart/chart.module';
import { SalesDashboardService } from '../../../services/sales-dashboard.service';
import { LogisticDashboardService } from '../../../services/logistic-dashboard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

// import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgSelectModule,
    NgxMyDatePickerModule.forRoot(),
    NbPopoverModule,
    // NgxChartsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
    MenuService,
    NbMenuService,
    SalesDashboardService,
    LogisticDashboardService,
  ],
})
export class DashboardModule {
}
