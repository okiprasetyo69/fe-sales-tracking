import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './pie.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    PieComponent,
  ],
  exports: [
    PieComponent,
  ],
})
export class PieModule { }
