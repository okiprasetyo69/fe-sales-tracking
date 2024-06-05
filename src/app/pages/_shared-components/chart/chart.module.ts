import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarModule } from './horizontal-bar/horizontal-bar.module';
import { PieModule } from './pie/pie.module';
import { LineModule } from './line/line.module';
import { VerticalBarModule } from './vertical-bar/vertical-bar.module';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

// custom
import { DoughnutModule } from './doughnut/doughnut.module';
import { radarModule } from './radar/radar.module';
import { VerticalBarStackedModule } from './vertical-bar-stacked/vertical-bar-stacked.module';
import { polarAreaModule } from './polar-area/polar-area.module';
import { HorizontalBarStackedModule } from './horizontal-bar-stacked/horizontal-bar-stacked.module';
// custom end

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [
    HorizontalBarModule,
    PieModule,
    LineModule,
    VerticalBarModule,
    ChartModuleSecond,
    DoughnutModule,
    radarModule,
    VerticalBarStackedModule,
    polarAreaModule,
    HorizontalBarStackedModule
  ],
})
export class ChartModule {
}
