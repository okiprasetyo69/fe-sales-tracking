import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalBarComponent } from './vertical-bar.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    VerticalBarComponent,
  ],
  exports: [
    VerticalBarComponent,
  ],
})
export class VerticalBarModule {
}
