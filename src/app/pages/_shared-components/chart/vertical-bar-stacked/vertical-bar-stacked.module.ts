import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBarStackedComponent } from './vertical-bar-stacked.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    VerticalBarStackedComponent,
  ],
  exports: [
    VerticalBarStackedComponent,
  ],
})
export class VerticalBarStackedModule {
}
