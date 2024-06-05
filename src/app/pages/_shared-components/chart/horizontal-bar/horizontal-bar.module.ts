import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarComponent } from './horizontal-bar.component';
import { ChartModule as ChartModuleSecond } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    ChartModuleSecond,
  ],
  declarations: [
    HorizontalBarComponent,
  ],
  exports: [
    HorizontalBarComponent,
  ],
})
export class HorizontalBarModule {
}
