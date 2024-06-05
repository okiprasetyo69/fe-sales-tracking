import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanSummaryComponent } from './plan-summary.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { PlanSummaryService } from './plan-summary.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
  ],
  declarations: [
    PlanSummaryComponent,
  ],
  exports: [
    PlanSummaryComponent,
  ],
  providers: [
    PlanSummaryService,
  ],
})
export class PlanSummaryModule {
}
