import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanTimelineComponent } from './plan-timeline.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
  ],
  declarations: [PlanTimelineComponent],
  exports: [
    PlanTimelineComponent,
  ],
})
export class PlanTimelineModule {
}
