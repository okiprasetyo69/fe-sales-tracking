import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarStackedComponent } from './horizontal-bar-stacked.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    HorizontalBarStackedComponent,
  ],
  exports: [
    HorizontalBarStackedComponent,
  ],
})
export class HorizontalBarStackedModule {
}
