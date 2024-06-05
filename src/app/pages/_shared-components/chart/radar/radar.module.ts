import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarComponent } from './radar.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    RadarComponent,
  ],
  exports: [
    RadarComponent,
  ],
})
export class radarModule { }