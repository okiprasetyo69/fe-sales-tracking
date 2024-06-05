import { NgModule, ElementRef } from '@angular/core';

import { SalesDashboardRoutingModule, routedComponents } from './sales-dashboard-routing.module';
import { ThemeModule } from '../../../@theme/theme.module';
import 'style-loader!angular2-toaster/toaster.css';
import { SalesDashboardService } from '../../../services/sales-dashboard.service';
// custom
import { SalesReportPerformanceService } from '../../../services/sales-report-performance.service';
import { SalesReportVisitPlanService } from '../../../services/sales-report-visit-plan.service';

import { UserService }  from '../../../services/user.service';
import { CisangkanService } from '../../../services/cisangkan.service';

import { FormInputTdModule } from '../../_shared-components/form-input-td/form-input-td.module';
import { FormInputMdModule } from '../../_shared-components/form-input-md/form-input-md.module';
import { ChartModule } from '../../_shared-components/chart/chart.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { VisitCategory } from '../../../models/visit-category';
import { NgSelectModule } from '@ng-select/ng-select';

// custom
import { OauthService } from '../../../services/oauth.service';
import { LivemapService } from '../../../services/livemap.service';
import { AgmCoreModule, AgmMap } from '@agm/core';
import { environment } from '../../../../environments/environment';

@NgModule({
  imports: [
    ThemeModule,
    SalesDashboardRoutingModule,
    FormInputTdModule,
    FormInputMdModule,
    ChartModule,
    NgxMyDatePickerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.map_api_key,
      libraries: ['places'],
    }),
    NgSelectModule,
  ],
  declarations: [
    ...routedComponents ,
  ],
  providers: [
    SalesDashboardService,
    // custom
    SalesReportPerformanceService,
    UserService,
    CisangkanService,
    VisitCategory,
    SalesReportVisitPlanService,
    OauthService,
    LivemapService,
  ],
})
export class SalesDashboardModule { }
