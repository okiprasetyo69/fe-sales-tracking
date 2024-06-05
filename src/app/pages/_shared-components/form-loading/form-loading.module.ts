import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { FormLoadingComponent } from './form-loading.component';

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
  ],
  exports: [
    FormLoadingComponent,
  ],
  declarations: [
    FormLoadingComponent,
  ],
})
export class FormLoadingModule { }
