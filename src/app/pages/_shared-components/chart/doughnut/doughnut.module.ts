import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutComponent } from './doughnut.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    DoughnutComponent,
  ],
  exports: [
    DoughnutComponent,
  ],
})
export class DoughnutModule { }